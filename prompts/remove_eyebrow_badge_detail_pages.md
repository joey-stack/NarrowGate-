# Implementation Prompt: Remove Eyebrow Badge on All Project Detail Pages

## Objective
Remove the red-to-yellow eyebrow badge element (`bg-eyebrow-gradient`) situated below the back button on all project detail pages (`app/[locale]/support-mission/[slug]/page.tsx`).

## Execution Steps

1. **Project Detail Page Header (`app/[locale]/support-mission/[slug]/page.tsx`)**:
   - Remove the eyebrow badge `<div>` tag containing `{t(`${projectKey}.badge`)}` below the back navigation link.
   - Adjust bottom margin on the back navigation link (`mb-6` or `mb-8`) so the main page `H1` headline sits directly below the back link.

2. **Verification & Deployment**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of `/en/support-mission/education-fund` to confirm headline placement directly below back button.
   - Commit and push to `origin/main`.
