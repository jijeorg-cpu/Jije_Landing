# JÍJÉ final local website review

## Status

Local preview only. No deployment or production database changes were performed.
The supplied brand guide informs visual styling; the newer approved corporate
mission, taglines, and prelaunch scope take precedence over older guide copy.

## Pages and components changed

- Home (`/`): parent-company explanation, equal business discovery, official
  headline, palette/type, responsive presentation.
- About (`/about`): supplied approved copy preserved, visual/branding corrections.
- Marketplace (`/marketplace`, implemented in `LandingPage.tsx`): branding,
  card readability, replacement of the generic remote spices photograph with
  a branded graphic. Existing approved JÍJÉ photos and Kaya remain.
- Intelligence (`/intelligence`): visual consistency; all five focus areas,
  six audiences, partnership link, and developing-initiative disclaimer preserved.
- Partnerships (`/partnerships`, compatibility alias `/partners`): approved
  content and layout preserved; visual tokens/type updated only.
- Contact (`/contact`): brand presentation; existing inquiry paths preserved.
- Vendors and Drivers (`Recruitment.tsx`): shared styling and company-case
  normalization, with unchanged fields, consent meaning, payloads, analytics,
  application processing, and confirmation wording other than company case.
- Privacy and Terms (`LegalPage.tsx`): wrapper branding and centralized metadata;
  approved source text and PDF files untouched.
- Missing page (`not-found.tsx`): public branded 404 and useful recovery links,
  replacing developer-template content.
- Shared: Navbar, SiteFooter, SectionHeading, PageMeta, App, global CSS,
  HTML shell, and web manifest. Original logo bytes unchanged.

## Branding and clarity

- JÍJÉ — **Rooted in Culture. Powered by Intelligence.**
- JÍJÉ Marketplace — **Your Culture, Delivered.**
- JÍJÉ Intelligence — **Cultural Knowledge. Real-World Intelligence.**
- Quicksand is self-hosted with its SIL Open Font License; no additional font
  service or package dependency is required at runtime.
- Market Green, Heritage Lime, Ivory Glow, Earthy Charcoal, Golden Plantain,
  and Cocoa supporting colours reflect the guide.
- Enlarged the existing logo without modifying/recreating its image.
- Improved small-copy and button contrast and keyboard-focus visibility.
- No live AI/API product, active broad-area order acceptance, guaranteed earnings,
  fixed commissions, launch dates, or finalized shopper model is promised.
- Historical uploaded briefs, legal source documents, and unchanged transactional
  email copy were not rewritten merely to standardize website capitalization.

## SEO and route handling

- Shared metadata registry drives both client-side navigation and initial HTML.
- Unique page titles/descriptions, canonical URLs, OG/Twitter fields, Canadian
  locale, and an approved-logo 1200 × 630 social-sharing image.
- `/robots.txt` and `/sitemap.xml`; API URLs are excluded from crawler discovery.
- `/partners` remains available, canonicalized to `/partnerships`.
- Branded missing routes return HTTP 404 with noindex; unknown APIs return JSON
  404 rather than the SPA shell. Missing static files also return 404.
- Initial HTML supplies a no-JavaScript page description and route directory.
  Interactive content/forms still require JavaScript; this is not a full SSR
  migration.
- Canonicals use the user-supplied `https://jije.ca` domain, never the preview
  host. The workspace deployment-information service reports no active attached
  deployment, so production-domain attachment/redirects must be checked during
  the separately approved publishing process. No domain configuration changed.

## Functional and mobile verification

Successful:

- TypeScript: `npm run check`.
- Production build: `npm run build`.
- Browser/database regression:
  `node --import tsx script/test-corporate-regression.ts --development-test`.
- Notification isolation tests:
  `node --import tsx --test server/recruitment-notifications.test.ts`.
- Eleven routes at 1440, 768, 430, 390, and 375 CSS pixels wide; no horizontal
  overflow or clipped primary headings. Navigation available at all widths.
- Every discovered internal link, legal PDF, and referenced in-page anchor.
- Legacy homepage hashes and pilot navigation.
- Exact mission and approved About/Intelligence content.
- Correct route metadata, canonical links, self-hosted fonts, and eager images.
- Real vendor and driver database persistence, New status, source, separate
  consent, invalid/duplicate responses, and four complete browser submissions
  across desktop/mobile. All synthetic data was rolled back.
- No real SMTP messages were sent. Notification adapters and save-first failure
  isolation passed; inbox delivery was not re-tested with live messages.
- Existing waitlist/partnership entry points retained; both Tally URLs respond
  HTTP 200. No external Tally submission or modification was made.
- Visual screenshots: complete desktop homepage and mobile driver hero.
- Development server restarted and healthy; direct preview HTML metadata and
  real missing-page HTTP 404 confirmed.
- Schema, storage, submission API, package files, runtime configuration,
  legal bodies/PDFs, and original logo confirmed unchanged.

## Remaining notes for founder review

- No blocking copy/implementation question remains. The older mission and
  availability wording in the supplied brand guide should be revised separately
  if that document will be distributed externally.
- The site remains a responsive SPA, not a server-rendered application. Initial
  SEO/social metadata is now server-delivered.
- Large original Kaya PNGs remain unchanged. Optimized display variants could
  reduce mobile data use without replacing originals.
- A non-blocking outdated Browserslist-data warning remains. No dependency
  upgrade was made during this review.
- Actual inbox delivery, external Tally submissions, and production-domain
  behaviour are not claimed as verified by this local test pass.
- No new environment variables, database migrations, or integration credentials
  are needed for these changes.

Preview `/`, `/about`, `/marketplace`, `/intelligence`, `/partnerships`,
`/contact`, `/vendors`, `/drivers`, `/privacy`, and `/terms` locally before
authorizing any publication.
