# Prompt: Rename to Children Love Feast & Fit Card Images to Container

## Goal
1. Update the **Love Feast & Fellowship** card title to **Children Love Feast & Fellowship** in both English (`messages/en.json`) and Italian (`messages/it.json`).
2. Update card image rendering across ministry and project cards to use `object-contain` with clean container styling (`bg-[#121212]`), ensuring the full image fits 100% inside the container without cropping or cutting off any people in the photos.

## Proposed Changes
1. **`messages/en.json`**:
   - Update `GetInvolved.loveFeast` to `"Children Love Feast & Fellowship"`.
2. **`messages/it.json`**:
   - Update `GetInvolved.loveFeast` to `"Festa dell'Amore per Bambini e Comunione"`.
3. **`app/[locale]/get-involved/page.tsx`**:
   - Update card image styling to `object-contain object-center bg-[#121212]` so every photo fits 100% inside the container without edge cropping.
4. **`app/[locale]/support-mission/page.tsx`**:
   - Update card image styling to `object-contain object-center bg-[#121212]` for complete visual presentation of all project photos.

## Verification
- Clear `.next` build cache and run static build (`cmd.exe /c npm run build`) to ensure clean compilation.
- Commit and push changes to GitHub `origin/main`.
