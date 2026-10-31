# Marketplace restoration and corporate refinement

## Recovery and scope

- Inspected the current unpublished state; the working tree was clean.
- Recovery branch: `backup/pre-targeted-marketplace-correction-2026-10-30`.
- Original Marketplace reference:
  `backup/pre-corporate-repositioning-2026-10-30`.
- No whole-project rollback, database migration, deployment, or integration
  change was performed.

## Marketplace restored

Restored from the original source:

- Text-only “Culture. Commerce. Community.” hero, introductory wording,
  coming-soon badge, and existing waitlist/legal links.
- “One Place for Culture & Community” and its original description.
- Authentic Food: original local food photograph, heading, and description.
- Grocery Discovery: the original Unsplash spices photograph, heading,
  and description—not a substitute photo or icon.
- Cultural Events: original local event photograph, title, and description.
- Original How It Works, audience cards, and final waitlist section.
- Original DM Sans/Outfit typography, colours, card styling, and section layout,
  isolated from the corporate visual system. Fonts are self-hosted with licenses.

The only normalized legacy class is the invalid `to-  transparent` token, now
`to-transparent`; no intended design element was replaced by that syntax fix.

The recently added multi-Kaya hero is removed as required by the new brief's
“original page plus recruitment only” scope. The uploaded asset remains intact.

The current recruitment section is unchanged—including both Kaya illustrations,
copy, styling, consent disclaimer, buttons, tracking, and vendor/driver links.
Shared corporate navigation and footer remain unchanged.

## Corporate copy simplified

- Home: requested concise supporting line, retained hero/photo/tagline and both
  business CTAs, shorter purpose and ecosystem sections, partnership CTA.
- About: four ordered sections; exact mission retained; two business cards;
  concise vision; standalone Our Approach removed.
- Intelligence: requested concise introduction; Cultural Knowledge, Intelligent
  Discovery, and Research, Insights & Applied Technology groups; underlying
  concepts retained as future-facing work; simpler audiences and one clear status.
- Partnerships/Contact: shorter routing explanations; original application and
  Tally destinations retained.

## Verification

Passed:

- `node --import tsx script/test-marketplace-restoration.ts`: compiled original
  Marketplace section comparison against history, current recruitment comparison,
  and exact protected-source comparison for forms, APIs, storage, schema, mail,
  legal text, corporate navigation, and footer.
- `npm run check`.
- `npm run build`.
- `node --import tsx script/test-corporate-regression.ts --development-test`:
  all eleven routes at 375, 390, 430, 768, and 1440px; no horizontal overflow or
  clipped primary headings; navigation, links, PDFs, anchors, legacy hash links,
  metadata, 404s, exact mission, four-section About and three Intelligence groups.
- All three original photographs loaded in the browser.
- Original Marketplace fonts and unchanged recruitment typography verified.
- Four full browser vendor/driver submissions persisted through the existing
  backend. Invalid/duplicate responses, New status, source, separate consent,
  and notification adapter invocation passed. The transaction was rolled back.
- `node --import tsx --test server/recruitment-notifications.test.ts`:
  three notification/save-first isolation tests passed.

No real mail or external Tally submission was sent. Actual inbox delivery is
not claimed as verified. Existing non-blocking Browserslist data warning remains.

## Before/after review

`generated-artifacts/jije-correction-before-after.html` is a self-contained
downloadable comparison of all six changed pages. Full-page captures reveal
scroll-triggered content before capture; original screenshot files are included
as embedded downloadable images. Generated review files are excluded from Git
and deployment.

The local preview remains available at the original routes. Nothing is published.
