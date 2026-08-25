# Implementation Prompt: Use 0825.mp4 for Sermon Worship Video Section

## Objective
Update `app/components/WatchSermonsSection.tsx` on the homepage so that the **Sermon Worship Video** section plays the `0825.mp4` video (available in optimized VP9 WebM format at `/videos/worship-marquee.webm` and `/videos/worship-marquee.mp4`).

## Execution Steps

1. **Update `app/components/WatchSermonsSection.tsx`**:
   - Change the `<video>` element `<source>` tags to point to `/videos/worship-marquee.webm` (primary VP9 stream, 1.19 MB) and `/videos/worship-marquee.mp4` (fallback).

2. **Verification & Deployment**:
   - Verify build with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of homepage.
   - Commit and push to `origin/main`.
