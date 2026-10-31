---
name: Existing website publishing path
description: Preserve the user's GitHub-backed jije.ca publishing workflow rather than substituting Replit Publish.
---

Update the existing GitHub-backed deployment for jije.ca. Do not substitute a
new Replit deployment or suggest moving the domain as the default release path.
The live domain was verified as served by Netlify.

**Why:** the user corrected the Replit Publish suggestion and specified the
existing GitHub-to-jije.ca workflow.

**How to apply:** inspect the existing repository/hosting configuration before
release. Native recruitment forms need the server and database; a static frontend
build alone is insufficient. Preserve the domain and existing hosting path,
verify backend compatibility, and never claim a release happened without evidence.

Keep the public site on Netlify's CDN with route-specific static metadata, and
adapt the existing Express recruitment API through Netlify Functions. Keep the
standalone Node/Replit build available rather than replacing it.

**Why:** the existing Netlify settings build only Vite static assets, which cannot
execute native form submission/storage/email logic. A thin adapter preserves the
approved backend and existing domain without introducing a replacement platform.

**How to apply:** use the Netlify-specific build configuration for that host;
configure runtime database/mail credentials securely in Netlify, independently of
local secrets. Confirm the approved recruitment database and schema before release.
Do not seed sample records or run migrations during function startup or builds.
