# Implementation Prompt: Community Outreach Projects Detail Pages & Image Updates

## Objective
1. Convert the newly uploaded Education Fund image to WebP format (`public/images/education-fund.webp`) and use all three custom WebP images for the community outreach project cards.
2. Create dedicated detail pages for each of the three Community Outreach Projects under `app/[locale]/support-mission/[slug]/page.tsx`:
   - `education-fund`: Student Education Trust Fund
   - `banco-alimentare`: Banco Alimentare Food Bank
   - `shelter-widows`: Shelter & Widows Projects
3. Add full bilingual localization keys in `messages/en.json` and `messages/it.json` for detailed project overviews, impact metrics, how it works, and giving options.
4. Link project cards on the `Support Mission` page directly to their respective detail pages (`/${locale}/support-mission/${slug}`).

## Detailed Execution Steps

### 1. Image Assets
- `public/images/education-fund.webp`: Custom image of university tutoring session (53.5 KB).
- `public/images/banco-alimentare.webp`: Custom image of European Food Bank donation box (95.8 KB).
- `public/images/shelter-widows.webp`: Custom image of community garden care & embrace (97.5 KB).

### 2. Localization Keys (`messages/en.json` & `messages/it.json`)
Add a new `ProjectDetails` translation namespace containing:
- **`education-fund`**:
  - Title: "Student Education Trust Fund"
  - Subtitle: "Empowering deserving students with full educational funding and academic mentorship in Italy."
  - Overview, key stats (100% tuition coverage, mentorship support, academic success), mission objectives, and giving instructions.
- **`banco-alimentare`**:
  - Title: "Banco Alimentare Food Bank"
  - Subtitle: "Providing essential monthly food packages and nutritional support to families in Motta di Livenza."
  - Overview, key stats (Monthly package distributions, local families reached, community partners), mission objectives, and giving instructions.
- **`shelter-widows`**:
  - Title: "Shelter & Widows Projects"
  - Subtitle: "Extending housing assistance, pastoral care, and fellowship for widows and vulnerable community members."
  - Overview, key stats (Housing assistance, monthly care visits, community warmth), mission objectives, and giving instructions.

### 3. Dynamic Detail Page Component (`app/[locale]/support-mission/[slug]/page.tsx`)
- Implement `generateStaticParams` to statically pre-render all 3 project slugs for English (`en`) and Italian (`it`).
- **Hero Section**: Eyebrow badge, project title, subtitle, back link to Support Mission, and large high-resolution WebP hero image with rounded corners.
- **Impact Metrics Grid**: Highlights key figures and achievements of each initiative.
- **Project Deep-Dive & Mission Section**: Structured two-column layout with detailed descriptions, bullet points of how the program operates, and contact/donation instructions.
- **Ways to Give / Action Card**: Prominent call-to-action box with phone and email contacts for financial transfers or material donations.
- **Other Outreach Initiatives Grid**: Navigation cards linking to the other two projects.
- **Footer CTA**: Standard `PlanVisitCardSection` and `Footer`.

### 4. Support Mission Main Page Update (`app/[locale]/support-mission/page.tsx`)
- Update `projects` array to use local WebP images:
  - `educationFund`: `/images/education-fund.webp` (slug: `education-fund`)
  - `foodBank`: `/images/banco-alimentare.webp` (slug: `banco-alimentare`)
  - `shelter`: `/images/shelter-widows.webp` (slug: `shelter-widows`)
- Update card action links to navigate to `/${locale}/support-mission/${slug}`.

### 5. Verification & Deployment
- Verify Next.js build compilation (`npm run build`).
- Capture Puppeteer full-page screenshots of all 3 detail pages (`/en/support-mission/education-fund`, `/en/support-mission/banco-alimentare`, `/en/support-mission/shelter-widows`).
- Commit and push changes to GitHub (`origin/main`).
