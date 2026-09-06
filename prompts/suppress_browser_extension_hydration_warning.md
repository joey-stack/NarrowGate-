# Implementation Prompt: Suppress Browser Extension Hydration Warnings

## Objective
Address the React hydration warning caused by browser extensions (such as Bitdefender Anti-Tracker injecting `bis_skin_checked="1"` into DOM elements before React hydration) by adding `suppressHydrationWarning` to component wrapper containers and `ScrollReveal` motion components.

## Root Cause Analysis
The console error log explicitly shows:
`- bis_skin_checked="1"`
`It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.`

Bitdefender Anti-Tracker (and similar privacy/translation extensions) injects `bis_skin_checked="1"` into HTML `<div>` nodes during page parse. React's dev overlay flags this attribute mismatch during client hydration.

## Execution Steps

1. **Update `app/components/ScrollReveal.tsx`**:
   - Add `suppressHydrationWarning` to `<motion.div>` in `ScrollReveal`, `ScrollStaggerContainer`, and `ScrollStaggerItem`.

2. **Update `app/[locale]/support-mission/page.tsx`**:
   - Add `suppressHydrationWarning` to top-level section container `<div>` elements.

3. **Verification & Deployment**:
   - Verify build with `cmd.exe /c npm run build`.
   - Commit and push to `origin/main`.
