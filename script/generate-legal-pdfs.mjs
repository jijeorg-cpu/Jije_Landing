import { readFileSync, mkdirSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Convert the verbatim document paragraphs used by the website to printable PDFs.
// Uses the workspace's Chromium tool; no runtime application dependency.
const root = fileURLToPath(new URL("../", import.meta.url));
const documents = JSON.parse(readFileSync(join(root, "client/src/content/legal.json"), "utf8"));
const output = join(root, "client/public/legal");
const temporary = mkdtempSync(join(tmpdir(), "jije-legal-pdf-"));
const escape = (text) => text.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);
mkdirSync(output, { recursive: true });

try {
  for (const [kind, paragraphs] of Object.entries(documents)) {
    const filename = kind === "privacy" ? "jije-privacy-policy.pdf" : "jije-terms-of-service.pdf";
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
      <title>${escape(paragraphs[0])} | Jíjé</title><style>
      @page { size: Letter; margin: 20mm 19mm; }
      body { font-family: Arial, sans-serif; color: #202b24; font-size: 10.5pt; line-height: 1.55; }
      h1 { color: #1d4d35; font-size: 28pt; line-height: 1.15; margin: 0 0 12pt; }
      h2 { color: #1d4d35; font-size: 13pt; line-height: 1.3; margin: 22pt 0 8pt; break-after: avoid; }
      p { margin: 0 0 10pt; orphans: 3; widows: 3; }
      .metadata { font-size: 9pt; color: #555; border-bottom: 1px solid #cad3c8; padding-bottom: 14pt; margin-bottom: 20pt; }
      .bullet { margin-left: 14pt; text-indent: -10pt; }
      </style></head><body>
      <h1>${escape(paragraphs[0])}</h1><p class="metadata">${escape(paragraphs[1])}</p>
      ${paragraphs.slice(2).map((text) => /^\d+\.\s/.test(text)
        ? `<h2>${escape(text)}</h2>`
        : `<p${text.startsWith("• ") ? ' class="bullet"' : ""}>${escape(text)}</p>`).join("\n")}
      </body></html>`;
    const input = join(temporary, `${kind}.html`);
    writeFileSync(input, html);
    execFileSync("chromium", [
      "--headless", "--no-sandbox", "--disable-gpu",
      `--user-data-dir=${join(temporary, `browser-${kind}`)}`,
      "--no-pdf-header-footer", "--export-tagged-pdf",
      `--print-to-pdf=${resolve(output, filename)}`, `file://${input}`,
    ], { stdio: "pipe", timeout: 60000 });
    console.log(`Created client/public/legal/${filename}`);
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
