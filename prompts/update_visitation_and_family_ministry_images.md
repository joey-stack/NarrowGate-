# Prompt: Update Visitation and Families Ministry Card Images

## Goal
Update the image assets for both the **Visitation & Follow-up** card and the **Families Ministry** card on the Get Involved page (`app/[locale]/get-involved/page.tsx`) with the user's provided authentic photographs.

## Proposed Changes
1. **Asset Creation**:
   - Converted the visitation photo to `public/images/visitation.webp` (1024x576, 98.5 KB).
   - Converted the family pastoral counseling photo to `public/images/ministries/families-ministry.webp` (1024x576, 143.4 KB) and `public/images/ministries/families-ministry.jpg` (1024x576, 166.7 KB).
2. **`app/[locale]/get-involved/page.tsx`**:
   - Update `visitation` item image path to `/images/visitation.webp`.
   - Update `families` item image path to `/images/ministries/families-ministry.webp`.

## Verification
- Clear `.next` build cache and run static build (`cmd.exe /c npm run build`) to ensure clean compilation.
- Commit and push changes to GitHub `origin/main`.
