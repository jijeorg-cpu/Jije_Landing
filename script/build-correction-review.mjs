import { readFile, writeFile } from "node:fs/promises";

const pages = [
  ["marketplace", "Marketplace restored", "Original hero, descriptions, three photographs, process, audience cards, and final waitlist section restored from history. Current recruitment cards and corporate navigation/footer retained."],
  ["home", "JÍJÉ Group homepage", "Shorter introduction, central business cards, concise purpose and ecosystem sections, and retained partnership CTA."],
  ["about", "About JÍJÉ", "Four main sections: Who We Are, Our Mission, What We’re Building, and Our Vision. Official mission unchanged; standalone Our Approach removed."],
  ["intelligence", "JÍJÉ Intelligence", "Concise introduction, three consolidated focus groups, simpler audiences, and one clear development-status statement."],
  ["partnerships", "Partnerships", "Less repeated explanation with the existing vendor, delivery, and broader inquiry destinations preserved."],
  ["contact", "Contact", "A shorter company-inquiry introduction and preserved application/inquiry destinations."],
];
const rows = await Promise.all(pages.map(async ([slug, title, description]) => {
  const before = (await readFile(`generated-artifacts/before-${slug}.jpg`)).toString("base64");
  const after = (await readFile(`generated-artifacts/after-${slug}.jpg`)).toString("base64");
  return `<section id="${slug}"><h2>${title}</h2><p>${description}</p><div class="comparison">
    <figure><figcaption>Before this correction</figcaption><a href="#" onclick="this.href=this.querySelector('img').src" download="jije-before-${slug}.jpg"><img src="data:image/jpeg;base64,${before}" alt="${title} before corrections" loading="lazy"></a></figure>
    <figure><figcaption>After correction</figcaption><a href="#" onclick="this.href=this.querySelector('img').src" download="jije-after-${slug}.jpg"><img src="data:image/jpeg;base64,${after}" alt="${title} after corrections" loading="lazy"></a></figure>
  </div></section>`;
}));
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>JÍJÉ — Before & After Review</title><style>
*{box-sizing:border-box}body{margin:0;background:#f9f7f2;color:#3b3b3b;font:16px/1.6 system-ui,sans-serif}header,main{max-width:1500px;margin:auto;padding:28px}
header{padding-top:44px}h1,h2{line-height:1.2;color:#1a4d2e}h1{font-size:clamp(28px,4vw,48px)}h2{margin-bottom:12px}p{max-width:950px}
nav{display:flex;gap:12px;flex-wrap:wrap}nav a{color:#1a4d2e;border:1px solid #a7b5a4;border-radius:24px;padding:7px 16px;text-decoration:none}
section{border-top:1px solid #d6dccf;padding:24px 0 48px;scroll-margin-top:20px}.comparison{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start}
figure{margin:0;background:white;border:1px solid #d6dccf;border-radius:12px;overflow:hidden}figcaption{font-weight:700;padding:12px 18px;background:#e9eee3}
img{width:100%;height:auto;display:block}.note{padding:16px 20px;border-left:4px solid #008431;background:#e9eee3}
@media(max-width:650px){header,main{padding:20px}.comparison{grid-template-columns:1fr}}
</style></head><body><header><p>JÍJÉ GROUP · LOCAL REVIEW</p><h1>Marketplace restoration & corporate refinement</h1><p class="note">Nothing has been deployed. These full-page desktop captures compare the local website immediately before and after this targeted correction. Scroll-triggered content was revealed before capture. Select an image to download it at full resolution.</p><nav>${pages.map(([slug, title]) => `<a href="#${slug}">${title}</a>`).join("")}</nav></header><main>${rows.join("\n")}<section><h2>Preserved and verified</h2><p>Shared corporate navigation and footer; current recruitment cards; native vendor and driver fields, validation, consent, submission/storage and notifications; waitlist and inquiry destinations; legal text and PDFs; exact official mission; all existing routes.</p><p>Desktop/mobile browser tests and real database form tests passed. Synthetic submissions were rolled back; no actual notification email or external Tally submission was sent. The original food, spices, and event photographs loaded successfully.</p></section></main></body></html>`;
await writeFile("generated-artifacts/jije-correction-before-after.html", html);
console.log("Created generated-artifacts/jije-correction-before-after.html");
