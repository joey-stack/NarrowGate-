# Implementation Prompt: Shelter & Widows Project Card WebP Image Update

## Objective
Convert the uploaded Shelter & Widows project image to WebP format (`public/images/shelter-widows.webp`) and update the Shelter & Widows project card in `app/[locale]/support-mission/page.tsx` to reference `/images/shelter-widows.webp`.

## Execution Steps

1. **Image Asset Placement**:
   - The user-uploaded Shelter & Widows project image has been converted to optimized WebP format and saved to [`public/images/shelter-widows.webp`](file:///C:/Users/devwk/Documents/antigravity/modest-rutherford/public/images/shelter-widows.webp) (97.5 KB).

2. **Support Mission Page Update (`app/[locale]/support-mission/page.tsx`)**:
   - Update the `shelter` item in the `projects` array from external Framer URL to local WebP asset path `/images/shelter-widows.webp`.

3. **Verification & Testing**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of the Support Mission page to visually verify the card image.
   - Commit and push to `origin/main`.
