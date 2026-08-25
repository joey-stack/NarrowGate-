import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const outputDir = path.join(__dirname, 'scratch_screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching Puppeteer via Edge browser...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 960 });

  console.log('Navigating to http://localhost:3005/en/support-mission...');
  try {
    await page.goto('http://localhost:3005/en/support-mission', { waitUntil: 'networkidle2', timeout: 30000 });
    const screenshotPath = path.join(outputDir, 'support-mission.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${screenshotPath}`);
  } catch (err) {
    console.error('Error capturing support-mission:', err.message);
  }

  await browser.close();
  console.log('Finished capturing screenshot.');
})();
