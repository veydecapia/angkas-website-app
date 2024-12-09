import fs from 'fs';
import path from 'path';

export function readJsonFile(filePath: string): any {
  const absolutePath = path.resolve(__dirname, filePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(data);
}
