import type { Express } from "express";
import { getSiteMetadata, SITE_ORIGIN, SOCIAL_IMAGE, sitePages } from "../shared/site-metadata";

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]!));

/** Route-specific metadata in the initial HTML, before JavaScript runs. */
export function renderSiteHtml(template: string, pathname: string) {
  const meta = getSiteMetadata(pathname);
  const canonical = `${SITE_ORIGIN}${meta.canonicalPath === "/" ? "/" : meta.canonicalPath}`;
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
    `<meta name="robots" content="${meta.index ? "index, follow" : "noindex, follow"}">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    `<meta property="og:site_name" content="JÍJÉ">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta property="og:image" content="${SOCIAL_IMAGE}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="JÍJÉ — Rooted in Culture. Powered by Intelligence.">`,
    `<meta property="og:locale" content="en_CA">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
    `<meta name="twitter:image" content="${SOCIAL_IMAGE}">`,
    `<meta name="twitter:image:alt" content="JÍJÉ — Rooted in Culture. Powered by Intelligence.">`,
  ].join("\n    ");
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*(?:name=["'](?:description|robots|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "")
    .replace("</head>", `    ${tags}\n  </head>`);
  if (meta.index) {
    // A small crawlable route directory also works for visitors without JS.
    const links = Object.entries(sitePages).map(([route, page]) =>
      `<li><a href="${route}">${escapeHtml(page.title)}</a></li>`).join("");
    html = html.replace('<div id="root"></div>', `<div id="root"></div><noscript><main><h1>${escapeHtml(meta.title)}</h1><p>${escapeHtml(meta.description)}</p><p>Enable JavaScript to use the interactive site and application forms.</p><nav aria-label="Site pages"><ul>${links}</ul></nav></main></noscript>`);
  }
  return html;
}

export function siteRobots() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

export function siteSitemap() {
  const urls = Object.keys(sitePages).map((route) =>
    `<url><loc>${SITE_ORIGIN}${route}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export function registerSiteSeo(app: Express) {
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(siteRobots());
  });
  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml").send(siteSitemap());
  });
  // Unknown API URLs must not masquerade as successful HTML pages.
  app.use("/api", (_req, res) => res.status(404).json({ message: "API endpoint not found." }));
}
