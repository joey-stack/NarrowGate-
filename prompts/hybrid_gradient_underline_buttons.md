# Implementation Prompt: Hybrid Gradient Underline Buttons

## Objective
Implement the Hybrid Button Design System (Option 2):
1. Retain the solid pill container for the #1 primary conversion action ("PLAN YOUR VISIT" in Header and Hero).
2. Convert all secondary CTAs and section buttons across the site to borderless text links styled with the red-yellow linear gradient text and an animated expanding gradient underline on hover (`.btn-gradient-link`).

## Execution Steps

1. **Add CSS Utility in `app/globals.css`**:
   Create `.btn-gradient-link` utility class:
   ```css
   .btn-gradient-link {
     position: relative;
     display: inline-flex;
     align-items: center;
     gap: 0.5rem;
     font-family: var(--font-heading);
     font-weight: 700;
     font-size: 0.875rem;
     text-transform: uppercase;
     letter-spacing: 0.05em;
     background: linear-gradient(90deg, #E61A1A 0%, #FFD900 100%);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
     padding-bottom: 4px;
     transition: all 0.3s ease;
     cursor: pointer;
   }

   .btn-gradient-link::after {
     content: '';
     position: absolute;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 2px;
     background: linear-gradient(90deg, #E61A1A 0%, #FFD900 100%);
     transform: scaleX(0);
     transform-origin: bottom right;
     transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
   }

   .btn-gradient-link:hover::after {
     transform: scaleX(1);
     transform-origin: bottom left;
   }

   .btn-gradient-link:hover .arrow-icon {
     transform: translateX(4px);
   }
   ```

2. **Update Components**:
   - `app/components/WhoWeAreSection.tsx`: Convert "Our Identity →" CTA to `.btn-gradient-link`.
   - `app/components/MinistriesGridSection.tsx`: Convert "Explore Ministries →" and "Join Ministry →" to `.btn-gradient-link`.
   - `app/components/WeeklyGatheringsDarkSection.tsx`: Convert "Plan a Visit →" and "Join Gathering →" to `.btn-gradient-link`.
   - `app/components/WatchSermonsSection.tsx`: Convert "Watch Messages →" to `.btn-gradient-link`.
   - `app/components/AboutHeroSection.tsx`: Convert "Contact Our Team →" to `.btn-gradient-link`.
   - `app/components/SupportMissionFullBleedSection.tsx`: Convert "Support Mission →" to `.btn-gradient-link`.

3. **Update Page Templates**:
   - `app/[locale]/get-involved/page.tsx`: Convert "Get Involved →", "Join Event →" to `.btn-gradient-link`.
   - `app/[locale]/praise-worship/page.tsx`: Convert "Join Worship Team →", "Audition & Join Team →" to `.btn-gradient-link`.
   - `app/[locale]/support-mission/page.tsx`: Convert "Donate Now →", "Support Project →" to `.btn-gradient-link`.
   - `app/[locale]/contact/page.tsx`: Convert secondary links to `.btn-gradient-link`.

4. **Verification & Testing**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshots to visually inspect the hover animation and rendering.
   - Commit and push to `origin/main`.
