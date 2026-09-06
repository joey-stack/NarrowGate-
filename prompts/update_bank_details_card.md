# Implementation Prompt: Update Bank & Transfer Details Card Information

## Objective
Update the "Financial Integrity & Transparency" / "Bank and Transfer Details" card on the Support and Mission page (`app/[locale]/support-mission/page.tsx`) to display structured Bank Name, Account Number (IBAN), and Email Address fields as requested.

## Proposed Data Structure & Localization

1. **Messages (`messages/en.json` & `messages/it.json`)**:
   - Add translation keys under `SupportMission`:
     - `bankNameLabel`: "Bank Name" / "Nome Banca"
     - `bankNameValue`: "Foursquare Gospel Church"
     - `accountNumberLabel`: "Account Number" / "Numero di Conto (IBAN)"
     - `accountNumberValue`: "IT00X0000000000000000000000"
     - `emailAddressLabel`: "Email Address" / "Indirizzo Email"
     - `emailAddressValue`: "fgcititaly@aol.com"

2. **Component (`app/[locale]/support-mission/page.tsx`)**:
   - Update the card layout to present a clean, high-contrast dark box containing:
     - **Bank Name**: Foursquare Gospel Church
     - **Account Number**: IT00X0000000000000000000000
     - **Email Address**: fgcititaly@aol.com

## Execution Steps

1. **Update Translation Keys**:
   - Edit `messages/en.json` and `messages/it.json`.

2. **Update Component (`app/[locale]/support-mission/page.tsx`)**:
   - Replace paragraph text `{t("bankContact")}` with the structured bank detail rows.

3. **Verification & Deployment**:
   - Verify build with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of `/en/support-mission` to confirm clean card rendering.
   - Commit and push to `origin/main`.
