# Implementation Prompt: Standardize All Project Detail Pages to Match Student Trust Fund Layout

## Objective
Apply the exact layout, styling, and structural design of the Student Education Trust Fund detail page across all Community Outreach project detail pages (`banco-alimentare` and `shelter-widows`).

## Key Design Principles to Apply
1. **Uniform `#f2ebd1` Background**: Change container card backgrounds on all detail pages to `bg-[#f2ebd1]` so the entire page rests on the warm off-white background with zero white card boxes or white section backgrounds.
2. **Simplified Overview Structure**: Remove the impact stats bar section and key objectives list box across all project detail pages.
3. **Consistent Sidebar Layout**: Maintain the right-column sidebar (`lg:col-span-4`) featuring the dark "Support This Initiative" card at the top, with the "Other Outreach Initiatives" cards stacked vertically directly underneath it.

## Execution Steps

1. **Page Component Updates (`app/[locale]/support-mission/[slug]/page.tsx`)**:
   - Remove the `slug !== "education-fund"` condition around stats bar and objectives list by removing both blocks entirely.
   - Update overview container styling to `bg-[#f2ebd1]` unconditionally.
   - Ensure all project detail pages share the identical clean layout.

2. **Verification & Deployment**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshots of all 3 detail pages (`education-fund`, `banco-alimentare`, `shelter-widows`) to visually confirm identical layout styling.
   - Commit and push to `origin/main`.
