# Implementation Prompt: Support Banco Alimentare Card WebP Image Update

## Objective
Convert the uploaded European Food Bank image to optimized WebP format (`public/images/banco-alimentare.webp`) and update the Banco Alimentare project card in `app/[locale]/support-mission/page.tsx` to reference `/images/banco-alimentare.webp`.

## Execution Steps

1. **Image Asset Placement**:
   - The user-uploaded European Food Bank image has been converted to optimized WebP format and saved to [`public/images/banco-alimentare.webp`](file:///C:/Users/devwk/Documents/antigravity/modest-rutherford/public/images/banco-alimentare.webp) (95.8 KB).

2. **Support Mission Page Update (`app/[locale]/support-mission/page.tsx`)**:
   - Update the `img` field of the Banco Alimentare project card from external Framer URL to local WebP asset path `/images/banco-alimentare.webp`.

3. **Verification & Testing**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of the Support Mission page to visually verify the card image.
   - Commit and push to `origin/main`.
