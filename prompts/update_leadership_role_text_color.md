# Prompt: Update Leadership Role Text Color to Section Background Color

## Goal
Update the role text color (`{leader.role}`) on the **Meet Our Leaders** cards (`app/components/AboutLeadershipSection.tsx`) to use the section background color (`#f2ebd1`).

## Proposed Changes
1. **`app/components/AboutLeadershipSection.tsx`**:
   - Change role paragraph class from `text-accent-light text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider` to `text-[#f2ebd1] text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider`.

## Verification
- Run static build (`cmd.exe /c npm run build`) to ensure clean compilation.
- Verify role text displays using the warm `#f2ebd1` background color.
