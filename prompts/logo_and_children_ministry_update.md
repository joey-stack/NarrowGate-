# Implementation Prompt: Logo & Children's Ministry Photo Updates

## Objective
1. Replace the website logo in Header and Footer with the official high-resolution white transparent logo provided by the user (`media__1786133629901.png`).
2. Update the Children's Ministry card in `MinistriesGridSection.tsx` with the authentic photo of children writing/drawing on the carpet (`media__1786134023016.jpg`).

## Assets to Update
- Logo Source: `media__1786133629901.png` -> `public/logo_white.png` & `public/logo.png`
- Children's Ministry Source: `media__1786134023016.jpg` -> `public/images/ministries/childrens-ministry.jpg`

## Execution Steps
1. Copy logo and Children's Ministry assets to destination paths.
2. Update `Header.tsx`, `Footer.tsx`, and `MinistriesGridSection.tsx`.
3. Run `npm run build` to verify.
4. Commit and deploy to Vercel production.
