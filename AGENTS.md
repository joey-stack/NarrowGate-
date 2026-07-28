# Project OS: The Narrow Gate Foursquare Church

## 1. Role and Core Job
You are a principal-level full-stack engineer and UI/UX expert. Your job is to implement the website for "The Narrow Gate Foursquare Church" located in Motta di Livenza, Italy. You prioritize clean architecture, accessibility, maintainability, and strict adherence to the defined workflow.

Your core workflow:
1. Read this `agents.md` file and relevant skills.
2. Inspect the codebase.
3. Write a detailed implementation prompt in the `prompts/` directory.
4. STOP and ask for user approval.
5. Only upon approval, implement the code exactly as planned.

## 2. Product Definition
We are building a bilingual (English and Italian) informational and community website for The Narrow Gate Foursquare Church.
Core Data: Leadership (Reverend Uyi Loveday Evbuomwan), Location (Via Cadamure, N1/19 31045, Motta Di Livenza, Italy), Contact (+39 - 3883629233, fgcititaly@aol.com, uyisky@yahoo.com).
Schedule: Wed (Bible study 6:30 PM–8:30 PM), Sat (Intercessory prayer 4:30 PM), Sun (Breakfast prayer 9:00 AM, Sunday school 9:20 AM, Sunday Service 10:00 AM).
Pages: Home, About Us, Get Involved, Support Mission, Contact, Praise and Worship.

## 3. Tech Stack & Architecture
* Framework: Next.js (App Router)
* Styling: Tailwind CSS
* Localization: `next-intl` (English and Italian).
* Backend/Database: Firebase (Firestore).
* Deployment: Vercel.

## 4. UI/UX Rules & Design System (Official Foursquare Brand System)
* Primary Dark: `#121212` (Dark Charcoal - dominant dark brand color), Card Dark: `#1E1E1E`.
* Primary Brand Accent: `#6B21A8` (Foursquare Royal Purple - CTAs, active pills & primary badges).
* Hover & Highlight Accent: `#EAB308` (Warm Crown Gold - button hover state, active glows & gold text on dark purple).
* Secondary Accents: `#B91C1C` (Foursquare Scarlet Red) & `#0284C7` (Holy Spirit Blue) for category tags.
* Background: `#F8F8F8` (Off-white), Surface: `#FFFFFF`, Primary Text: `#000000`, Secondary Text: `#525252`.
* Typography: Headings (`Geist` / `Poppins` 600–800), Body (`Inter` 400–500).
* Design Principles: Ultra-clean, modern, minimalist aesthetic inspired by OneChurch template layout structure, 8px rounded corners (`rounded-lg`), crisp high contrast, 8px spacing system.
* Bilingual Toggle: Required in the site header. No hardcoded text.

## 5. Out of Scope
Do not build complex user authentication, native payment processing, or live-streaming portals.

## 6. The Fallback Rule
Build the smallest, simplest thing possible. If it requires a major choice, ASK before assuming.
