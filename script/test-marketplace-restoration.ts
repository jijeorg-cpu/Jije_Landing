import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import ts from "typescript";

const marketplace = "client/src/pages/LandingPage.tsx";
const original = execFileSync("git", ["show", `backup/pre-corporate-repositioning-2026-10-30:${marketplace}`], { encoding: "utf8" });
const baseline = "backup/pre-approved-simplification";
const before = execFileSync("git", ["show", `${baseline}:${marketplace}`], { encoding: "utf8" });
const current = readFileSync(marketplace, "utf8");

function compiledFunction(source: string, name: string) {
  const file = ts.createSourceFile("page.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let node: ts.FunctionDeclaration | undefined;
  function find(candidate: ts.Node) {
    if (ts.isFunctionDeclaration(candidate) && candidate.name?.text === name) node = candidate;
    ts.forEachChild(candidate, find);
  }
  find(file);
  assert.ok(node, `${name} exists`);
  // Normalize the old misspelled transparent utility; it never represented
  // a deliberate design element. Whitespace/comments do not affect comparison.
  return ts.transpileModule(node.getText(file).replace("to-  transparent", "to-transparent"), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, removeComments: true, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}
function sectionContent(source: string, name: string) {
  const file = ts.createSourceFile("page.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const section = file.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === name);
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
for (const name of ["HowItWorksSection", "AudienceSection", "RecruitmentSection"]) {
  assert.deepEqual(sectionContent(current, name), sectionContent(before, name), `${name} keeps its content and links while allowing approved colour changes`);
}
assert.deepEqual(
  sectionContent(current, "SolutionSection"),
  sectionContent(original, "SolutionSection").map(value => value === "Order meals and book culinary services from top rated African and Afro-Caribbean restaurants, vendors, chefs and caterers."
    ? "Explore meals from African and Afro-Caribbean restaurants and food businesses." : value),
  "Photo section preserves original photographs and content except newly approved chef/caterer scope clarification",
);
assert.ok(!current.includes("marketplace-original"), "No legacy Marketplace theme or wrapper");

for (const file of [
  "client/src/components/WaitlistForm.tsx",
  "client/src/pages/VendorsPage.tsx", "client/src/pages/DriversPage.tsx",
  "client/src/content/legal.json",
  "server/routes.ts", "server/storage.ts", "shared/schema.ts",
  "server/recruitment-notifications.ts",
]) {
  const saved = execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8" });
  const working = readFileSync(file, "utf8");
  assert.equal(working, saved, `Preserved: ${file}`);
}
const recruitment = "client/src/components/Recruitment.tsx";
const savedRecruitment = execFileSync("git", ["show", `${baseline}:${recruitment}`], { encoding: "utf8" });
for (const name of ["makePayload", "track", "readServerMessage", "optionalValue", "submitApplication", "markFormStarted"]) {
  assert.equal(compiledFunction(readFileSync(recruitment, "utf8"), name), compiledFunction(savedRecruitment, name), `Unchanged form behaviour: ${name}`);
}
for (const file of ["client/public/legal/jije-privacy-policy.pdf", "client/public/legal/jije-terms-of-service.pdf"]) {
  assert.deepEqual(readFileSync(file), execFileSync("git", ["show", `${baseline}:${file}`]), `Approved PDF preserved: ${file}`);
}
console.log("PASS: approved Marketplace content/photos, form payloads/submission/analytics behaviour, waitlist, database, mail and legal content preserved.");
