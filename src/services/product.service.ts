import fs from 'fs';
import path from 'path';

export const getProducts = () => {
  const filePath = path.join(process.cwd(), `/src/db/db.json`);
  const products = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(products);
};
