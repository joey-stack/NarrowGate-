# Implementation Prompt: Dynamic Firestore Events Management (CRUD) & Automatic Upcoming Event Showcase

## Objective
1. **Firestore Database Collection (`events`)**:
   - Establish a dedicated Firestore `events` collection.
   - Define a comprehensive `ChurchEvent` TypeScript data model including:
     - `id`: Unique identifier
     - `title`: Event name
     - `theme`: Theme or motto (e.g. "A Year of Divine Grace & Fruitfulness")
     - `scripture`: Scripture reference (e.g. "Psalm 65:11")
     - `date`: ISO date (`YYYY-MM-DD`) for chronological sorting & automated filtering
     - `time`: Event hours (e.g. "10:00 AM – 1:30 PM")
     - `venue`: Physical address / sanctuary location in Motta di Livenza
     - `host`: Officiating minister / host team
     - `overview`: Comprehensive event description
     - `schedule`: Array of program milestones (`{ time: string, title: string }[]`)
     - `flyerUrl`: Poster image URL or local path (`/images/events/...`)
     - `tag`: Category badge ("Anniversary", "Family", "Youth", "Prayer", "Outreach")
     - `createdAt`: Timestamp
2. **Admin Dashboard Events CMS (`/admin`)**:
   - Add a dedicated **"Events Management"** tab to `app/admin/page.tsx`.
   - Admin features:
     - **Create Event Modal / Form**: Input all fields (title, theme, scripture, date, time, venue, host, schedule items, flyer URL).
     - **Edit Event**: Update dates, schedules, venues, or flyers when church calendar dates shift.
     - **Delete Event**: Remove events with confirmation.
     - **Quick Seed**: Button to automatically seed the default church annual calendar into Firestore if empty.
3. **Smart Automatic Upcoming Event Selection**:
   - Compute upcoming events by comparing `event.date >= today` sorted chronologically ascending.
   - **Homepage Featured Section (`FeaturedEventSection.tsx`)**:
     - Automatically renders the **first upcoming event** (closest date in the future).
     - When that event date passes, it automatically rolls over to the next upcoming event without manual code changes!
     - Displays full event card with flyer preview, theme, date, time, venue, and "View All Events" button.
4. **Enhanced Events Page UI (`app/[locale]/events/page.tsx`)**:
   - **Hero Featured Event**: Displays the top upcoming event with the full poster, detailed program schedule, "Add to Google Calendar", "Get Directions", and "Contact / RSVP".
   - **Upcoming Events Grid**: Card-based presentation adhering to the official Foursquare design system (`#121212`, `#B91C1C`, `#0284C7`, 8px rounded corners):
     - Poster image thumbnail
     - Date & time badges
     - Venue & host
     - Theme quote
     - Expandable or modal program schedule view
     - "Add to Calendar" and "Get Directions" buttons for every event!
   - **Past Events / Archive Section**: Displays completed events so church history is preserved.
5. **Fallback & Graceful Degradation**:
   - If Firestore is offline or still initializing, seamlessly fall back to local seed data so the site never shows a blank screen.
