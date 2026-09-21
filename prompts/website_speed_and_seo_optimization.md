# Implementation Prompt: Comprehensive Page Speed & SEO Optimization

## 1. Overview & Objectives
Optimize the website's loading speed, network bandwidth consumption, Core Web Vitals (LCP, FCP, CLS, TTI), and Search Engine Optimization (SEO). Currently, initial page load is bottlenecked by multiple unoptimized background videos downloading simultaneously (over 45MB of video data) and eager client component loading.

## 2. Identified Performance Bottlenecks & Solutions

### A. Video Bandwidth Optimization (Saves ~45MB on initial load)
- **Problem**: `MomentsGallerySection.tsx` mounts 8 `<video>` elements in an infinite marquee loop with `autoPlay preload="metadata"`, and `WatchSermonsSection.tsx` mounts another video. All videos start streaming concurrently when the page opens.
- **Solution**:
  - Set `preload="none"` on all marquee videos so the browser does not buffer them until needed.
  - Implement an `IntersectionObserver` in `MomentsGallerySection.tsx` and `WatchSermonsSection.tsx` so videos only initialize and play when scrolled into the viewport.
  - Show lightweight poster images before entering the viewport.

### B. Dynamic Component Lazy Loading (Code Splitting)
- **Problem**: `app/[locale]/page.tsx` imports all below-the-fold components synchronously into the main bundle.
- **Solution**:
  - Use `next/dynamic` to lazy-load below-the-fold components (`MomentsGallerySection`, `WatchSermonsSection`, `FeaturedEventSection`, `PlanVisitCardSection`, `PlanVisitModal`).
  - Reduces initial JS bundle size and improves Time to Interactive (TTI) and First Contentful Paint (FCP).

### C. Hero & Image Delivery Optimization
- **Problem**: Hero slider preloads multiple images; images should be prioritized correctly for Largest Contentful Paint (LCP).
- **Solution**:
  - In `HeroSection.tsx`, ensure the primary active slide uses `priority` and `fetchPriority="high"`, while inactive slides are loaded lazily.
  - In `next.config.ts`, configure `images.formats: ['image/avif', 'image/webp']`, `optimizePackageImports`, and static caching headers (`Cache-Control: public, max-age=31536000, immutable`).

### D. Advanced SEO & Structured Data (JSON-LD)
- Update `app/sitemap.ts` to include all routes (`/`, `/about`, `/events`, `/get-involved`, `/support-mission`, `/contact`, `/praise-worship`, and community project subpages) with bilingual hreflang alternates.
- Enhance JSON-LD Schema in `app/[locale]/layout.tsx` with geographic coordinates (Motta di Livenza lat/long), sameAs social links, and proper ecclesiastical hierarchy.
- Ensure every subpage exports dedicated OpenGraph and Twitter card metadata.

### E. Performance Analytics & Tooling
- Install `@next/bundle-analyzer` to analyze production bundle sizes.
- Verify production build and measure performance gains.
