# Plan: Change Primary Accent Color to Match Off-White Background (`#f2ebd1`)

## Goal
Update the site's primary accent color token from Crimson Red (`#B91C1C`) to the off-white background shade (`#f2ebd1`). Adjust text contrast on buttons, badges, and gradient elements to ensure crisp readability with dark charcoal (`#121212`) text.

## Proposed Changes

### 1. `app/globals.css`
- Update CSS variable tokens:
  - `--accent`: `#f2ebd1`
  - `--accent-light`: `#f9f5e8`
- Update `.btn-primary`:
  - `background-color`: `var(--accent)` (`#f2ebd1`)
  - `color`: `#121212` (Dark Charcoal text for high contrast)
  - `border`: `1px solid rgba(0, 0, 0, 0.15)`
  - Hover background: `#e4dac2`
- Update `.btn-secondary` hover state:
  - `background-color`: `var(--accent)` (`#f2ebd1`)
  - `color`: `#121212`
- Update `.bg-eyebrow-gradient`:
  - Change gradient to off-white/warm highlight (`linear-gradient(90deg, #f2ebd1 0%, #e4dac2 100%)`) with `#121212` text.
- Update `.btn-gradient-link`:
  - Set text & underline to high contrast dark charcoal (`#121212`) / `#f2ebd1` glow accent.

### 2. Badge & Button Text Contrast Updates across Components
- Audit components using `bg-accent text-white` (e.g. category badges, tags) and update text color to `text-[#121212]` so badges on off-white backgrounds remain crisp and accessible.

## Verification Plan
1. Run `cmd.exe /c npm run build` to verify static compilation.
2. Verify visual contrast across Home, About, Get Involved, Support Mission, Contact, and Praise & Worship pages.
3. Commit and push changes to `origin/main`.
