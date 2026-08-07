# Implementation Prompt: All Ministries Photos Update

## Objective
Update all 7 cards in the Ministries section (`MinistriesGridSection.tsx`) to use local, authentic church photographs uploaded by the user.

## Image Mapping
1. **Children's Ministry**: `media__1786134023016.jpg` -> `public/images/ministries/childrens-ministry.jpg`
2. **Youth & Young Adults**: `media__1786134488586.jpg` -> `public/images/ministries/youth-ministry.jpg`
3. **Women's Ministry**: `media__1786134531519.jpg` -> `public/images/ministries/womens-ministry.jpg`
4. **Men's Fellowship**: `media__1786134578461.jpg` -> `public/images/ministries/mens-fellowship.jpg`
5. **Guidance & Counseling**: `media__1786134424494.png` -> `public/images/ministries/guidance-counseling.jpg`
6. **Worship Choir**: `media__1786134620368.jpg` -> `public/images/ministries/worship-choir.jpg`
7. **Community Outreach**: `media__1786134651708.jpg` -> `public/images/ministries/community-outreach.jpg`

## Execution Steps
1. Create `public/images/ministries/` directory.
2. Copy all 7 image assets to destination paths.
3. Update `en.json` and `it.json` with counseling translation keys.
4. Update `MinistriesGridSection.tsx`.
5. Run `npm run build` to verify.
6. Commit and deploy to Vercel production.
