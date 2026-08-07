# Implementation Prompt: Weekly Gatherings Image Updates

## Objective
Replace Framer placeholder images in `WeeklyGatheringsDarkSection.tsx` with authentic local high-resolution church photographs provided by the user.

## Image Mapping
1. **Wednesday Bible Study** (`t("wednesdayTitle")`):
   - Asset: `/images/gatherings/bible-study.jpg`
   - Source: `media__1786082131238.jpg`
2. **Saturday Intercessory Prayer** (`t("saturdayTitle")`):
   - Asset: `/images/gatherings/intercessory-prayer.jpg`
   - Source: `media__1786082637824.jpg`
3. **Sunday Breakfast Prayer & School** (`t("sundayBreakfastTitle")`):
   - Asset: `/images/gatherings/breakfast-prayer.jpg`
   - Source: `media__1786082726918.jpg`
4. **Sunday Main Worship Service** (`t("sundayServiceTitle")`):
   - Asset: `/images/gatherings/sunday-service.jpg`
   - Source: `media__1786082763207.jpg`

## Execution Steps
1. Create directory `public/images/gatherings/`.
2. Copy all 4 media source files to destination paths.
3. Update `app/components/WeeklyGatheringsDarkSection.tsx`.
4. Validate with `npm run build`.
5. Deploy to Vercel production.
