/**
 * Local-only regression harness. Uses the configured DEVELOPMENT database in a
 * transaction that is always rolled back. No SMTP traffic or Tally submissions.
 * Run after npm run build:
 *   node --import tsx script/test-corporate-regression.ts --development-test
 * Add --api-only to check submissions without starting the temporary browser.
 */
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { setTimeout as pause } from "node:timers/promises";
import express from "express";
import WebSocket from "ws";
import { pool } from "../server/db";
import { storage } from "../server/storage";
import { registerRoutes } from "../server/routes";
import { registerSiteSeo } from "../server/site-seo";
import { serveStatic } from "../server/static";
import { getSiteMetadata, sitePages, SITE_ORIGIN } from "../shared/site-metadata";

assert.ok(process.argv.includes("--development-test"), "Explicit --development-test required");
assert.notEqual(process.env.NODE_ENV, "production", "Never run against production");

const run = randomUUID();
const client = await pool.connect();
const originalQuery = pool.query;
const originalWaitlistLookup = storage.getWaitlistEntryByEmail;
const sent: string[] = [];
const app = express();
const server = createServer(app);
let chrome: ReturnType<typeof spawn> | undefined;
let profile: string | undefined;
let socket: WebSocket | undefined;

try {
  await client.query("BEGIN");
  // Keep the actual DatabaseStorage implementation, but confine every query to
  // this single transaction. Restored below, even when an assertion fails.
  pool.query = client.query.bind(client) as typeof pool.query;
  // registerRoutes' pre-existing startup seed must not write a waitlist row.
  storage.getWaitlistEntryByEmail = async () => ({ id: -1, email: "test@example.com", createdAt: null });
  app.set("trust proxy", "loopback");
  app.use(express.json());
  await registerRoutes(server, app, async (entry) => {
    const saved = await storage.getRecruitmentApplicationByEmail(entry.applicationType, entry.email);
    assert.equal(saved?.id, entry.id, "Team notification occurs after persistence");
    sent.push(`team:${entry.email}`);
  }, async (entry) => { sent.push(`receipt:${entry.email}`); });
  registerSiteSeo(app);
  serveStatic(app, path.resolve("dist/public"));
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  for (const route of [...Object.keys(sitePages), "/partners"]) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, `Direct route ${route}`);
    const html = await response.text();
    const meta = getSiteMetadata(route);
    assert.ok(html.includes(`<title>${meta.title}</title>`), `Initial HTML title ${route}`);
    assert.ok(html.includes(`rel="canonical" href="${SITE_ORIGIN}${meta.canonicalPath}"`), `Canonical ${route}`);
    assert.equal((html.match(/property="og:title"/g) ?? []).length, 1);
    assert.equal((html.match(/name="description"/g) ?? []).length, 1);
    assert.ok(html.includes("/jije-social.png"));
    assert.ok(html.includes('<noscript>'), "Crawlable no-JavaScript navigation");
  }
  const missing = await fetch(origin + "/this-page-does-not-exist");
  assert.equal(missing.status, 404);
  assert.ok((await missing.text()).includes('content="noindex, follow"'));
  assert.equal((await fetch(origin + "/api/not-an-endpoint")).status, 404);
  assert.equal((await fetch(origin + "/missing-file.png")).status, 404);
  const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
  for (const route of Object.keys(sitePages)) assert.ok(sitemap.includes(`<loc>${SITE_ORIGIN}${route}</loc>`));
  assert.ok(!sitemap.includes("<loc>https://jije.ca/partners</loc>"));
  assert.ok((await (await fetch(origin + "/robots.txt")).text()).includes("Disallow: /api/"));
  const social = Buffer.from(await (await fetch(origin + "/jije-social.png")).arrayBuffer());
  assert.equal(social.readUInt32BE(16), 1200);
  assert.equal(social.readUInt32BE(20), 630);
  console.log("PASS: initial HTML metadata and canonicals, social image, sitemap/robots, direct routes, and real HTTP 404s.");
  const email = (role: string) => `corporate-${run}-${role}@example.invalid`;
  const post = (body: unknown) => fetch(`${origin}/api/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": "192.0.2.10" },
    body: JSON.stringify(body),
  });
  const base = {
    firstName: "Regression", lastName: "Test", phone: "+1 (416) 555-0100",
    cityArea: "Toronto", contactConsent: true,
  };
  for (const role of ["vendor", "driver"] as const) {
    const payload = {
      ...base, applicationType: role, email: email(role),
      ...(role === "vendor" ? { businessName: "Synthetic Test Kitchen", businessType: "Restaurant" }
        : { vehicleType: "Bicycle", isAtLeast18: true }),
    };
    const response = await post(payload);
    assert.equal(response.status, 201);
    const saved = await storage.getRecruitmentApplicationByEmail(role, email(role));
    assert.equal(saved?.status, "New");
    assert.equal(saved?.source, role === "vendor" ? "/vendors" : "/drivers");
    assert.equal(saved?.marketingConsent, false);
    assert.ok(sent.includes(`team:${email(role)}`) && sent.includes(`receipt:${email(role)}`));
    assert.equal((await post(payload)).status, 409);
  }
  assert.equal((await post({ ...base, applicationType: "driver", email: "not-an-email" })).status, 400);
  console.log("PASS: real database persistence, New status, source, separate consent, duplicate and invalid feedback; mail adapters invoked after save.");

  if (!process.argv.includes("--api-only")) {
    profile = await mkdtemp(path.join(tmpdir(), "jije-regression-"));
    chrome = spawn("/repl/tools/bin/chromium", [
      "--headless", "--no-sandbox", "--disable-gpu", "--remote-debugging-port=0",
      "--remote-allow-origins=*", `--user-data-dir=${profile}`, "about:blank",
    ], { stdio: "ignore" });
    let debugPort = "";
    for (let i = 0; i < 100; i++) {
      try { debugPort = (await readFile(path.join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0]; break; }
      catch { await pause(100); }
    }
    assert.ok(debugPort, "Chromium started");
    const tabs = await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json() as { type: string; webSocketDebuggerUrl: string }[];
    const tab = tabs.find((target) => target.type === "page");
    assert.ok(tab, "A browser page target is available");
    socket = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise<void>((resolve, reject) => { socket!.once("open", resolve); socket!.once("error", reject); });
    let id = 0;
    const pending = new Map<number, { resolve: (value: any) => void; reject: (error: Error) => void }>();
    const errors: string[] = [];
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
      const handler = pending.get(message.id);
      if (!handler) return;
      pending.delete(message.id);
      if (message.error) handler.reject(new Error(message.error.message));
      else handler.resolve(message.result);
    });
    const command = (method: string, params: object = {}): Promise<any> => new Promise((resolve, reject) => {
      pending.set(++id, { resolve, reject });
      socket!.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async (expression: string) => {
      const value = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
      if (value.exceptionDetails) throw new Error(JSON.stringify(value.exceptionDetails));
      return value.result.value;
    };
    const waitFor = async (expression: string) => {
      for (let i = 0; i < 100; i++) {
        if (await evaluate(expression)) return;
        await pause(100);
      }
      throw new Error(`Browser timed out: ${expression}; state=${await evaluate("JSON.stringify({ready:document.readyState,url:location.href,heading:document.querySelector('h1')?.innerText,body:document.body.innerText.slice(0,200)})")}; runtime=${errors.join(",")}`);
    };
    const navigate = async (route: string) => {
      await command("Page.navigate", { url: origin + route });
      await waitFor(`document.readyState !== 'loading' && !!document.querySelector('h1') && location.pathname === ${JSON.stringify(route)}`);
    };
    await command("Runtime.enable");
    await command("Page.enable");
    const routes = ["/", "/about", "/marketplace", "/intelligence", "/partners", "/partnerships", "/contact", "/vendors", "/drivers", "/privacy", "/terms"];
    const internalLinks = new Set<string>();
    for (const width of [1440, 375, 390, 430, 768]) {
      await command("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
      for (const route of routes) {
        await navigate(route);
        assert.ok(await evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), `No overflow at ${width}: ${route}`);
        assert.equal(await evaluate("document.querySelectorAll('h1').length"), 1, `One primary heading: ${route}`);
        assert.ok(await evaluate("document.querySelector('h1').scrollWidth <= document.querySelector('h1').clientWidth + 1"), `Hero text not clipped at ${width}: ${route}`);
        await waitFor(`document.title === ${JSON.stringify(getSiteMetadata(route).title)}`);
        assert.equal(await evaluate("document.querySelector('link[rel=\"canonical\"]').href"), SITE_ORIGIN + getSiteMetadata(route).canonicalPath);
        assert.ok(await evaluate("getComputedStyle(document.body).fontFamily.includes('Quicksand')"), "Brand typeface");
        await evaluate("document.fonts.ready");
        assert.ok(await evaluate(`document.fonts.check('16px Quicksand')`), "Self-hosted font loaded");
        if (route === "/marketplace") {
          assert.ok(await evaluate("getComputedStyle(document.querySelector('h1')).fontFamily.includes('Quicksand')"), "Updated Marketplace heading font");
          assert.ok(await evaluate("!document.querySelector('.marketplace-original')"), "No old theme wrappers");
          assert.ok(await evaluate("getComputedStyle(document.querySelector('#pilot')).fontFamily.includes('Quicksand')"), "Recruitment section retains its current typography");
        }
        await waitFor(`Array.from(document.querySelectorAll('img')).filter(i=>i.loading!=='lazy').every(i=>i.complete && i.naturalWidth>0)`);
        const links = await evaluate(`Array.from(document.querySelectorAll('a[href]')).map(a=>new URL(a.href)).filter(u=>u.origin===location.origin).map(u=>u.pathname+u.search+u.hash)`) as string[];
        links.forEach((href) => internalLinks.add(href));
      }
      await navigate("/");
      if (width < 1024) {
        const menu = await evaluate(`(() => { const b = document.querySelector('button[aria-label="Open navigation menu"]'); if(!b || getComputedStyle(b).display === 'none') return false; b.click(); return true; })()`);
        assert.ok(menu, `Mobile/tablet menu available at ${width}`);
        await waitFor(`document.querySelector('button[aria-expanded="true"]') !== null`);
        assert.ok(await evaluate(`Array.from(document.querySelectorAll('nav a')).some(a => a.getAttribute('href') === '/intelligence' && a.getBoundingClientRect().height > 0)`));
      }
    }
    await navigate("/this-page-does-not-exist");
    assert.ok(await evaluate("document.body.textContent.includes('404')"));
    assert.ok(await evaluate(`!!document.querySelector('a[href="/"]') && !!document.querySelector('a[href="/marketplace"]')`));
    assert.equal(await evaluate("document.querySelector('meta[name=\"robots\"]').content"), "noindex, follow");
    for (const href of internalLinks) {
      const target = new URL(href, origin);
      if (target.pathname.startsWith("/legal/") && target.pathname.endsWith(".pdf")) {
        const response = await fetch(target);
        assert.equal(response.status, 200, `PDF link ${href}`);
        assert.ok(response.headers.get("content-type")?.includes("application/pdf"));
      } else {
        assert.ok(routes.includes(target.pathname), `Registered internal link ${href}`);
        if (target.hash) {
          await navigate(target.pathname);
          assert.ok(await evaluate(`!!document.getElementById(${JSON.stringify(target.hash.slice(1))})`), `Anchor exists: ${href}`);
        }
      }
    }
    await navigate("/intelligence");
    for (const text of [
      "Areas of Focus", "Cultural Knowledge", "Intelligent Discovery",
      "Research, Insights & Applied Technology", "Food businesses and manufacturers",
      "Researchers and institutions", "Technology and AI companies",
      "Cultural and community organizations", "Strategic partners",
      "AI assistants", "integrations", "commerce and enterprise decisions",
    ]) {
      assert.ok(await evaluate(`document.body.textContent.includes(${JSON.stringify(text)})`), `Intelligence content: ${text}`);
    }
    assert.equal(await evaluate("document.querySelectorAll('article').length"), 3, "Three consolidated Intelligence groups");
    await evaluate(`Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Explore a Partnership')).click()`);
    await waitFor(`location.pathname === '/partnerships' && !!document.querySelector('h1')`);
    console.log("PASS: every discovered internal link, PDF and anchor; consolidated Intelligence concepts and working partnership CTA.");
    const mission = "To preserve, connect and advance African and Afro-Caribbean food culture by building the digital and intelligence infrastructure that strengthens cultural preservation, expands access to its foods, knowledge and traditions, and makes them more understandable to technology.";
    await navigate("/about");
    assert.ok(await evaluate(`document.body.innerText.includes(${JSON.stringify(mission)})`), "Exact official mission");
    for (const text of [
      "Rooted in Culture. Powered by Intelligence.",
      "Who We Are", "Our Mission", "What We’re Building", "Our Vision",
    ]) {
      assert.ok(await evaluate(`document.body.textContent.includes(${JSON.stringify(text)})`), `About content: ${text}`);
    }
    assert.ok(await evaluate(`!document.body.textContent.includes("Our Approach")`), "Redundant Our Approach removed");
    assert.equal(await evaluate("document.querySelectorAll('main > header, main > section').length"), 4, "Four ordered About sections");
    await navigate("/marketplace");
    for (const text of [
      "Your Culture,", "Delivered.", "Find your fit", "Stay connected",
      "One Place for Culture & Community",
      "Jíjé brings the entire ecosystem together. Eat, shop, and connect without the hassle.",
      "Authentic Food", "Grocery Discovery", "Cultural Events",
      "Order meals and book culinary services from top rated African and Afro-Caribbean restaurants, vendors, chefs and caterers.",
      "Shop cultural ingredients, spices, and essentials.",
      "Never miss a concert, festival, or community meetup again.",
      "Bringing Culture Closer", "Building the Ecosystem", "Follow the Marketplace pilot",
      "Let’s build the next chapter together.", "Grow with JÍJÉ", "Deliver with JÍJÉ",
    ]) assert.ok(await evaluate(`document.body.textContent.includes(${JSON.stringify(text)})`), `Restored Marketplace copy: ${text}`);
    assert.ok(await evaluate(`!document.body.textContent.includes('A table of traditions') && !document.body.textContent.includes('Culture. Commerce.') && !!document.querySelector('img[src*="Mascot__Multi_Kaya"]')`), "Updated multi-Kaya hero without old headline or replacement photo-card title");
    const photos = await evaluate(`Array.from(document.querySelectorAll('#mission [style]')).map(e=>e.style.backgroundImage).filter(s=>s.startsWith('url(')).map(s=>s.slice(5,-2))`) as string[];
    assert.deepEqual(photos, ["/attached_assets/jije_jollof.JPEG", "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop", "/jije_cultural.JPG"]);
    assert.ok(await evaluate(`Promise.all(${JSON.stringify(photos)}.map(src=>new Promise(resolve=>{const image=new Image();const timer=setTimeout(()=>resolve(false),20000);image.onload=()=>{clearTimeout(timer);resolve(image.naturalWidth>0)};image.onerror=()=>{clearTimeout(timer);resolve(false)};image.src=src}))).then(results=>results.every(Boolean))`), "All three original photographs load");
    console.log("PASS: updated Marketplace hero/process/ecosystem/waitlist, original three-photo copy and assets, updated fonts and unchanged recruitment presentation.");
    for (const hash of ["#mission", "#how-it-works", "#spotlight", "#join", "#pilot"]) {
      await command("Page.navigate", { url: origin + "/" + hash });
      await waitFor(`location.pathname === '/marketplace' && location.hash === '${hash}' && !!document.getElementById('${hash.slice(1)}')`);
    }
    await command("Emulation.setDeviceMetricsOverride", { width: 768, height: 900, deviceScaleFactor: 1, mobile: false });
    await navigate("/marketplace");
    await evaluate(`document.querySelector('button[aria-label="Open navigation menu"]')?.click()`);
    await waitFor(`!!document.querySelector('a[href="/marketplace#pilot"]')`);
    await evaluate(`document.querySelector('a[href="/marketplace#pilot"]').click()`);
    await waitFor(`location.hash === '#pilot' && Math.abs(document.getElementById('pilot').getBoundingClientRect().top) < 5`);
    console.log("PASS: legacy homepage hash links and same-page pilot navigation.");
    for (const width of [1440, 390]) {
      await command("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
      for (const role of ["vendor", "driver"] as const) {
        await navigate("/marketplace");
        const route = role === "vendor" ? "/vendors" : "/drivers";
        await evaluate(`Array.from(document.querySelectorAll('a')).find(a => a.getAttribute('href') === '${route}' && a.textContent.includes('${role === "vendor" ? "List Your Business" : "Start Delivering"}')).click()`);
        await waitFor(`location.pathname === '${route}' && !!document.querySelector('form')`);
        const testEmail = email(`${role}-${width}`);
        const values = { ...base, email: testEmail,
          ...(role === "vendor" ? { businessName: "Synthetic Test Kitchen", businessType: "Restaurant" }
            : { vehicleType: "Bicycle", isAtLeast18: true }) };
        await evaluate(`(() => {
          const form = document.querySelector('form');
          if (form.checkValidity()) throw new Error('Empty form must be invalid');
          const values = ${JSON.stringify(values)};
          for (const [name,value] of Object.entries(values)) {
            const field = form.elements.namedItem(name);
            if (!field) throw new Error('Missing '+name);
            if (field.type === 'checkbox') field.checked = value;
            else field.value = value;
            field.dispatchEvent(new Event('change', {bubbles:true}));
          }
          if (!form.checkValidity()) throw new Error('Valid form rejected');
          form.requestSubmit();
        })()`);
        await waitFor(`/application received/i.test(document.body.innerText)`);
        assert.equal((await storage.getRecruitmentApplicationByEmail(role, testEmail))?.status, "New");
      }
    }
    await navigate("/marketplace");
    await evaluate("window.open = (url) => { window.__openedUrl = url; };");
    await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('Join the Waitlist')).click()`);
    assert.equal(await evaluate("window.__openedUrl"), "https://tally.so/r/Ek1QWA");
    await navigate("/partners");
    assert.ok(await evaluate(`Array.from(document.querySelectorAll('a,button')).some(a => (a.href || '').includes('tally.so/r/rjKA6p'))`), "Existing partnership form reachable");
    assert.deepEqual(errors, [], "No browser runtime exceptions");
    console.log("PASS: all routes at desktop, tablet and mobile; navigation, exact mission, both recruitment CTAs, four complete UI submissions persisted, waitlist and partnership entry points.");
  }
} finally {
  pool.query = originalQuery;
  storage.getWaitlistEntryByEmail = originalWaitlistLookup;
  await client.query("ROLLBACK");
  const remaining = await client.query("SELECT count(*)::int AS n FROM recruitment_applications WHERE email LIKE $1", [`corporate-${run}-%@example.invalid`]);
  assert.equal(remaining.rows[0].n, 0, "No synthetic submissions left behind");
  client.release();
  await pool.end();
  console.log("PASS: transaction rolled back; no test records retained and no real email sent.");
  socket?.close();
  chrome?.kill("SIGTERM");
  if (chrome) await new Promise<void>((resolve) => { chrome!.once("exit", () => resolve()); setTimeout(resolve, 3000).unref(); });
  if (profile) await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 }).catch(() => {});
  await new Promise<void>((resolve) => server.close(() => resolve()));
}
