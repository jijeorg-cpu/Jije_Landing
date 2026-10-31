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

### Canadian Supabase Free database

The selected production provider is Supabase Free in **Canada Central
(`ca-central-1`)**, separate from the marketplace. Confirm the specific region
and Free plan in that project's dashboard; do not choose a general Americas
region or a paid plan. The local development database stays unchanged.

1. In the new `jije-recruitment-production` project's **SQL Editor**, run
   `supabase/recruitment-setup.sql` once. Check the project name/region first.
   It creates only the existing backend's two tables/enums, with RLS enabled,
   no public policies, and browser/Data API role permissions revoked.
   It contains no credentials or sample applications. It stops rather than
   modifying an existing public application schema. If it stops, inspect the
   target; never delete tables to make the script run.
2. The final metadata query should show `waitlist_entries` and
   `recruitment_applications` with `row_level_security_enabled = true`.
   Authorized team administrators can use Table Editor and its CSV export;
   the site's visitors cannot read applications through the Supabase Data API.
3. Use **Connect → Transaction pooler** (the shared pooler, port `6543`) for
   Netlify Functions, not the Free plan's IPv6-only direct endpoint. Copy the
   exact dashboard-generated host and username; never construct them from the
   region or project name. Use the saved database password, URL-encoded if
   necessary, only in the private connection setting. Require TLS; do not
   disable certificate verification to resolve connection errors.
4. Store that PostgreSQL connection URI as `DATABASE_URL` only in Netlify's
   Production/Functions secret settings. Do not use a Supabase anon key,
   publishable key, or service-role key in its place. No Supabase JavaScript
   client or authentication change is needed for the existing `pg` backend.
   Never send passwords/URIs in chat, screenshots, or Git.
5. Configure the four existing Purelymail settings below separately. Creating
   a Supabase project does not configure Netlify or email.

Free-plan caveats: projects can pause after a week of inactivity, pausing native
application persistence until restored, and automatic database backups are not
included. Monitor status and quotas; arrange secure, access-controlled backups
before collecting irreplaceable applications. Canadian database storage does
not imply Netlify function or email processing stays in Canada.

This is a one-time manual setup for the approved external database, not a
Replit-managed production migration. It is never executed by builds or cold
starts. The setup's transaction and matching schema/access controls are tested
locally; actual Supabase connection, API permissions and Netlify runtime behavior
still require verification against the selected project.

### Netlify runtime settings

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
node --import tsx script/test-supabase-setup.ts --development-test
```

The Netlify test uses the existing development database inside a transaction
that is always rolled back, and replaces both mail senders. It does not send
real email, write permanent applications, or modify production.

The Supabase setup test instead uses a uniquely named development schema and
synthetic roles, simulates default Data API grants, validates the SQL against
the backend schema and checks privacy controls; all of it is rolled back.
