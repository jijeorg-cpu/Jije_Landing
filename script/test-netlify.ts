import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { pool } from "../server/db";
import { storage } from "../server/storage";
import { registerRoutes } from "../server/routes";
import { createNetlifyApi } from "../server/netlify-api";
import { getSiteMetadata, sitePages, SITE_ORIGIN } from "../shared/site-metadata";

assert.ok(process.argv.includes("--development-test"), "Explicit development test flag required");
assert.notEqual(process.env.NODE_ENV, "production", "Never run against production");
for (const route of [...Object.keys(sitePages), "/partners", "/not-found"]) {
  const file = route === "/" ? "index" : route === "/not-found" ? "404" : route.slice(1);
  const html = await readFile(`dist/public/${file}.html`, "utf8");
  const meta = getSiteMetadata(route);
  assert.ok(html.includes(`<title>${meta.title}</title>`), `Static title ${route}`);
  assert.ok(html.includes(`href="${SITE_ORIGIN}${meta.canonicalPath}"`), `Static canonical ${route}`);
  assert.ok(html.includes('property="og:image"'));
  assert.ok(html.includes('name="twitter:card"'));
  assert.ok(html.includes('src="/assets/'));
}
assert.ok((await readFile("dist/public/robots.txt", "utf8")).includes("Disallow: /api/"));
assert.ok((await readFile("dist/public/sitemap.xml", "utf8")).includes(`${SITE_ORIGIN}/vendors`));
console.log("PASS: Netlify static files for every route, alias, custom 404, metadata, robots and sitemap.");

const client = await pool.connect();
const originalQuery = pool.query;
const run = randomUUID();
const sent: string[] = [];
const emails: string[] = [];
try {
  await client.query("BEGIN");
  pool.query = client.query.bind(client) as typeof pool.query;
  const invoke = await createNetlifyApi({
    register: registerRoutes,
    notify: async application => {
      const saved = await storage.getRecruitmentApplicationByEmail(application.applicationType, application.email);
      assert.equal(saved?.id, application.id);
      sent.push(`team:${application.id}`);
    },
    receipt: async application => { sent.push(`receipt:${application.id}`); },
  });
  async function request(path: string, payload: unknown, ip = "198.51.100.80", raw = false, method = "POST") {
    return await invoke({
      path, httpMethod: method,
      headers: {
        "content-type": "application/json", "x-nf-client-connection-ip": ip,
        "x-forwarded-for": "198.51.100.254", host: "jije.ca",
      },
      queryStringParameters: null, multiValueQueryStringParameters: null,
      requestContext: { identity: { sourceIp: ip } },
      body: method === "GET" ? null : raw ? payload : JSON.stringify(payload), isBase64Encoded: false,
    }, {}) as { statusCode: number; body: string };
  }
  for (const [index, role] of ["vendor", "driver"].entries()) {
    const email = `netlify-${role}-${run}@example.invalid`;
    emails.push(email);
    const payload = {
      firstName: "Netlify", lastName: "Regression", email,
      phone: "+1 (416) 555-0100", cityArea: "Toronto", contactConsent: true,
      applicationType: role,
      ...(role === "vendor" ? { businessName: "Synthetic Kitchen", businessType: "Restaurant" }
        : { vehicleType: "Bicycle", isAtLeast18: true }),
    };
    const ip = `198.51.100.${80 + index}`;
    const path = index ? "/api/applications" : "/.netlify/functions/api/applications";
    const response = await request(path, payload, ip);
    assert.equal(response.statusCode, 201, response.body);
    const saved = await storage.getRecruitmentApplicationByEmail(role as "vendor" | "driver", email);
    assert.equal(saved?.status, "New");
    assert.equal(saved?.marketingConsent, false);
    assert.equal(saved?.source, role === "vendor" ? "/vendors" : "/drivers");
    assert.ok(sent.includes(`team:${saved?.id}`) && sent.includes(`receipt:${saved?.id}`));
    assert.equal((await request(path, payload, ip)).statusCode, 409);
    assert.equal((await request(path, { ...payload, email: "not-an-email" }, ip)).statusCode, 400);
  }
  assert.equal((await request("/api/applications", "{", "198.51.100.82", true)).statusCode, 400);
  assert.equal((await request("/api/applications", JSON.stringify({ comments: "x".repeat(20_000) }), "198.51.100.83", true)).statusCode, 413);
  assert.equal((await request("/api/no-such-route", null, "198.51.100.84", false, "GET")).statusCode, 404);
  for (let attempt = 0; attempt < 6; attempt++) {
    const response = await request("/api/applications", {}, "198.51.100.85");
    assert.equal(response.statusCode, attempt < 5 ? 400 : 429);
  }
  console.log("PASS: both Netlify event paths, real vendor/driver persistence, New status, consent, mail adapters, duplicates, validation, request limits, rate limiting and JSON API 404.");
} finally {
  await client.query("ROLLBACK");
  pool.query = originalQuery;
  client.release();
}
for (const email of emails) {
  const result = await pool.query("SELECT count(*)::int AS n FROM recruitment_applications WHERE email = $1", [email]);
  assert.equal(result.rows[0].n, 0);
}
await pool.end();
console.log("PASS: no test records retained; no SMTP traffic or production changes.");
