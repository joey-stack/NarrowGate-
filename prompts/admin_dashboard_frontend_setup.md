# Plan: Admin Dashboard Front-End Design & Form Submission Integration

## Goal
Design and build a modern, high-end Content Management System (CMS) Admin Dashboard at `/admin` (inspired by WordPress, Wix, and Payload CMS) with authentication gate (`/admin/login`), interactive submission management tables, KPI analytics cards, and direct real-time form submission integration from the website (`Contact Form` and `Plan a Visit` Modal) into Firestore/store.

## Architectural Design

### 1. Data Store & Firebase Skeleton (`lib/firebase.ts` & `lib/form-store.ts`)
- **`lib/firebase.ts`**: Firebase SDK client initialization setup for Firestore.
- **`lib/form-store.ts`**: Unified submission engine supporting Firestore sync with resilient local fallback state. Tracks:
  - `Contact Submissions` (FullName, Email, Phone, Message, Timestamp, Status)
  - `Plan A Visit Submissions` (FullName, Email, Phone, Gathering, Date, GuestsCount, Notes, Timestamp, Status)

### 2. Website Form Submissions Integration
- **`app/[locale]/contact/page.tsx`**: Update contact form submit handler to save entries live to the submission engine with success feedback.
- **`app/components/PlanVisitModal.tsx`**: Update modal submit handler to save visit reservations live to the submission engine.

### 3. Admin Authentication & Protection (`app/admin/login/page.tsx`)
- Isolated layout at `/admin` (excluding main public site header & footer).
- Sleek login interface with email/password authentication (pre-populated with demo admin credentials: `admin@narrowgate.church` / `admin123`).
- Client-side auth session check protecting all `/admin` routes with automatic redirect to login if unauthenticated.

### 4. CMS Admin Dashboard UI (`app/admin/page.tsx`)
- **Header & Sidebar**: Modern collapsible CMS navigation bar with active badges, quick actions, user profile dropdown, and logout.
- **Analytics KPI Widgets**:
  - Total Submissions count & growth trend
  - Pending Follow-up requests
  - Upcoming Visit Reservations count
  - Read vs Unread ratio
- **Submissions Data Table & Filters**:
  - Filter by form category (*All*, *Contact Us*, *Plan a Visit*)
  - Filter by status (*New*, *Reviewed*, *Contacted*, *Archived*)
  - Search by Name, Email, or Message keywords
- **Detailed View & Management Drawer / Modal**:
  - View full submission details line-by-line
  - Change status (*Mark as Reviewed*, *Mark as Contacted*, *Archive*)
  - Quick action buttons (Email applicant, Call phone number)
  - Delete / Purge entry option

## Proposed File Changes

### [NEW] `lib/firebase.ts`
- Firebase client app & Firestore configuration skeleton.

### [NEW] `lib/form-store.ts`
- Reactive submission manager supporting local state & Firestore synchronization.

### [NEW] `app/admin/layout.tsx`
- CMS admin root layout isolating admin pages from public website header/footer.

### [NEW] `app/admin/login/page.tsx`
- Premium login UI with credentials validation and session handling.

### [NEW] `app/admin/page.tsx`
- Modern Admin CMS Dashboard with KPI metrics, interactive data grid, search/filter, and detail drawer.

### [MODIFY] `app/[locale]/contact/page.tsx`
- Connect contact form submission to store submissions live.

### [MODIFY] `app/components/PlanVisitModal.tsx`
- Connect plan-a-visit submission to store submissions live.

## Verification Plan
1. Test `/admin/login` dummy login flow and protected routing redirect.
2. Submit test entries on `http://localhost:3000/en/contact` and via `Plan a Visit` modal.
3. Open `/admin` dashboard and verify submitted data appears in real-time.
4. Test status changes (*New* -> *Reviewed* -> *Archived*), search filters, and detail drawer.
5. Run `cmd.exe /c npm run build` to verify 100% clean production build.
6. Commit & push changes to `origin/main`.
