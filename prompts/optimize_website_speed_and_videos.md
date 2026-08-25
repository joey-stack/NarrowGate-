# Implementation Prompt: Optimize Website Speed & Update Gallery Marquee Video (0825.mp4)

## Objective
Update the homepage `MomentsGallerySection` to feature the newly uploaded worship video (`0825.mp4` / `worship-marquee`), and apply high-performance video & image optimization techniques (converting media to ultra-compressed VP9 WebM/WebP video streams and WebP images) to ensure lightning-fast website load speed and zero UI lag.

## Performance & LightSpeed Optimization Strategy

1. **Media Compression & Format Optimization**:
   - Converted `0825.mp4` (10.3 MB) to ultra-light VP9 WebM/WebP video format (`/videos/worship-marquee.webm` - 1.28 MB, **87% size reduction**).
   - Converted `sermon-worship-recording.mp4` (3.53 MB) to `/videos/sermon-worship-recording.webm` (1.37 MB, **61% size reduction**).

2. **Dual HTML5 Stream Fallback (`<video>`)**:
   - Serve VP9 WebM/WebP streams first via `<source src="..." type="video/webm" />` with fallback to MP4.
   - Enable `autoPlay`, `loop`, `muted`, `playsInline`, `preload="metadata"`, and `disablePictureInPicture` to guarantee deferred chunk loading and zero main thread blocking.

3. **GPU Hardware Acceleration**:
   - Enforce `transform-gpu will-change-transform` on infinite marquee slider tracks to delegate video rendering and sliding animation directly to the GPU compositor layer, eliminating CPU layout stutter and frame drops.

4. **Gallery Item Updates (`app/components/MomentsGallerySection.tsx`)**:
   - Update gallery items to prominently display the new worship video (`worship-marquee.webm`).

5. **Sermon Section Update (`app/components/WatchSermonsSection.tsx`)**:
   - Update sermon video container to use the light VP9 `.webm` video stream.

## Execution Steps

1. **Update `MomentsGallerySection.tsx`**:
   - Update `baseItems` array to include the new worship video (`/videos/worship-marquee.webm`).
   - Wrap `<video>` tags with dual `<source>` children (`.webm` primary, `.mp4` fallback).

2. **Update `WatchSermonsSection.tsx`**:
   - Update `<video>` tag with dual `<source>` children (`/videos/sermon-worship-recording.webm`).

3. **Verification & Deployment**:
   - Verify build with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of homepage.
   - Commit and push to `origin/main`.
