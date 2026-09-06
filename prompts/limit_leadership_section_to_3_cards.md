# Prompt: Limit About Page Leadership Grid to 3 Members

## Goal
Modify the **Meet Our Leaders** section on the About page (`app/components/AboutLeadershipSection.tsx`) to display only 3 leadership cards in a single row instead of 6 cards. 
Prepare the leadership data structure so the user can easily provide the names, roles, and image assets for these 3 leaders.

## Proposed Changes
1. **`app/components/AboutLeadershipSection.tsx`**:
   - Update `leaders` array to contain only 3 items (`l1`, `l2`, `l3`).
   - Keep grid layout `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8` (or 3-column layout on desktop).
2. **`messages/en.json` & `messages/it.json`**:
   - Clean up `AboutLeadership` section keys `l4`, `l5`, `l6`.

## Verification
- Run static build (`cmd.exe /c npm run build`) to ensure clean compilation.
- Verify 3 leadership cards render in a single row on desktop views.
