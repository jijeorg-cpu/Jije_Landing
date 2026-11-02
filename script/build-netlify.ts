import { build } from "vite";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderSiteHtml, siteRobots, siteSitemap } from "../server/site-seo";
import { sitePages } from "../shared/site-metadata";

await build();
const directory = path.resolve("dist/public");
const template = await readFile(path.join(directory, "index.html"), "utf8");
for (const route of Object.keys(sitePages)) {
  // Netlify's pretty URLs serve about.html at /about without a SPA catch-all.
  const filename = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  await writeFile(path.join(directory, filename), renderSiteHtml(template, route));
}
await writeFile(path.join(directory, "404.html"), renderSiteHtml(template, "/not-found"));
await writeFile(path.join(directory, "robots.txt"), siteRobots());
await writeFile(path.join(directory, "sitemap.xml"), siteSitemap());
console.log("Netlify pages, route metadata, custom 404, robots and sitemap generated.");
