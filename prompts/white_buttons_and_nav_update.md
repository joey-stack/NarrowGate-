# Implementation Prompt: White Buttons, Nav Links, & Website Background Update (#f2ebd1)

## Objective
1. Update the website background color to `#f2ebd1` globally across CSS tokens and light sections/components.
2. Update the Hero primary button, Header navigation links, Language switcher active toggle, and all "Plan Your Visit" CTA buttons across the site to use a white background (`bg-white`) with black text (`text-[#121212]`) and interactive hover states (`hover:bg-white/90 hover:scale-105 transition-all`).

## Execution Steps

1. **Global CSS & Background (`app/globals.css`)**:
   - Change `--background: #F8F8F8;` to `--background: #f2ebd1;`.
   - Update light background section/card classes from `#F8F8F8` to `#f2ebd1`.

2. **Header Component (`app/components/Header.tsx`)**:
   - **Active Navigation Link**: Change active tab class to `bg-white text-[#121212] font-bold shadow-sm`.
   - **Language Toggle Active State**: Change active EN/IT button to `bg-white text-[#121212] font-bold shadow-sm`.
   - **Header CTA ("Plan Your Visit")**: Change from `bg-[#B91C1C]` to `bg-white text-[#121212] hover:bg-white/90 hover:scale-105 transition-all shadow-sm`.

3. **Hero Section Component (`app/components/HeroSection.tsx`)**:
   - **Hero Primary Action Button ("Plan Your Visit →")**: Change from `bg-[#B91C1C]` to `bg-white text-[#121212] hover:bg-white/90 hover:scale-105 transition-all shadow-lg`.

4. **Plan Your Visit Card Section (`app/components/PlanVisitCardSection.tsx`)**:
   - **Card Action Button ("Plan Your Visit →")**: Change from `bg-[#B91C1C]` to `bg-white text-[#121212] hover:bg-white/90 hover:scale-105 transition-all shadow-md`.

5. **Components & Page Sections Backgrounds**:
   - Replace remaining light section `#F8F8F8` background classes with `#f2ebd1` in:
     - `app/components/WhoWeAreSection.tsx`
     - `app/components/MinistriesGridSection.tsx`
     - `app/components/MomentsGallerySection.tsx`
     - `app/components/WatchSermonsSection.tsx`
     - `app/components/AboutHeroSection.tsx`
     - `app/components/AboutLeadershipSection.tsx`
     - `app/[locale]/get-involved/page.tsx`
     - `app/[locale]/praise-worship/page.tsx`
     - `app/[locale]/support-mission/page.tsx`
     - `app/[locale]/contact/page.tsx`

6. **Verification & Testing**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshots to visually inspect the `#f2ebd1` background and white buttons.
   - Commit and push to `origin/main`.
