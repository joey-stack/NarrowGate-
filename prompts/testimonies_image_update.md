# Implementation Prompt: Testimonies & Thanksgiving Card WebP Image Update

## Objective
Convert the uploaded Testimonies and Thanksgiving sanctuary image to WebP format (`public/images/testimonies.webp`) and update the Testimonies & Thanksgiving card in `app/[locale]/get-involved/page.tsx` to reference `/images/testimonies.webp`.

## Execution Steps

1. **Image Asset Placement**:
   - The user-uploaded sanctuary testimony image has been converted to optimized WebP format and saved to [`public/images/testimonies.webp`](file:///C:/Users/devwk/Documents/antigravity/modest-rutherford/public/images/testimonies.webp) (102.0 KB).

2. **Get Involved Page Update (`app/[locale]/get-involved/page.tsx`)**:
   - Update the `testimonies` item in the `ministries` array from external Framer URL to local WebP asset path `/images/testimonies.webp`.

3. **Verification & Testing**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of the Get Involved page to visually verify the card image.
   - Commit and push to `origin/main`.
