# Implementation Prompt: Logo Replacement

## Objective
Replace the current site logo in Header and Footer with the official high-resolution white transparent logo provided by the user ("THE NARROW GATE FOURSQUARE CHURCH ITALY").

## Assets to Update
- Source: `media__1786133629901.png`
- Targets:
  - `public/logo_white.png`
  - `public/logo.png`

## Execution Steps
1. Crop bounding box of transparent PNG for optimal alignment and whitespace handling.
2. Save to `public/logo_white.png` and `public/logo.png`.
3. Update `Header.tsx` and `Footer.tsx` image paths with cache buster query `?v=4`.
4. Run `npm run build` to verify.
5. Commit and deploy to Vercel production.
