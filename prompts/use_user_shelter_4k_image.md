# Implementation Prompt: Update Shelter & Widows Projects to 4K Upscaled Custom Image

## Objective
Update the image asset for the **Shelter & Widows Projects** card and detail page banner (`public/images/shelter-widows.webp`) using the user's provided "Foursquare Community Shelter" photo, upscaled to 4K high resolution.

## Execution Steps

1. **Asset Upscaling & Conversion**:
   - Upscaled the user's provided photograph ("The Narrow Gate Foursquare Community Shelter - Centro di Accoglienza e Comunità La Speranza") to high-definition 4K resolution.
   - Converted the upscaled asset into WebP format at `public/images/shelter-widows.webp` (208.9 KB).

2. **Verification & Deployment**:
   - Verify build with `cmd.exe /c npm run build`.
   - Capture Puppeteer full-page screenshot of `/en/support-mission` and `/en/support-mission/shelter-widows`.
   - Commit and push to `origin/main`.
