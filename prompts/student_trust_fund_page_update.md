# Implementation Prompt: Student Education Trust Fund Page Copy & Layout Update

## Objective
1. Replace all existing text on the Student Education Trust Fund detail page with the official text provided by the church leadership in both English and Italian.
2. Update the main image asset to the official "STUDENT'S TRUST FUND" emblem graphic (`public/images/education-fund.webp`).
3. Remove the statistics bar (tuition/book coverage stats) and key objectives list for the Student Trust Fund page.
4. Set the background across all sections of the Student Trust Fund page to `#f2ebd1` (no white container boxes).

## Detailed Execution Steps

### 1. Localization Key Updates (`messages/en.json` & `messages/it.json`)
Update `ProjectDetails.educationFund` translations:
- **Title**: "Student Education Trust Fund"
- **Subtitle**: "A scholarship initiative by The Narrow Gate Foursquare Church supporting local and missionary student families."
- **Overview Paragraph 1**:
  - *EN*: "This scholarship project is entirely funded by The Narrow Gate Foursquare Church Motta di Livenza (TV), Italy. This vision was born as an incentive package to encourage students and their parents/guardians in the church with a staggering economic footing, especially to our missionary families in the mission field."
  - *IT*: "Questo progetto di borsa di studio è interamente finanziato da The Narrow Gate Foursquare Church Motta di Livenza (TV), Italia. Questa visione è nata come pacchetto di incentivi per incoraggiare gli studenti e i loro genitori/tutori nella chiesa con una situazione economica difficile, in particolare per le nostre famiglie missionarie nel campo di missione."
- **Overview Paragraph 2**:
  - *EN*: "The stipend is monthly issued to our students within Italy and are collated for students outside the Italian shore before the commencement of an academic year i.e. (third week in August)."
  - *IT*: "Il sussidio viene erogato mensilmente ai nostri studenti in Italia e viene raccolto per gli studenti al di fuori dei confini italiani prima dell'inizio dell'anno accademico, ovvero la terza settimana di agosto."

### 2. Page Component Adjustments (`app/[locale]/support-mission/[slug]/page.tsx`)
- Conditionally render page sections for `education-fund`:
  - Hide the impact stats bar for `education-fund`.
  - Hide the key objectives list box for `education-fund`.
  - Change main section background containers on `education-fund` from `bg-white` to `bg-[#f2ebd1]` for full uniform `#f2ebd1` background styling.
- Display the official emblem image `/images/education-fund.webp` with `contain` / `cover` fit in an elegant container.

### 3. Verification & Deployment
- Verify compilation with `cmd.exe /c npm run build`.
- Capture Puppeteer full-page screenshot of `/en/support-mission/education-fund` to visually confirm typography, background, and emblem image.
- Commit and push to `origin/main`.
