import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ✅ __dirname manually create kiya
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('__dirname:', __dirname);

export default {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
