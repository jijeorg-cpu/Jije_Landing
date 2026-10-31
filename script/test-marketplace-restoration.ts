import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import ts from "typescript";

const marketplace = "client/src/pages/LandingPage.tsx";
const original = execFileSync("git", ["show", `backup/pre-corporate-repositioning-2026-10-30:${marketplace}`], { encoding: "utf8" });
const before = execFileSync("git", ["show", `backup/pre-targeted-marketplace-correction-2026-10-30:${marketplace}`], { encoding: "utf8" });
const current = readFileSync(marketplace, "utf8");

function compiledFunction(source: string, name: string) {
  const file = ts.createSourceFile("page.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const node = file.statements.find(statement => ts.isFunctionDeclaration(statement) && statement.name?.text === name);
  assert.ok(node, `${name} exists`);
  // Normalize the old misspelled transparent utility; it never represented
  // a deliberate design element. Whitespace/comments do not affect comparison.
  return ts.transpileModule(node.getText(file).replace("to-  transparent", "to-transparent"), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, removeComments: true, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}
for (const name of ["HeroSection", "HowItWorksSection", "AudienceSection", "FinalCTA", "RecruitmentSection", "MarketplacePage"]) {
  assert.equal(compiledFunction(current, name), compiledFunction(before, name), `${name} matches UPDATED Marketplace baseline`);
}
function photoSectionContent(source: string) {
  const file = ts.createSourceFile("page.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const section = file.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === "SolutionSection");
  assert.ok(section);
  const values: string[] = [];
  function visit(node: ts.Node) {
    if (ts.isJsxText(node) && node.text.trim()) values.push(node.text.trim().replace(/\s+/g, " "));
    if (ts.isStringLiteral(node) && ts.isJsxAttribute(node.parent) && ["title", "description"].includes(node.parent.name.getText(file))) values.push(node.text);
    if (ts.isNoSubstitutionTemplateLiteral(node) && node.text.startsWith("url(")) values.push(node.text);
    ts.forEachChild(node, visit);
  }
  visit(section);
  return values;
}
assert.deepEqual(photoSectionContent(current), photoSectionContent(original), "Only photo section uses original heading, wording and photograph URLs");
assert.ok(!current.includes("marketplace-original"), "No legacy Marketplace theme or wrapper");

for (const file of [
  "client/src/components/Recruitment.tsx", "client/src/components/WaitlistForm.tsx",
  "client/src/components/Navbar.tsx", "client/src/components/SiteFooter.tsx",
  "client/src/pages/VendorsPage.tsx", "client/src/pages/DriversPage.tsx",
  "client/src/pages/LegalPage.tsx", "client/src/content/legal.json",
  "server/routes.ts", "server/storage.ts", "shared/schema.ts",
  "server/recruitment-notifications.ts",
  "client/src/pages/HomePage.tsx", "client/src/pages/AboutPage.tsx",
  "client/src/pages/IntelligencePage.tsx", "client/src/pages/PartnersPage.tsx",
  "client/src/pages/ContactPage.tsx",
]) {
  const saved = execFileSync("git", ["show", `backup/pre-marketplace-scope-clarification-2026-10-30:${file}`], { encoding: "utf8" });
  const removeLegacySeed = (source: string) => source.replace(
    /  \/\/ Seed with a test entry if empty[\s\S]*?(?=  return httpServer;)/, "",
  );
  const working = readFileSync(file, "utf8");
  assert.equal(file === "server/routes.ts" ? removeLegacySeed(working) : working,
    file === "server/routes.ts" ? removeLegacySeed(saved) : saved, `Preserved: ${file}`);
}
console.log("PASS: updated Marketplace restored except original photo-section copy/assets; simplified corporate pages, recruitment, forms, data, mail, legal, navigation and footer unchanged.");
