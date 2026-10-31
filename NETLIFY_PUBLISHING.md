# Updating the existing jije.ca Netlify site

Use the existing GitHub repository and Netlify project. Do not create a new site,
move the domain, or replace the existing database with the marketplace database.

## What this preparation adds

- `netlify.toml`: build command `npm run build:netlify`, publish directory
  `dist/public`, functions directory `netlify/functions`, Node.js 22 build/runtime.
- Native API calls at `/api/*` go to a thin Netlify Functions adapter around the
  existing Express routes, storage, validation, consent and notification code.
- API rewrites include Netlify edge rate limiting; the existing Express rate
  limiter and honeypot remain. Platform rules require verification after publish.
- Every public route gets static initial HTML with its existing page-specific
  metadata. Direct links, `/partners`, PDFs, robots, sitemap and a real custom
  404 do not rely on a catch-all SPA rewrite.
- Removed the old automatic `test@example.com` startup seed. Publishing never
  creates test waitlist records or runs database migrations.
- Existing Replit/Node build and local preview commands remain unchanged.

## Before syncing GitHub

In the existing Netlify project's **Environment variables**, configure these
for the **Functions/runtime** scope in the **Production** context. Keep all
secret values in the secure Netlify interface, never in Git, screenshots or chat.

Required for native application persistence:

- `DATABASE_URL`: the approved landing-site recruitment PostgreSQL database.
  This must already contain the application's `waitlist_entries` and
  `recruitment_applications` tables and constraints. Confirm the actual schema
  against `shared/schema.ts` before use; do not automatically apply changes.
  Never connect the separate Jíjé marketplace production database.

For existing Purelymail notifications and applicant acknowledgments:

- `PURELYMAIL_SMTP_USER`
- `PURELYMAIL_SMTP_PASSWORD` (secret)
- `RECRUITMENT_EMAIL_FROM`
- `RECRUITMENT_EMAIL_TO` (existing designated team recipient)

The Vite/Tally URLs have existing defaults. If custom public form URL overrides
are used, make those public variables available in the **Builds** scope too.
Do not copy private keys into any `VITE_*` variable.

No database secret is necessary during the static build. Without a runtime
database setting the site still loads, but the API deliberately returns a clear
503 JSON error rather than pretending an application was saved. Missing or
failed email configuration does not undo a saved application.

No production credentials, target database, database schema or inbox delivery
have been verified by the local preparation tests.

## Release and verify

The committed `netlify.toml` supplies the correct settings; no need to edit the
old `npx vite build` command manually once this configuration is synced.

1. Review changes, then sync/push the approved branch to the existing GitHub
   repository using the normal GitHub publishing workflow.
2. Netlify builds that branch using the repository configuration and updates the
   existing site/domain. Check the deploy log for the API function and successful
   static build. Do not publish from a branch pointed at a test database.
3. Verify direct routes `/about`, `/marketplace`, `/intelligence`,
   `/partnerships`, `/contact`, `/vendors`, `/drivers`, `/privacy`, `/terms`.
4. Verify a single explicitly approved vendor/driver test submission, database
   persistence and actual inbox delivery. Clean up only identified test data
   through the authorized database workflow. Test duplicate/invalid feedback,
   original Tally destinations, PDFs, page metadata and unknown-route 404s.
5. Confirm Netlify's edge rate rule is active. Do not claim this based solely on
   a local Express test.

Do not force-push, change DNS, migrate production, or create a second Netlify
site as part of this update.

## Local checks

```
npm run check
npm run build:netlify
node --import tsx script/test-netlify.ts --development-test
```

The Netlify test uses the existing development database inside a transaction
that is always rolled back, and replaces both mail senders. It does not send
real email, write permanent applications, or modify production.
