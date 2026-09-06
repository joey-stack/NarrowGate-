# Prompt: Update Counseling and Spiritual Guidance Card Image

## Goal
Update the image asset for the **Counseling & Spiritual Guidance** card on the Get Involved page (`app/[locale]/get-involved/page.tsx`) with the user's provided pastoral counseling photograph.

## Proposed Changes
1. **Asset Creation**:
   - Converted the uploaded counseling photo to `public/images/ministries/guidance-counseling.webp` (1024x576, 83.8 KB) and `public/images/ministries/guidance-counseling.jpg` (1024x576, 116.9 KB).
2. **`app/[locale]/get-involved/page.tsx`**:
   - Update `counseling` item image reference to `/images/ministries/guidance-counseling.webp`.

## Verification
- Run static build (`cmd.exe /c npm run build`) to ensure clean compilation.
- Commit and push changes to GitHub `origin/main`.
