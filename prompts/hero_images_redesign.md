# Implementation Prompt: Hero Slider Images Aspect Ratio & Outpainting Redesign

## Task Goal
Transform the 4 user-provided portrait photos into high-resolution 16:9 landscape hero banner images suitable for "The Narrow Gate Foursquare Church" website hero slider section without skewing, stretching, or losing subject content.

---

## 1. Problem Analysis & Understanding
The 4 uploaded images represent real church community moments at The Narrow Gate Foursquare Church in Motta di Livenza:
1. **Prayer Moment**: A man in a blue t-shirt kneeling in deep prayer on a chair.
2. **Graduation / Ministry Celebration**: 4 church members in purple graduation gowns and caps with church branding logos.
3. **Pulpit Preaching**: Reverend Uyi in a grey suit reading at the clear acrylic pulpit, with national flags (UK, Israel, Foursquare 4-Cross Flag, Nigeria, USA) behind him.
4. **Worship Service & Scripture**: Congregation during Sunday service viewing Philippians 3:10 on the sanctuary screen.

Currently, these photos have tall portrait dimensions (e.g., 3:4 / 9:16 aspect ratio). Placing vertical images in a full-width 16:9 widescreen hero section causes either severe cropping (cutting off heads/knees) or distortion if forced into 16:9.

---

## 2. Proposed Technical Approach & Workflow

### Phase A: Aspect Ratio Expansion & Outpainting (using Image Generation / Outpainting AI)
We will expand each of the 4 photo aspect ratios to widescreen 16:9 (1920×1080) landscape while strictly preserving 100% of the original content and subjects in the center/foreground:
* **Image 1 (Kneeling Prayer)**: Keep the man kneeling in prayer on the chair, expanding the warm sanctuary wall background and carpet laterally to fit 16:9 widescreen.
* **Image 2 (Purple Graduation Gowns)**: Keep all 4 people in purple gowns and caps centered and clear, extending the background church pillars and backdrop wide to fit 16:9 widescreen.
* **Image 3 (Reverend Preaching)**: Keep Reverend Uyi in his grey suit, microphone, and pulpit clear, expanding the sanctuary wall, flag banners (UK, Israel, Foursquare, Nigeria, USA), and stage elements seamlessly on the sides.
* **Image 4 (Congregation & Scripture Screen)**: Keep the congregation and Philippians 3:10 screen, outpainting the sanctuary ceiling lights and side walls to fit 16:9 format seamlessly.

### Phase B: Integration in Next.js Codebase
1. Store the optimized images in `public/images/hero/`:
   - `hero-slide-1.jpg` (Kneeling Prayer)
   - `hero-slide-2.jpg` (Purple Gowns Graduation)
   - `hero-slide-3.jpg` (Reverend Preaching at Pulpit)
   - `hero-slide-4.jpg` (Congregation Worship & Scripture)
2. Update `app/components/HeroSection.tsx` slides array with the updated public image paths and accurate captions.
3. Ensure Next.js `<Image />` uses `fill` + `object-cover` with optimal focus positions so images render perfectly across Desktop, Tablet, and Mobile displays without clipping key subjects.

---

## 3. Files to be Modified / Created
- [NEW] `public/images/hero/hero-slide-1.jpg`
- [NEW] `public/images/hero/hero-slide-2.jpg`
- [NEW] `public/images/hero/hero-slide-3.jpg`
- [NEW] `public/images/hero/hero-slide-4.jpg`
- [MODIFY] `app/components/HeroSection.tsx`

---

## 4. Verification Plan
- Build Next.js project with `npm run build`.
- Run local preview with `npm run dev`.
- Verify crossfade slider animation and responsive layout at 1920px (Desktop), 1024px (Tablet), and 375px (Mobile).
