# Prompt: Update Visitation & Follow-Up Card Image

## Goal
Update the image asset for the **Visitation & Follow-up** card on the Get Involved page (`app/[locale]/get-involved/page.tsx`) with the user's provided church visitation team photograph.

## Proposed Changes
1. **Asset Creation**:
   - Converted the uploaded visitation photo into optimized WebP format saved at `public/images/visitation.webp` (1024x576, 98.5 KB).
2. **`app/[locale]/get-involved/page.tsx`**:
   - Confirm card 2 (`visitation`) references `/images/visitation.webp`.

## Verification
- Clear `.next` build cache and run static build (`cmd.exe /c npm run build`) to ensure clean compilation.
- Commit and push changes to GitHub `origin/main`.
