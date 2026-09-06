# Plan: Restore Eyebrow Badge & Gradient Link Styling

## Goal
Restore the signature red-gold gradient (`linear-gradient(90deg, #E61A1A 0%, #FFD900 100%)`) for all eyebrow section badges (`.bg-eyebrow-gradient`) and animated gradient link buttons (`.btn-gradient-link`), while keeping solid accent elements updated to off-white (`#f2ebd1`).

## Proposed Changes

### 1. `app/globals.css`
- Restore `.bg-eyebrow-gradient`:
  - `background`: `linear-gradient(90deg, #E61A1A 0%, #FFD900 100%)`
  - `color`: `#ffffff` (White text for high contrast on red-gold gradient)
  - Remove border.
- Restore `.btn-gradient-link`:
  - `background`: `linear-gradient(90deg, #E61A1A 0%, #FFD900 100%)`
  - `-webkit-background-clip`: `text`
  - `-webkit-text-fill-color`: `transparent`
  - `::after` underline gradient: `linear-gradient(90deg, #E61A1A 0%, #FFD900 100%)`
  - `.arrow-icon` text fill color: `#FFD900`

## Verification Plan
1. Run `cmd.exe /c npm run build` to verify clean production compilation.
2. Restart dev server and verify visual appearance.
3. Commit and push changes to `origin/main`.
