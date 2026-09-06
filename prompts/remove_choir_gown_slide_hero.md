# Implementation Prompt: Remove Choir Gown Image Slide from Hero Section

## Objective
Remove the second image slide (`/images/hero/hero-slide-2.jpg`, featuring people wearing choir / celebration gowns) from the `HeroSection` slider in `app/components/HeroSection.tsx`.

## Execution Steps

1. **Update `app/components/HeroSection.tsx`**:
   - Remove the slide object `{ url: "/images/hero/hero-slide-2.jpg", caption: "Ministry & Leadership Celebration" }` from the `slides` array.
   - Retain the remaining 3 hero slides (`hero-slide-1.jpg`, `hero-slide-3.jpg`, `hero-slide-4.jpg`).

2. **Verification & Deployment**:
   - Verify build with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of homepage to confirm clean slide transitions without the removed image.
   - Commit and push to `origin/main`.
