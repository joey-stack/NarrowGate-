# Plan: Fix Admin Routing & Middleware Exclusion

## Problem
The `next-intl` middleware matcher currently intercepts all routes except `/api`, `/_next`, and `/_vercel`. When a user navigates to `/admin` or `/en/admin`, `next-intl` prepends `/en/admin` or fails to find the static route, resulting in a 404 page & hydration error.

## Solution

### 1. Update `middleware.ts`
- Exclude `admin` paths from `next-intl` localization matcher:
  `matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)']`

### 2. Add Catch-all Redirect for `/[locale]/admin`
- Create `app/[locale]/admin/page.tsx` redirecting to `/admin` so `/en/admin`, `/it/admin`, or direct `/admin` URLs all resolve seamlessly to the Admin Dashboard.

## Verification Plan
1. Run `cmd.exe /c npm run build` to verify clean build.
2. Test navigating to `http://localhost:3000/admin`, `http://localhost:3000/en/admin`, and `http://localhost:3000/admin/login`.
3. Commit and push changes to `origin/main`.
