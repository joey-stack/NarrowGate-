# Implementation Prompt: Event Archive & Dedicated Detail Pages Redesign

## 1. Overview & Core Objectives
Separate the Church Events experience into a clean **Archive Page** and a dedicated **Event Detail Page**, alongside a redesigned **Homepage Event Card**:
1. **Archive Page (`/[locale]/events`)**:
   - Acts as an archive housing all event cards, sorted starting from the closest upcoming event.
   - Each event card features **content on the left** and the **flyer/image on the right** (mobile responsive, stacking vertically on smaller screens).
   - Below all the event cards, the **Weekly Activities & Gatherings** (Wednesday Bible Study, Saturday Intercessory Prayer, Sunday Breakfast, Sunday Worship) are displayed in a clean, dedicated section.
   - Clicking an event card redirects to that event's dedicated Detail Page (`/[locale]/events/[id]`).
2. **Event Detail Page (`/[locale]/events/[id]`)**:
   - Dedicated page detailing everything about that specific program.
   - Houses the actions: **"Add to Calendar"**, **"Get Directions"** (Google Maps), **"RSVP / Inquire"**, full timetable schedule breakdown, speaker/host details, and full flyer zoom modal.
3. **Homepage Special Event Section (`FeaturedEventSection.tsx`)**:
   - Modern, clean card layout: content on the left, flyer on the right.
   - Primary CTA: **"View Event Details →"** linking directly to `/[locale]/events/[id]`.
   - Secondary CTA: **"View All Events →"** linking to the archive page `/[locale]/events`.
   - Optimized for mobile responsiveness.

## 2. Technical Architecture & File Changes

### A. Data Store & API (`lib/events-store.ts`)
- Add `getChurchEventById(id: string): Promise<ChurchEvent | null>` to fetch any event (static default or Firestore dynamic) by its ID.
- Ensure event IDs are URL-friendly (e.g. `anniversary-2026`).

### B. Event Archive Page (`app/[locale]/events/page.tsx`)
- Refactor `EventsClientView.tsx` into `EventsArchiveView.tsx`:
  - Header: "All Church Events & Celebrations" + subtitle.
  - Filter pills: "Upcoming Events" / "Past Events" / "All".
  - Event Cards List:
    - Left: Category badge, Title, Date & Time, Venue, Theme & Scripture quote, Short description, "View Event Details →" button.
    - Right: Event flyer with hover effects.
    - Mobile: Fluid single-column stacking with high touchability.
  - Weekly Activities Section:
    - Displayed below all event cards.
    - Features the 4 weekly gatherings with schedules and "Plan a Visit" CTA.

### C. Dedicated Event Detail Page (`app/[locale]/events/[id]/page.tsx`)
- Dynamic route `app/[locale]/events/[id]/page.tsx` with `generateStaticParams`.
- Client component `app/components/EventDetailClientView.tsx`:
  - Breadcrumb navigation (`Home > Events > [Event Title]`) and "← Back to All Events".
  - Main Column:
    - Title, Date, Time, Venue, Category tag.
    - Theme callout card (e.g. *"Back to Bethel"*, Gen. 31:13).
    - Full Event Overview & Story.
    - Full Program Schedule / Session breakdown.
    - Action Bar: "Add to Calendar", "Get Directions", "RSVP / Inquire".
  - Sidebar Column:
    - Official Flyer with click-to-expand lightbox preview.
    - Quick Event Facts card (Date, Time, Venue, Host).
    - Plan Your Visit trigger.

### D. Homepage Featured Section (`app/components/FeaturedEventSection.tsx`)
- Redesign into a clean horizontal card with content on the left and flyer on the right.
- Links "View Event Details" to `/[locale]/events/[id]`.
- Links "View All Events" to `/[locale]/events`.

### E. Translations (`messages/en.json` & `messages/it.json`)
- Add bilingual keys for archive and detail pages in English and Italian.
