import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { getSiteMetadata } from "../shared/site-metadata";
import { renderSiteHtml } from "./site-seo";

export function serveStatic(app: Express, distPath = path.resolve(__dirname, "public")) {
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, { index: false }));

  // fall through to index.html if the file doesn't exist
  const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf8");
  app.get("/{*path}", (req, res) => {
    if (/\.[a-z0-9]+$/i.test(req.path)) {
      res.status(404).type("text/plain").send("File not found.");
      return;
    }
    res.status(getSiteMetadata(req.path).index ? 200 : 404)
      .set("Cache-Control", "no-cache")
      .type("html")
      .send(renderSiteHtml(template, req.path));
  });
}
