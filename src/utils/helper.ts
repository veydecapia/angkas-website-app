import fs from 'fs';
import path, { resolve } from 'path';
import { join } from 'path';
import { existsSync } from 'fs';
import { Page } from '@playwright/test';

interface MenuItemsData {
  menuItems: string[];
}

/**
 * Reads a JSON file and parses its content.
 * @param {string} filePath - The relative path to the JSON file.
 * @returns {MenuItemsData} - The parsed data from the JSON file.
 */
export function readJsonFile(filePath: string): MenuItemsData {
  const absolutePath = path.resolve(__dirname, filePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(data) as MenuItemsData;
}

/**
 * Check if the baseline screenshot exists and take a screenshot if it doesn't.
 * @param {Page} page - The Playwright page object.
 * @param {string} baselineScreenshotPath - The relative path to the baseline screenshot.
 */
export async function ensureBaselineScreenshot(
  page: Page,
  baselineScreenshotPath: string
): Promise<void> {
  const rootDir = resolve(__dirname, '../tests/baseline_screenshots');
  const fullPath = join(rootDir, baselineScreenshotPath);

  console.log(`Checking if baseline screenshot exists at ${fullPath}...`);
  if (!existsSync(fullPath)) {
    console.log(
      'Baseline screenshot does not exist. Taking a new screenshot...'
    );
    // Take a new screenshot and save it as the baseline
    await page.screenshot({
      path: fullPath,
      fullPage: true, // Capture the entire page
      animations: 'disabled', // Disable animations for consistency
      caret: 'hide', // Hide the text caret in the screenshot
      scale: 'device', // Scale the screenshot to the device size
    });
    console.log(`Baseline screenshot created at ${fullPath}`);
  } else {
    console.log('Baseline screenshot already exists.');
  }
}
