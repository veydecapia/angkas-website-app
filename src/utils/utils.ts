import fs from 'fs';
import path from 'path';

interface MenuItemsData {
  menuItems: string[];
}

export function readJsonFile(filePath: string): MenuItemsData {
  const absolutePath = path.resolve(__dirname, filePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(data) as MenuItemsData;
}
