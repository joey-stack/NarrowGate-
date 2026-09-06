# Plan: Fix Hydration Mismatch Caused by Browser Extensions & Client State

## Root Cause Analysis
The hydration warning trace shows attributes like `- bis_skin_checked="1"`, `- bis_register="..."`, and `- inject_video_svd="true"`. These attributes are injected into the DOM by third-party browser extensions (password managers, video downloaders, etc.) before React finishes client hydration. Additionally, client-side reads from `localStorage` (`localStorage.getItem("narrowgate_admin_authenticated")`) during server render vs client render can cause text node mismatches before mount.

## Solution

### 1. Update `app/admin/layout.tsx`
- Add `suppressHydrationWarning` to `<html lang="en">` and `<body>` tags to ignore DOM attribute modifications injected by browser extensions.

### 2. Update `app/admin/page.tsx` & `app/admin/login/page.tsx`
- Add client mounting state (`isMounted`) so localStorage reads and submission counts are safely evaluated after client mount.
- Add `suppressHydrationWarning` on outer layout containers.

## Verification Plan
1. Run `cmd.exe /c npm run build` to verify clean compilation.
2. Test loading `/admin` and `/admin/login` in the browser with browser extensions enabled.
3. Commit and push changes to `origin/main`.
