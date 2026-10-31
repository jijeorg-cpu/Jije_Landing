---
name: External hosting secret entry
description: Keep Netlify database and mail credentials out of MCP payloads and logs.
---

Enter Netlify database and mail secrets directly in Netlify's secure environment-variable interface, not through its MCP environment-variable updater.

**Why:** inspection of the official Netlify MCP implementation showed that the updater logs submitted environment-variable values and existing variable objects. Its list operation can also return values rather than metadata only.

**How to apply:** the connected MCP can identify the existing site and inspect non-secret deployment information. Do not retrieve environment-variable values or pass credentials through the updater. Do not promise that Replit's secret-entry form saves directly into Netlify.
