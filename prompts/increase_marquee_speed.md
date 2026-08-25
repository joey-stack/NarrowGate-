# Implementation Prompt: Increase Gallery Marquee Slider Speed

## Objective
Increase the speed of the gallery marquee slider animation in `app/globals.css` by adjusting the keyframe animation duration.

## Execution Steps

1. **Update `app/globals.css`**:
   - Change `.animate-marquee` animation duration from `150s` to `75s` (cutting duration in half to double the sliding speed) for a faster marquee flow.

2. **Verification & Deployment**:
   - Verify compilation with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of homepage.
   - Commit and push to `origin/main`.
