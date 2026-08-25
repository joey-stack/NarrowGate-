# Implementation Prompt: HeroSection Typography, Color & Slider Update

## Objective
Update the `HeroSection` typography and colors:
1. Increase desktop `H1` headline font size (`lg:text-6xl`), while keeping mobile font size (`text-3xl sm:text-4xl`).
2. Change the second line of the `H1` headline from yellow (`#EAB308`) to pure white (`text-white`).
3. Increase the tagline subtext font size under the headline (`text-sm sm:text-base lg:text-lg`).
4. Update the slider indicator dots / navigator active state from yellow to pure white (`bg-white`).
5. Update the days of fellowship schedule bar text from yellow to pure white (`text-white`).

## Execution Steps

1. **Hero Section Component (`app/components/HeroSection.tsx`)**:
   - Expand central content container `max-w-xl` to `max-w-3xl` to fit larger desktop typography.
   - Update `H1` headline classes to `font-heading font-extrabold text-3xl sm:text-4xl lg:text-6xl tracking-tight leading-tight uppercase mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center`.
   - Change `titleLine2` span class from `text-[#EAB308]` to `text-white`.
   - Update subtitle tagline `p` element classes to `text-sm sm:text-base lg:text-lg text-white/95 font-body font-normal leading-relaxed mb-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xl text-center mx-auto`.
   - Update active slide indicator dot class from `bg-[#EAB308]` to `bg-white`.
   - Update schedule bar text spans from `text-[#EAB308]` to `text-white font-heading font-bold text-xs sm:text-sm drop-shadow-sm`.

2. **Verification & Testing**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of the Home page to visually inspect the updated Hero typography, white text, and white slider dots.
   - Commit and push to `origin/main`.
