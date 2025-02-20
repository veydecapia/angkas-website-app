import { chromium } from 'playwright';
import dotenv from 'dotenv';

// Determine the environment and set the file path accordingly
const env = process.env.ENV || 'test';

// Load environment variables from .env file
dotenv.config({ path: `./environments/.env.${env}` });

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the login page using the URL from environment variables
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error('BASE_URL is not defined in the environment variables');
  }
  await page.goto(baseUrl); 

  // Perform login actions manually
  console.log('Please log in manually to bypass CAPTCHA');
  await page.waitForTimeout(120000); // Wait for 120 seconds to complete login manually
  const filePath = `authState-${env}.json`;

  // Save authentication state
  await context.storageState({ path: filePath });

  await browser.close();
})();