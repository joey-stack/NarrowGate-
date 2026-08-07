# Implementation Prompt: Get Involved Page Photos Update

## Objective
Update the cards in the **Ministries & Activities** section of `app/[locale]/get-involved/page.tsx` with authentic local church photographs:
1. **Child Dedication**: `media__1786138984754.jpg` -> `public/images/ministries/child-dedication.jpg`
2. **Families Ministry**: `media__1786139117130.jpg` -> `public/images/ministries/families-ministry.jpg`
3. **Love Feast & Fellowship**: `media__1786139072292.jpg` -> `public/images/ministries/love-feast.jpg`

## Execution Steps
1. Copy image assets to `public/images/ministries/`.
2. Update `app/[locale]/get-involved/page.tsx` image paths.
3. Run `npm run build` to verify.
4. Commit and deploy to Vercel production.
