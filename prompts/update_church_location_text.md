# Prompt: Update Church Location Phrasing Across Website

## Goal
Update all location references across the website (headers, hero badges, body copy, footers, meta descriptions, contact sections, and translation files) to use the exact specified location phrasing:
- **English**: `"located in Motta di Livenza, in the province of Treviso, North-East Italy"` (or `"Via Cadamure 1/19, 31045 Motta di Livenza, Province of Treviso, North-East Italy"` for addresses).
- **Italian**: `"situata a Motta di Livenza, in provincia di Treviso, nord-est Italia"` (or `"Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italia"` for addresses).

## Files to Update
1. **`messages/en.json`** & **`messages/it.json`**:
   - `Hero.locationBadge`, `Hero.tagline`, `Hero.subtitle`
   - `WeeklyGatherings.subtitle`
   - `WhoWeAre.subtitle`
   - `AboutLeadership.subtitle`
   - `PastorWelcome.headerIntro`
   - `ContactLocation.title`, `ContactLocation.addressText`
   - `About.subtitle`, `About.historyText`
   - `SupportMission.subtitle`
   - `Footer.location`, `PlanVisitModal.subtitle`
2. **Components & Layout**:
   - `app/[locale]/layout.tsx`: Update SEO metadata title, description, and JSON-LD schema location text.
   - `app/components/Footer.tsx`: Update footer brand paragraph location text.
   - `app/components/AboutHeroSection.tsx`: Update badge location label.
   - `app/components/WhoWeAreSection.tsx`: Update badge location label.
   - `app/[locale]/contact/page.tsx`: Update contact card location text.

## Verification
- Clear `.next` build cache and run static production build (`cmd.exe /c npm run build`).
- Verify clean compilation across all 36 static pages.
- Commit and push changes to GitHub `origin/main`.
