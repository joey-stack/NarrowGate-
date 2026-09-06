# Implementation Prompt: Replace Shelter Card Image with Free Unsplash Photo

## Objective
Replace the generated image for the **Shelter & Widows Projects** card and detail page banner (`public/images/shelter-widows.webp`) with an authentic, high-resolution royalty-free Unsplash photograph depicting community volunteers offering shelter and compassionate care.

## Execution Steps

1. **Asset Replacement**:
   - Downloaded curated high-resolution free Unsplash photo (`photo-1593113598332-cd288d649433`).
   - Converted asset into WebP format at `public/images/shelter-widows.webp` (191.0 KB).

2. **Verification & Deployment**:
   - Verify build with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of `/en/support-mission` and `/en/support-mission/shelter-widows`.
   - Commit and push to `origin/main`.
