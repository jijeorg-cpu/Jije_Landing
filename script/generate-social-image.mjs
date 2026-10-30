import { readFile, mkdtemp, writeFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";

const temp = await mkdtemp(path.join(tmpdir(), "jije-social-"));
try {
  const logo = (await readFile("client/public/jije-icon-v2.png")).toString("base64");
  const font = (await readFile("client/public/fonts/quicksand-latin.woff2")).toString("base64");
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><style>
    @font-face{font-family:Quicksand;src:url(data:font/woff2;base64,${font});font-weight:400 700}
    *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#F9F9F9;color:#3B3B3B;font-family:Quicksand,sans-serif}
    main{height:100%;padding:45px 64px;border-bottom:18px solid #008431;position:relative}
    img{position:absolute;right:45px;top:25px;width:260px;height:260px;object-fit:contain}
    .eyebrow{font-size:22px;color:#705335;font-weight:700;letter-spacing:3px;margin:30px 0 45px}
    h1{font-size:62px;line-height:1.14;margin:0;max-width:900px;color:#008431;font-weight:700}
    p{font-size:24px;line-height:1.5;max-width:900px;margin:32px 0 28px}
    .businesses{font-size:22px;font-weight:600;display:flex;gap:30px;align-items:center}
    .dot{width:10px;height:10px;border-radius:50%;background:#9AC31C}
  </style><main><img alt="JÍJÉ" src="data:image/png;base64,${logo}">
    <div class="eyebrow">JÍJÉ GROUP INC.</div><h1>Rooted in Culture.<br>Powered by Intelligence.</h1>
    <p>Connecting African and Afro-Caribbean food,<br>cultural knowledge, commerce, and technology.</p>
    <div class="businesses"><span>JÍJÉ Marketplace</span><span class="dot"></span><span>JÍJÉ Intelligence</span></div>
  </main></html>`;
  const file = path.join(temp, "social.html");
  await writeFile(file, html);
  execFileSync("/repl/tools/bin/chromium", [
    "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
    `--user-data-dir=${path.join(temp, "profile")}`, "--window-size=1200,630",
    "--force-device-scale-factor=1", "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=1500", `--screenshot=${path.resolve("client/public/jije-social.png")}`,
    `file://${file}`,
  ], { stdio: "ignore", timeout: 30000 });
  console.log("Created client/public/jije-social.png (1200×630) using the approved logo.");
} finally {
  await rm(temp, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
}
