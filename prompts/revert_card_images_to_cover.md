# Plan: Revert Card Images to Object-Cover Fill

## Goal
Revert the card image presentation from `object-contain` back to `object-cover` across all card containers (`Get Involved`, `Support Mission`, `Ministries Grid`, `Support Mission Detail Sidebar`), so that card images fully fill/cover their respective container divs without letterboxing background bars.

## Changes Required

### 1. `app/components/MinistriesGridSection.tsx`
- Change `Image` `className` from `object-contain` to `object-cover object-center`.

### 2. `app/[locale]/get-involved/page.tsx`
- Change `Image` `className` from `object-contain` to `object-cover object-center`.

### 3. `app/[locale]/support-mission/page.tsx`
- Change `Image` `className` from `object-contain` to `object-cover object-center`.

### 4. `app/[locale]/support-mission/[slug]/page.tsx`
- Change `Image` `className` from `object-contain` to `object-cover object-center`.

## Verification Plan
1. Run `cmd.exe /c npm run build` to verify clean build without TypeScript or JSX errors.
2. Commit and push changes to `origin/main`.
