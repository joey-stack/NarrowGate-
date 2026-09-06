# Prompt: Update Banco Alimentare Card Description

## Goal
Update the description text for the **Support Banco Alimentare** card on the Support Mission page (`/support-mission`) in both English (`messages/en.json`) and Italian (`messages/it.json`) to specify:
- English: `"Donate towards monthly food packages for low-income families."`
- Italian: `"Dona per i pacchi alimentari mensili per le famiglie a basso reddito."`

## File Changes
1. **`messages/en.json`**:
   - Update `SupportMission.foodBankDesc` from `"Donate towards monthly food packages for struggling families."` to `"Donate towards monthly food packages for low-income families."`.
2. **`messages/it.json`**:
   - Update `SupportMission.foodBankDesc` from `"Dona per i pacchi alimentari mensili per le famiglie in difficoltà."` to `"Dona per i pacchi alimentari mensili per le famiglie a basso reddito."`.

## Verification
- Run static build `cmd.exe /c npm run build` to ensure static page generation passes without errors.
- Commit and push changes to GitHub `origin/main`.
