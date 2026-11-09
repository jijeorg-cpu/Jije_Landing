# Jíjé technical SEO review

## Scope

Targeted metadata and structured-data improvements for https://jije.ca.
No visual page copy, layouts, imagery, Marketplace cards, registration forms,
application endpoints, DNS, hosting, email or deployment settings were changed.
These changes are local and have not been published.

## Live-site baseline

The homepage, About, Marketplace, Intelligence and Contact all returned HTTP 200,
with their correct production-domain canonical URLs and no blocking
X-Robots-Tag header. The live robots.txt returned plain text, allowed public
pages, excluded /api/, and referenced the correct XML sitemap. The sitemap
contained all nine canonical public pages. The existing social image returned
HTTP 200 with an image/png content type.

The existing titles and descriptions were already unique. The principal gaps
were missing Organization/WebSite identity data and opportunities to make
brand-specific search metadata clearer.

## Changes

| Page | Updated title |
| --- | --- |
| Home | Jíjé Group \| African & Afro-Caribbean Food and Culture |
| About | About Jíjé Group Inc. \| Our Mission, Vision and Culture |
| Marketplace | Jíjé Marketplace \| African & Afro-Caribbean Food Pilot |
| Intelligence | Jíjé Intelligence \| Food Knowledge, Culture and Research |
| Contact | Contact Jíjé Group \| Partnerships and General Inquiries |

Each page also has a distinct description in shared/site-metadata.ts.
Marketplace remains a planned Toronto/GTA pilot. Intelligence remains a
developing initiative; no launched-service claims were added.

Added a linked Schema.org Organization/WebSite JSON-LD graph:

- Official website: https://jije.ca/.
- Organization legal name: Jíjé Group Inc.
- Accented and unaccented alternate names, including Jíjé, Jije and Jije Group.
- Separate Marketplace and Intelligence Brand entries with unaccented aliases.
- Stable entity identifiers and a WebSite publisher reference to the Organization.
- Existing public brand icon as the organization logo.
- No fabricated addresses, ratings, launch dates or functional site-search action.

The identity graph is present in initial HTML for crawlers and maintained during
client-side navigation, without duplicate script blocks. Social profiles are
included only after their exact URLs are confirmed by the owner.

Open Graph and Twitter metadata continue to use page-specific titles,
descriptions and canonical URLs, with the existing 1200 × 630 public sharing
image. The route-aware client now also maintains the Canadian English locale
and Twitter image alternative text consistently with initial HTML.

## Preserved and verified

- HTTPS, non-www, self-referencing canonical URLs for all nine public pages.
- Nine-page sitemap: /, /about, /marketplace, /intelligence, /contact,
  /vendors, /drivers, /privacy and /terms.
- robots.txt allows public crawling and excludes /api/.
- All nine public routes return HTTP 200 and index/follow metadata locally.
- An unknown route returns HTTP 404 and noindex/follow.
- Existing partnership aliases resolve metadata to /contact and stay out of
  the sitemap; existing redirect configuration is unchanged.
- Static HTML contains route-specific metadata, identity JSON-LD and a
  non-JavaScript page summary/navigation. The full interactive page still uses
  JavaScript; this work does not introduce full server-side rendering.
- Homepage visual smoke check: layout, artwork and branding unchanged.

## Automated checks

Passed:

```sh
npm run check
npm run build:netlify
node --import tsx script/test-site-seo.ts
git diff --check
```

The SEO regression script checks generated production HTML and server rendering,
including repeat-render deduplication, parseable JSON-LD, entity relationships,
unique metadata, canonical URLs, social tags, crawler summaries, sitemap,
robots.txt, 404 metadata and sharing image dimensions.

These are local structural checks, not a Google indexing or rich-results
guarantee. No Search Console access, sitemap submission or live publication was
performed. Search engines must recrawl after publication; rankings and display
of site names or structured data are at their discretion.
