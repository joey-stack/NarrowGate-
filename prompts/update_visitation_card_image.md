# Implementation Prompt: Update Visitation & Follow-up Card Image

## Objective
Convert the user-provided image to optimized WebP format (`public/images/visitation.webp`) and update the Visitation & Follow-up ministry card in `app/[locale]/get-involved/page.tsx` to reference this local asset.

## Execution Steps

1. **Asset Conversion**:
   - Converted uploaded image (`media__1787674647649.jpg`) to `public/images/visitation.webp` (71.3 KB).

2. **Component Update (`app/[locale]/get-involved/page.tsx`)**:
   - Update the `visitation` ministry card object image path to `/images/visitation.webp`.

3. **Verification & Deployment**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of `/en/get-involved` to visually confirm the updated card image.
   - Commit and push to `origin/main`.
