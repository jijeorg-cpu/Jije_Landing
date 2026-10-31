import { createNetlifyApi } from "../../server/netlify-api";

let ready: ReturnType<typeof createNetlifyApi> | undefined;

// Netlify invokes this handler; no port/listener or database migration is started.
export async function handler(event: object, context: object) {
  // Let the response complete while the reusable PostgreSQL pool is idle.
  (context as { callbackWaitsForEmptyEventLoop?: boolean }).callbackWaitsForEmptyEventLoop = false;
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({
        message: "Applications are temporarily unavailable. Please try again later.",
      }),
    };
  }
  try {
    ready ??= createNetlifyApi();
    return await (await ready)(event, context);
  } catch {
    ready = undefined;
    // Do not log events, connection strings, credentials, or form values.
    console.error("Application API could not initialize.");
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({
        message: "Applications are temporarily unavailable. Please try again later.",
      }),
    };
  }
}
