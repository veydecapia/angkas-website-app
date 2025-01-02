import fs from 'fs';
import path from 'path';

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