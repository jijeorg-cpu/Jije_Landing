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
for (const name of ["HeroSection", "SolutionSection", "HowItWorksSection", "AudienceSection", "FinalCTA"]) {
  assert.equal(compiledFunction(current, name), compiledFunction(original, name), `${name} matches pre-corporate source`);
}
assert.equal(compiledFunction(current, "RecruitmentSection"), compiledFunction(before, "RecruitmentSection"), "Current approved recruitment unchanged");

for (const file of [
  "client/src/components/Recruitment.tsx", "client/src/components/WaitlistForm.tsx",
  "client/src/components/Navbar.tsx", "client/src/components/SiteFooter.tsx",
  "client/src/pages/VendorsPage.tsx", "client/src/pages/DriversPage.tsx",
  "client/src/pages/LegalPage.tsx", "client/src/content/legal.json",
  "server/routes.ts", "server/storage.ts", "shared/schema.ts",
  "server/recruitment-notifications.ts",
]) {
  const saved = execFileSync("git", ["show", `backup/pre-targeted-marketplace-correction-2026-10-30:${file}`], { encoding: "utf8" });
  assert.equal(readFileSync(file, "utf8"), saved, `Preserved: ${file}`);
}
console.log("PASS: original Marketplace section source restored; current recruitment and protected forms, data, mail, legal, navigation and footer code unchanged.");
