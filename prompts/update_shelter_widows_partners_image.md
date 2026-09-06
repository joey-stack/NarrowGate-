# Prompt: Update Shelter & Widows Projects Card Image

## Goal
Update the image asset for the **Shelter & Widows Projects** card on the Support Mission page (`app/[locale]/support-mission/page.tsx`) and detail banner page (`app/[locale]/support-mission/[slug]/page.tsx`) to use the user's provided "The Foursquare Shelter Partners" committee photograph.

## Proposed Changes
1. **Asset Creation**:
   - Converted the uploaded photograph to optimized WebP format saved at `public/images/shelter-widows-partners.webp` (1024x576, 131.7 KB).
2. **`app/[locale]/support-mission/page.tsx`**:
   - Update `img` reference for `shelter-widows` project to `/images/shelter-widows-partners.webp`.
3. **`app/[locale]/support-mission/[slug]/page.tsx`**:
   - Update `img` reference for `shelter-widows` project to `/images/shelter-widows-partners.webp`.

## Verification
- Clear `.next` cache and run static build (`cmd.exe /c npm run build`) to ensure clean compilation.
- Commit and push changes to GitHub `origin/main`.
