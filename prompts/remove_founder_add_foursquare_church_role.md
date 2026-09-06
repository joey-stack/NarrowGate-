# Prompt: Remove "Founder" and Update Senior Pastor Role Label

## Goal
Update the role designation for **Rev. Uyi Loveday Evbuomwan** in both English (`messages/en.json`) and Italian (`messages/it.json`) to remove "& Founder" / "e Fondatore" and add "(The Narrow Gate Foursquare Gospel Church)".

## Proposed Changes
1. **`messages/en.json`**:
   - Update `AboutLeadership.l1Role` and `PastorWelcome.pastorRole` to `"Senior Pastor (The Narrow Gate Foursquare Gospel Church)"`.
2. **`messages/it.json`**:
   - Update `AboutLeadership.l1Role` and `PastorWelcome.pastorRole` to `"Pastore Senior (The Narrow Gate Foursquare Gospel Church)"`.

## Verification
- Run static build (`cmd.exe /c npm run build`) to ensure clean compilation.
- Commit and push changes to GitHub `origin/main`.
