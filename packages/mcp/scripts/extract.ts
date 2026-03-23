import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractComponents } from './extract-components';
import { extractTokens } from './extract-tokens';
import { extractIcons } from './extract-icons';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../src/data');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeJson(filename: string, data: unknown) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  wrote ${filePath}`);
}

console.log('Extracting Tiny Design data...');
ensureDir(DATA_DIR);

console.log('  extracting components...');
writeJson('components.json', extractComponents());

console.log('  extracting tokens...');
writeJson('tokens.json', extractTokens());

console.log('  extracting icons...');
writeJson('icons.json', extractIcons());

console.log('Done.');
