# Plan: Fix Admin Layout Root Tags (`<html>` & `<body>`)

## Problem
In Next.js App Router, any standalone top-level route group/folder outside `app/[locale]/layout.tsx` must include `<html>` and `<body>` tags in its root layout. `app/admin/layout.tsx` currently returns a `<div>`, causing Next.js to throw a `Missing <html> and <body> tags in the root layout` runtime error.

## Solution

### Update `app/admin/layout.tsx`
- Wrap the admin container inside `<html lang="en">` and `<body className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans antialiased">`.

## Verification Plan
1. Run `cmd.exe /c npm run build` to verify compilation.
2. Test loading `http://localhost:3000/admin` and `http://localhost:3000/admin/login`.
3. Commit and push changes to `origin/main`.
