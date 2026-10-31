import express from "express";
import { createServer } from "node:http";
import { mkdtemp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import WebSocket from "ws";
import { serveStatic } from "../server/static";
import { registerSiteSeo } from "../server/site-seo";

const phase = process.argv[2];
if (!["before", "after"].includes(phase)) throw new Error("Specify before or after.");
const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const profile = await mkdtemp(path.join(tmpdir(), "jije-review-"));
const app = express();
registerSiteSeo(app);
serveStatic(app, path.resolve("dist/public"));
const server = createServer(app);
await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
const address = server.address() as { port: number };
const chrome = spawn("/repl/tools/bin/chromium", [
  "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
  "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore" });
let socket: WebSocket | undefined;
try {
  let debugPort = "";
  for (let i = 0; i < 100; i++) {
    try { debugPort = (await readFile(path.join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0]; break; }
    catch { await pause(100); }
  }
  if (!debugPort) throw new Error("Chromium did not start.");
  const tabs = await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json() as { type: string; webSocketDebuggerUrl: string }[];
  socket = new WebSocket(tabs.find(tab => tab.type === "page")!.webSocketDebuggerUrl);
  await new Promise<void>((resolve, reject) => { socket!.once("open", resolve); socket!.once("error", reject); });
  let id = 0;
  const pending = new Map<number, { resolve: (value: any) => void; reject: (error: Error) => void }>();
  socket.on("message", data => {
    const message = JSON.parse(data.toString());
    const item = pending.get(message.id);
    if (!item) return;
    pending.delete(message.id);
    if (message.error) item.reject(new Error(message.error.message));
    else item.resolve(message.result);
  });
  const command = (method: string, params = {}): Promise<any> => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    socket!.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression: string) => (await command("Runtime.evaluate", {
    expression, returnByValue: true, awaitPromise: true,
  })).result.value;
  await command("Page.enable");
  await command("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await mkdir("generated-artifacts", { recursive: true });
  const metrics: Record<string, { words: number; height: number }> = {};
  for (const [name, route] of Object.entries({
    marketplace: "/marketplace", home: "/", about: "/about",
    intelligence: "/intelligence", partnerships: "/partnerships", contact: "/contact",
  })) {
    await command("Page.navigate", { url: `http://127.0.0.1:${address.port}${route}` });
    for (let i = 0; i < 100; i++) {
      if (await evaluate(`location.pathname === ${JSON.stringify(route)} && document.readyState === 'complete' && !!document.querySelector('h1')`)) break;
      await pause(100);
    }
    await evaluate("document.fonts.ready");
    await evaluate(`(() => {const s=document.createElement('style');s.textContent='html{scroll-behavior:auto!important}';document.head.appendChild(s)})()`);
    const height = await evaluate("document.documentElement.scrollHeight") as number;
    for (let y = 0; y < height; y += 700) {
      await evaluate(`window.scrollTo(0,${y})`);
      await pause(160);
    }
    await evaluate("window.scrollTo(0,0)");
    await pause(900);
    const words = await evaluate(`(() => {const c=document.querySelector('main').cloneNode(true);c.querySelectorAll('nav,footer').forEach(n=>n.remove());return c.textContent.trim().split(/\\s+/).length})()`) as number;
    metrics[name] = { words, height };
    const image = await command("Page.captureScreenshot", {
      format: "jpeg", quality: 78, captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: 1440, height, scale: 1 },
    });
    await writeFile(`generated-artifacts/${phase}-${name}.jpg`, Buffer.from(image.data, "base64"));
    console.log(`${phase}: ${name}, ${words} words, ${height}px`);
  }
  await writeFile(`generated-artifacts/${phase}-metrics.json`, JSON.stringify(metrics, null, 2));
} finally {
  socket?.close();
  chrome.kill("SIGTERM");
  await new Promise<void>(resolve => server.close(() => resolve()));
  await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
}
