import express, { type ErrorRequestHandler } from "express";
import { createServer } from "node:http";
import { isIP } from "node:net";
import serverless from "serverless-http";
import type { registerRoutes as register } from "./routes";

type Registrar = typeof register;
type Options = {
  register?: Registrar;
  notify?: Parameters<Registrar>[2];
  receipt?: Parameters<Registrar>[3];
};

export async function createNetlifyApi(options: Options = {}) {
  // Lazy import lets the CDN website and function build work without DB secrets.
  // Runtime API access still requires the existing landing-site database.
  const registerRoutes = options.register ?? (await import("./routes")).registerRoutes;
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    // This header is supplied by Netlify's edge, not by the frontend.
    const clientIp = req.get("x-nf-client-connection-ip");
    if (clientIp && isIP(clientIp)) req.headers["x-forwarded-for"] = clientIp;
    next();
  });
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: false, limit: "16kb" }));
  await registerRoutes(createServer(app), app, options.notify, options.receipt);
  app.use((_req, res) => res.status(404).json({ message: "API endpoint not found." }));
  const errors: ErrorRequestHandler = (error, _req, res, _next) => {
    const status = error.status === 413 ? 413 : error.status === 400 ? 400 : 500;
    res.status(status).json({
      message: status === 413 ? "The request is too large."
        : status === 400 ? "Please check the submitted information."
        : "We couldn’t process this request just now. Please try again later.",
    });
  };
  app.use(errors);
  const invoke = serverless(app);
  return (event: object, context: object) => {
    const incoming = event as { path?: string };
    // Accept both the rewritten Netlify endpoint and the original /api URL.
    const path = incoming.path?.replace(/^\/\.netlify\/functions\/api(?=\/|$)/, "/api");
    return invoke({ ...event, ...(path ? { path } : {}) }, context);
  };
}
