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

Use Supabase Free in Canada Central for the production recruitment database.

**Why:** the user chose Canadian hosting, then selected “Supabase Free in Canada”
after comparing free Canadian and US database options.

**How to apply:** verify the database's Canadian region before provisioning;
do not silently substitute a US region or paid plan. Use PostgreSQL with the
existing backend, not a replacement authentication or marketplace integration.
This choice concerns the database and does not establish Canadian residency for
Netlify processing or email services. Account for free-plan inactivity pausing
and the lack of automatic backups before relying on it for applications.

Check lockfile download URLs before external hosting releases, especially after
adding packages through Replit's package tools.

**Why:** package additions recorded Replit-internal firewall tarball URLs that
Netlify could not resolve, causing dependency installation to fail.

**How to apply:** keep Replit's package security checks enabled. For the portable
lockfile, use the corresponding public npm tarball URLs with unchanged versions
and integrity hashes, and verify those hashes before release. Changing a registry
setting alone does not repair absolute URLs already stored in the lockfile.
