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
