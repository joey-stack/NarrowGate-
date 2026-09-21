# Implementation Prompt: Update 20th Anniversary Flyer and Program Details

## 1. Overview & Objectives
Update the Church Anniversary celebration program across the website (Homepage Featured Event Section, Special Events page, Admin defaults, and bilingual translation files) using the official anniversary flyer provided by the user.

## 2. Event Information Extracted from the Flyer
- **Milestone**: 20th Anniversary of The Narrow Gate Foursquare Church Italy
- **Theme**: "BACK to BETHEL"
- **Scripture**: Genesis 31:13
- **Dates**: 16th – 18th October, 2026
- **Times**:
  - Friday, Oct 16: 5:00 PM Prompt
  - Saturday, Oct 17: 5:00 PM Prompt
  - Sunday, Oct 18: 10:00 AM Prompt (Worship Service)
- **Venue**: Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy
- **Ministers & Speakers**:
  - Rev. Uyi Loveday E. (Host)
  - Prof. Ken Omeje (UK) (Guest Speaker)
  - Rev. Renato Amato (National Leader, Foursquare Church Italia)
  - Rev. Juliana Emina-Coney (Westminster Foursquare Church California USA)

## 3. Implementation Steps

### A. Asset Update
- Copy the uploaded official flyer (`media_1789991810397.jpg`) to `public/images/events/anniversary-flyer.jpg`.

### B. Event Store Defaults (`lib/events-store.ts`)
- Update `DEFAULT_EVENTS` with:
  - `id`: `"anniversary-2026"`
  - `title`: `"20th Church Anniversary & Thanksgiving Celebration"`
  - `theme`: `"Back to Bethel"`
  - `scripture`: `"Genesis 31:13 — \"I am the God of Bethel, where you anointed the pillar and where you made a vow to Me...\""`
  - `date`: `"2026-10-16"`
  - `time`: `"Fri & Sat: 5:00 PM Prompt | Sun: 10:00 AM Prompt"`
  - `venue`: `"Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy"`
  - `host`: `"Rev. Uyi Loveday E. (Host) with Prof. Ken Omeje (UK), Rev. Renato Amato & Rev. Juliana Emina-Coney"`
  - `overview`: `"Join The Narrow Gate Foursquare Church Italy for our historic 20th Church Anniversary Celebration themed 'Back to Bethel' (Gen. 31:13). An anointed three-day spiritual encounter featuring Host Rev. Uyi Loveday E., Guest Speaker Prof. Ken Omeje (UK), Rev. Renato Amato (National Leader, Foursquare Church Italia), and Rev. Juliana Emina-Coney (Westminster Foursquare Church California USA)."`
  - `schedule`:
    - `Friday, Oct 16 (5:00 PM)`: `"Opening Word Encounter & Praise Revival"`
    - `Saturday, Oct 17 (5:00 PM)`: `"Anointed Worship, Prayer & Apostolic Impartation"`
    - `Sunday, Oct 18 (10:00 AM)`: `"Grand 20th Anniversary Thanksgiving & Worship Service"`
  - `tag`: `"20th Anniversary"`
  - `flyerUrl`: `"/images/events/anniversary-flyer.jpg"`

### C. Translations Update (`messages/en.json` & `messages/it.json`)
- **English (`messages/en.json`)**:
  - Update `FeaturedEvent` (title, theme `"Back to Bethel"`, dates, times, ministers, scripture).
  - Update `Events.anniversary` (full schedule breakdown matching the flyer, host & guest speakers).
- **Italian (`messages/it.json`)**:
  - Update `FeaturedEvent` in Italian ("20° Anniversario della Chiesa e Celebrazione di Ringraziamento", "Ritorno a Bethel", 16–18 Ottobre 2026, ecc.).
  - Update `Events.anniversary` in Italian with faithful theological and grammatical translations.

### D. UI Flyer Aspect Ratio & Layout Optimization
- The flyer image has a landscape ratio (~1024x721, ~4:3) rather than a portrait 3:4 ratio.
- In `app/components/FeaturedEventSection.tsx` and `app/components/EventsClientView.tsx`, update the flyer container aspect ratio (e.g. `aspect-[4/3]` or responsive container with `object-contain`/`object-cover`) so that all text, dates, guest speaker headshots, and church emblems remain crisp and completely visible without being cropped.
- Verify that flyer lightbox preview on the Events page displays the full flyer cleanly.
