# Implementation Prompt: Eyebrow Badges Gradient Background Update

## Objective
Update all section eyebrow badge pills across the website to use the custom red-to-yellow gradient background (`background: linear-gradient(90deg, #E61A1A 0%, #FFD900 100%)`).

## Execution Steps
1. Add the utility class `.bg-eyebrow-gradient` to `app/globals.css`:
   ```css
   .bg-eyebrow-gradient {
     background: linear-gradient(90deg, #E61A1A 0%, #FFD900 100%);
   }
   ```
2. Update all section eyebrow badge elements across components and pages:
   - `app/components/WhoWeAreSection.tsx`
   - `app/components/MinistriesGridSection.tsx`
   - `app/components/WeeklyGatheringsDarkSection.tsx`
   - `app/components/WatchSermonsSection.tsx`
   - `app/components/MomentsGallerySection.tsx`
   - `app/components/PlanVisitCardSection.tsx`
   - `app/components/AboutHeroSection.tsx`
   - `app/components/AboutMissionSection.tsx`
   - `app/components/AboutLeadershipSection.tsx`
   - `app/components/AboutBeliefsDarkSection.tsx`
   - `app/components/SupportMissionFullBleedSection.tsx`
   - `app/[locale]/get-involved/page.tsx`
   - `app/[locale]/praise-worship/page.tsx`
   - `app/[locale]/support-mission/page.tsx`
   - `app/[locale]/contact/page.tsx`
3. Verify compilation with `npm run build`.
4. Commit changes with git message `feat: update eyebrow section badges to red-yellow gradient background`.
