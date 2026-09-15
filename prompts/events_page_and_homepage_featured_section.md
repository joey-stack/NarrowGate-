# Implementation Prompt: Dedicated Events Page & Homepage Featured Event Section

## Objective
1. Create a dedicated bilingual Events page (`app/[locale]/events/page.tsx`) following the official Foursquare brand design system (`#121212` dark charcoal, `#B91C1C` crimson red accent, `#0284C7` secondary accent, 8px rounded corners, Poppins/Inter typography).
2. The Events page will feature:
   - Hero banner with eyebrow badge, page title, and supportive description.
   - **Featured Special Event Hero Card**: Prominently showcasing the Church Anniversary Celebration (theme, scripture, date/time, venue address in Motta di Livenza, anniversary flyer artwork, and actions for "Add to Calendar", "Get Directions", and "RSVP / Inquire").
   - **Upcoming Gatherings & Special Celebrations Grid**: Showing upcoming events (Annual Anniversary Thanksgiving, Children's Love Feast, Cultural Sunday Celebration, Youth & Young Adults Worship Encounter, Special Prayer & Fasting Summit, Community Outreach Day).
   - Easy place for the client to swap or upload event flyers (image path `/images/events/anniversary-flyer.webp`).
3. Add a **Featured Event Section** on the Homepage (`app/components/FeaturedEventSection.tsx`):
   - Positioned in a high-impact spot directly after `WeeklyGatheringsDarkSection`.
   - Displays the current anniversary celebration flyer, event highlights (date, time, venue, theme), and a prominent CTA button: **"View All Events →" / "Vedi Tutti gli Eventi →"** linking directly to `/${locale}/events`.
4. Update the **Footer** (`app/components/Footer.tsx`):
   - Add a direct link to the Events page (`/${locale}/events`) under church services/links.
   - **STRICT REQUIREMENT**: Do **NOT** add the Events link to the main navigation header/navbar (as explicitly instructed by the user).
5. Add complete bilingual localization keys in `messages/en.json` and `messages/it.json` under `Events` and `FeaturedEvent` namespaces (no hardcoded strings).

## Key Files to Create / Modify
- **[NEW]** `app/[locale]/events/page.tsx`: Dedicated Events page.
- **[NEW]** `app/components/FeaturedEventSection.tsx`: Homepage featured event / anniversary teaser section.
- **[NEW]** `public/images/events/anniversary-flyer.webp`: High-resolution church anniversary celebration flyer asset.
- **[MODIFY]** `app/[locale]/page.tsx`: Include `<FeaturedEventSection />` on the homepage.
- **[MODIFY]** `app/components/Footer.tsx`: Add "Events & Celebrations" link in the footer.
- **[MODIFY]** `messages/en.json` & `messages/it.json`: Add bilingual localization strings for events and featured anniversary details.
