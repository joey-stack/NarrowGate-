# Implementation Prompt: Integrate Optimized Autoplay Videos into Homepage Moments Gallery Marquee

## Objective
Add 4 church worship videos (`/videos/worship-video-1.mp4` through `worship-video-4.mp4`) into the homepage `MomentsGallerySection` marquee slider, ensuring seamless autoplay, zero UI lag, and optimal page load speed.

## Performance & Optimization Strategy

1. **Hardware-Accelerated Video Decoding**:
   - Configure HTML5 `<video>` elements with `autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"`, and `disablePictureInPicture`.
   - `muted` and `playsInline` ensure compliant mobile and desktop autoplay without user gesture requirements.
   - `preload="metadata"` defers full video chunk downloads until playback starts, preventing initial page load delays.

2. **GPU Compositing & Smooth Animation**:
   - Apply CSS GPU hardware acceleration (`will-change-transform transform-gpu`) to the marquee slider track (`.animate-marquee`) and item wrappers.
   - Isolate video playback to separate compositor layers, eliminating CPU main thread layout recalculations and animation stutter.

3. **Intersperse Gallery Items**:
   - Combine photos and autoplay video cards in `MomentsGallerySection.tsx`:
     - Item 1: Photo (`youth-ministry.jpg`)
     - Item 2: Video 1 (`/videos/worship-video-1.mp4`)
     - Item 3: Photo (`womens-ministry.jpg`)
     - Item 4: Video 2 (`/videos/worship-video-2.mp4`)
     - Item 5: Photo (`mens-fellowship.jpg`)
     - Item 6: Video 3 (`/videos/worship-video-3.mp4`)
     - Item 7: Photo (`worship-choir.jpg`)
     - Item 8: Video 4 (`/videos/worship-video-4.mp4`)

## Execution Steps

1. **Update `MomentsGallerySection.tsx`**:
   - Update `galleryItems` array with typed `{ type: "image" | "video"; src: string }` objects.
   - Render `<video>` tags for video items with optimized attributes (`autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"`, `pointer-events-none`).
   - Add hardware acceleration classes to prevent UI lag.

2. **Verification & Deployment**:
   - Verify build with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of homepage to confirm video cards rendering in marquee slider.
   - Commit and push to `origin/main`.
