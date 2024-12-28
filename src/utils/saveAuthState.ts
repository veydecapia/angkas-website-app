import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto('https://uat.aap.angkas.com/');

  // Perform login actions manually
  console.log('Please log in manually to bypass CAPTCHA');
  await page.waitForTimeout(120000); // Wait for 120 seconds to complete login manually

  // Save authentication state
  await context.storageState({ path: 'authState.json' });

  await browser.close();
})();
