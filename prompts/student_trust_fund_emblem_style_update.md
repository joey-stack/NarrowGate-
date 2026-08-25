# Implementation Prompt: Student Trust Fund Emblem Image Width & Border Update

## Objective
1. Expand the width of the Student's Trust Fund emblem graphic to match the full width of the paragraph text container (`w-full`).
2. Remove the black border (`border border-black/10`), background box, and padding surrounding the emblem image for a borderless presentation.

## Execution Steps

1. **Project Detail Page Layout (`app/[locale]/support-mission/[slug]/page.tsx`)**:
   - Update the emblem image container for `slug === "education-fund"`:
     - Remove `max-w-xl`, `border`, `border-black/10`, `shadow-md`, `bg-white`, and `p-4`.
     - Set container width to `w-full` matching the exact width of paragraph `P1` and `P2`.
     - Adjust responsive height (`h-[300px] sm:h-[420px] lg:h-[500px]`) and object fit (`object-contain object-center`) for clean scaling.

2. **Verification & Deployment**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of `/en/support-mission/education-fund` to visually inspect full-width borderless emblem rendering.
   - Commit and push to `origin/main`.
