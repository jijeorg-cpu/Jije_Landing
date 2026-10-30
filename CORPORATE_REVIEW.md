# JÍJÉ corporate website review

## Scope and recovery point

This is a local enhancement of the existing React/Vite/Wouter site, not a rebuild.
Before implementation, the working tree and local branches were inspected. The
existing main branch includes the unpublished recruitment, notification, Kaya,
and legal-document work. The `replit-agent` branch was compared with main; its
frontend files match the pre-change working site. The two notification branches
contain changes already represented in main.

Recovery branch: `backup/pre-corporate-repositioning-2026-10-30`.
No database migration, authentication change, dependency addition, or deployment
is part of this update.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Parent company; exact corporate headline, both businesses, story, evolving ecosystem |
| `/about` | Approved corporate introduction, exact mission, vision, approach, and both businesses |
| `/marketplace` | Existing Marketplace experience, waitlist, Kaya recruitment cards |
| `/intelligence` | Developing initiative, five focus areas, six intended audiences, and partnership CTA |
| `/partnerships`, `/partners` | Same preserved vendor, delivery partner, and other partnership selection |
| `/contact` | Existing general partnership inquiry path and recruitment entry points |
| `/vendors`, `/drivers` | Existing native recruitment pages, unchanged forms |
| `/privacy`, `/terms` | Existing approved legal text and PDF downloads |

Legacy homepage hashes `#mission`, `#how-it-works`, `#spotlight`, `#join`, and
`#pilot` lead to the corresponding Marketplace sections.

## Preserved submission workflows

- Recruitment still posts to `/api/applications`, with the same validation,
  anti-spam controls, duplicate handling, consent, fields, and confirmation copy.
- The same `recruitment_applications` table stores submissions with type, source,
  timestamps, and initial status `New`. Team viewing/export instructions remain
  in `RECRUITMENT_ADMIN.md`.
- Team notification and applicant acknowledgment adapters are unchanged.
- The existing Tally waitlist (`Ek1QWA`) and general partnership form (`rjKA6p`)
  remain reachable. No Tally submissions are removed or modified.
- The approved legal content and PDFs are unchanged.

## Verification

- TypeScript and production build.
- Existing notification and failure-isolation regression tests.
- Local browser checks of all eleven routes at desktop, tablet, and mobile widths.
- Every discovered internal link, PDF link, and anchor destination.
- Supplied About introduction, vision, and approach; all Intelligence focus areas
  and audiences; working Intelligence partnership CTA.
- Complete vendor and driver UI submissions at desktop and mobile widths,
  verified through the actual DatabaseStorage implementation and PostgreSQL.
- Valid submissions remain `New`; source and marketing-consent defaults retained.
- Invalid input and duplicate submissions receive 400 and 409 responses.
- Exact official mission, legacy anchors, navigation, waitlist, partnership links,
  and lack of horizontal overflow.

The repeatable browser/database harness is:

```sh
npm run build
node --import tsx script/test-corporate-regression.ts --development-test
```

It wraps database access in a transaction and always rolls it back, bypasses the
pre-existing waitlist seed, and injects test mail adapters instead of contacting
SMTP. It does not submit to Tally. Production records are not changed. Real SMTP
delivery and external Tally form submission were not re-tested in this update.

## Assumptions for review before publishing

- About, Marketplace, Intelligence, Partnerships, and Contact use the routes
  listed above; these are new public informational pages.
- Contact uses the approved existing partnership inquiry form, rather than
  inventing a public inbox or adding another submission system.
- Intelligence is described only as developing, with no implied availability,
  release date, data integration, or enterprise offering.
- Original company imagery, green/cream/gold identity, logo, and role-specific
  Kaya artwork are retained. Marketplace recruitment remains associated with
  Marketplace and is linked from relevant corporate pages.

No new environment variables or integrations are required. Review the preview
and public copy before approving any live deployment.

## Intelligence capability review

Inspection of this website's backend and frontend found recruitment/waitlist
submission implementations, but no verified Intelligence public API, production
AI system, enterprise subscription, or prototype implementation. This does not
establish the status of systems outside this repository. Public Intelligence
copy therefore describes developing and exploratory work, not available
products or existing commercial partnerships.

The user requested that the existing partnership page design and content remain
unchanged. `/partnerships` serves that same component, with `/partners` retained
for compatibility. Navigation and the Intelligence CTA use `/partnerships`.
