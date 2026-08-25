# Implementation Prompt: Update Sunday Worship Service Video Section to Autoplay Video

## Objective
Update the video card in `app/components/WatchSermonsSection.tsx` to play the Sunday Main Worship Service video (`/videos/sermon-worship-recording.mp4`) automatically on load, while removing the play button overlay and text overlay.

## Execution Steps

1. **Asset Copy**:
   - Copied `WhatsApp Video 2026-08-18 at 5.57.09 PM.mp4` (3.53 MB) to `public/videos/sermon-worship-recording.mp4`.

2. **Component Update (`app/components/WatchSermonsSection.tsx`)**:
   - Replace the static image, play button icon, and overlay text ("Sunday Main Worship Service Recording" / "The Narrow Gate Foursquare Church Media") with a clean, borderless HTML5 `<video>` tag:
     - `src="/videos/sermon-worship-recording.mp4"`
     - `autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"`
     - `className="w-full h-full object-cover object-center rounded-lg shadow-md"`

3. **Verification & Deployment**:
   - Verify build with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of homepage to confirm autoplay video playback in the sermons section.
   - Commit and push to `origin/main`.
