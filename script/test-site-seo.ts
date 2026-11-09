import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { getSiteMetadata, SITE_ORIGIN, sitePages, siteStructuredData, STRUCTURED_DATA_ID } from "../shared/site-metadata";
import { renderSiteHtml, siteRobots, siteSitemap } from "../server/site-seo";

// Run after build:netlify. No database, email, browser or external service needed.
const template = await readFile("client/index.html", "utf8");
const titles = new Set<string>();
const descriptions = new Set<string>();
for (const [route, page] of Object.entries(sitePages)) {
  assert(!titles.has(page.title), `Duplicate title: ${route}`);
  assert(!descriptions.has(page.description), `Duplicate description: ${route}`);
  titles.add(page.title);
  descriptions.add(page.description);
  const filename = route === "/" ? "index" : route.slice(1);
  const built = await readFile(`dist/public/${filename}.html`, "utf8");
  for (const html of [renderSiteHtml(template, route), built, renderSiteHtml(built, route)]) {
    assert.equal((html.match(/<title>/g) || []).length, 1, route);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route);
    assert(html.includes(`href="${SITE_ORIGIN}${route}"`), `Canonical: ${route}`);
    assert(html.includes('name="robots" content="index, follow"'), route);
    assert(html.includes('<noscript><main>'), `Non-JS summary: ${route}`);
    assert(html.includes('property="og:locale" content="en_CA"'), route);
    assert(html.includes('name="twitter:card" content="summary_large_image"'), route);
    for (const key of ["title", "description", "url", "image", "site_name"]) {
      assert.equal((html.match(new RegExp(`property="og:${key}"`, "g")) || []).length, 1, route);
    }
    const scripts = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1, `Exactly one identity graph: ${route}`);
    assert(html.includes(`id="${STRUCTURED_DATA_ID}"`));
    assert.deepEqual(JSON.parse(scripts[0][1]), siteStructuredData());
  }
}
const graph = siteStructuredData()["@graph"];
assert.equal(graph[0]["@type"], "Organization");
assert.equal(graph[0].legalName, "Jíjé Group Inc.");
assert(graph[0].alternateName.includes("Jije Group"));
assert.equal(graph[1]["@type"], "WebSite");
assert.equal(graph[1].publisher?.["@id"], graph[0]["@id"]);
assert.equal(graph[0].url, `${SITE_ORIGIN}/`);
const sitemap = siteSitemap();
assert.equal(await readFile("dist/public/sitemap.xml", "utf8"), sitemap);
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(locations, Object.keys(sitePages).map((route) => `${SITE_ORIGIN}${route}`));
assert(!sitemap.includes("/api/") && !sitemap.includes("/partners"));
assert.equal(await readFile("dist/public/robots.txt", "utf8"), siteRobots());
assert(siteRobots().includes("Allow: /\nDisallow: /api/\n"));
assert(siteRobots().includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`));
for (const alias of ["/partners", "/partnerships"]) {
  assert.equal(getSiteMetadata(alias).canonicalPath, "/contact");
}
const missing = await readFile("dist/public/404.html", "utf8");
assert(missing.includes('name="robots" content="noindex, follow"'));
// Verify the existing image dimensions match the sharing metadata.
const image = await readFile("dist/public/jije-social.png");
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
await readFile("dist/public/jije-icon-v2.png");
console.log(`SEO checks passed for ${titles.size} public pages: unique metadata, canonical URLs, identity JSON-LD, social tags, crawler summaries, sitemap, robots, aliases and 404.`);
