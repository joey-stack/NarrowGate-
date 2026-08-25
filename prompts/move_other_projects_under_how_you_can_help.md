# Implementation Prompt: Move Other Initiatives Stack Directly Under How You Can Help Card

## Objective
Move the "Other Outreach Initiatives" cards from the bottom section into the right column (`lg:col-span-4`) directly underneath the dark "How You Can Help" support box, stacked vertically on top of each other.

## Execution Steps

1. **Project Detail Page Component (`app/[locale]/support-mission/[slug]/page.tsx`)**:
   - Update the right-hand column (`lg:col-span-4`) container:
     - Place the "How You Can Help" / "Support This Initiative" dark card at the top of the column.
     - Move the "Other Outreach Initiatives" list directly under the card, stacked vertically.
     - Style each initiative card with an image header (`h-36`), badge, title, and "View →" link.
   - Remove the separate bottom section for "Other Outreach Initiatives" at the end of the page.

2. **Verification & Deployment**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of `/en/support-mission/education-fund` to confirm the vertical card stack directly under "How You Can Help".
   - Commit and push to `origin/main`.
