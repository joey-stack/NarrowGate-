# Implementation Prompt: Clean Separation of Weekly Services vs Special Events

## Objective
Establish a clean, crystal-clear conceptual and visual separation between **Regular Weekly Church Services** and **Special Events & Celebrations** across the entire website:

1. **Homepage Services Section (`WeeklyGatheringsDarkSection`)**:
   - Change the badge from *"Events & Services"* to strictly **"Weekly Services"** (Italian: *"Servizi Settimanali"*).
   - Title: **"Weekly Worship & Gatherings"** (Italian: *"Culto Settimanale e Incontri"*).
   - This section is exclusively for the regular weekly schedule: Wednesday Bible Study, Saturday Intercessory Prayer, Sunday Breakfast & Sunday School, and Sunday Main Worship Service.

2. **Homepage Special Event Section (`FeaturedEventSection`)**:
   - Clearly labeled with eyebrow badge: **"Special Event"** / **"Upcoming Special Event"** (Italian: *"Evento Speciale"*).
   - Positioned directly below Weekly Services to create a distinct transition: *"These are our regular weekly services, and this is our upcoming special event."*
   - Features the next major upcoming special event (such as the Church Anniversary, Annual Conventions, or Special Summits) from the admin Firestore database.

3. **Dedicated Special Events Page (`app/[locale]/events/page.tsx` & `EventsClientView.tsx`)**:
   - Completely dedicated to **Special Events & Celebrations** added and managed by the church administration in the Firestore CMS.
   - Cleaned of any mixing with regular weekly recurring services.
   - Hero Badge: **"Special Events"** (Italian: *"Eventi Speciali"*).
   - Hero Title: **"Special Events & Celebrations"** (Italian: *"Eventi Speciali e Celebrazioni"*).
   - Grid Header: **"All Special Events"** (Italian: *"Tutti gli Eventi Speciali"*).
   - Features only special milestone events that the admin creates, updates, and sets flyers for from `/admin`.

4. **Localization Strings**:
   - Update `messages/en.json` and `messages/it.json` to reflect this clean separation without any conflicting terms.
