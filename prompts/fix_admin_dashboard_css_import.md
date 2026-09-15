# Implementation Prompt: Permanent Fix for Admin Dashboard CSS & Global Stylesheet Import

## Problem
In Next.js App Router, `app/admin/layout.tsx` operates as an independent root layout outside the localized `app/[locale]/layout.tsx` container (it renders its own `<html>` and `<body>` tags). When commit `8905298` added the standalone `<html>` and `<body>` tags to `app/admin/layout.tsx`, it omitted `import "../globals.css"` and the Google Fonts configuration. As a result, the admin dashboard (`/admin` and `/admin/login`) rendered completely raw unstyled HTML without any Tailwind CSS or typography rules.

## Permanent Solution
1. **Update `app/admin/layout.tsx`**:
   - Import `../globals.css` directly into `app/admin/layout.tsx` so Tailwind CSS and all design tokens are bundled with the admin root layout.
   - Configure and inject `Poppins` and `Inter` font variables (`--font-poppins` and `--font-inter`) onto the `<html>` and `<body>` tags to ensure consistent typography and prevent layout shifts.
   - Retain `suppressHydrationWarning` and dark theme background colors (`bg-[#0F172A] text-[#F8FAFC] font-sans`).
2. **Verification & Deployment**:
   - Verify that `app/admin/layout.tsx` compiles cleanly.
   - Commit and push the fix to GitHub (`origin/main`) for automatic deployment to Vercel.
