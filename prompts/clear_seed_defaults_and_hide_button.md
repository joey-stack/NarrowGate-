# Implementation Prompt: Clear Seed Defaults & Permanently Hide Button

## 1. Overview & Objectives
1. Eliminate all placeholder cards that borrowed regular weekly services imagery (`intercessory-prayer.jpg`, `sunday-service.jpg`, etc.) from fallback arrays.
2. In `lib/events-store.ts`:
   - Keep only the single real Church Anniversary celebration in `DEFAULT_EVENTS`.
   - Add `clearAllEvents()` which deletes all documents from the Firestore `events` collection and sets a persistence flag (`defaultSeedsCleared = true`).
   - Add `isDefaultSeedsCleared()` so the app knows when the admin has intentionally cleared the database.
   - When Firestore is empty and seeds have been cleared, return an empty array `[]` rather than falling back to dummy service cards.
3. In `app/admin/page.tsx`:
   - Add the "Clear Seed Defaults" button.
   - As requested by user: **"once they clear the seed default, the button should not display again"**. The button state will permanently disappear once cleared.
4. In `EventsClientView.tsx`:
   - When `events.length === 0`, display a polished, modern empty-state card (*"No upcoming special events scheduled at this moment. Stay tuned for future announcements!"*).
5. In `messages/en.json` and `messages/it.json`:
   - Provide bilingual strings for the empty state.
