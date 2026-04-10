import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractComponents, extractTokens, extractIcons } from '@tiny-design/extract';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../src/data');
const REACT_SRC = path.resolve(__dirname, '../../react/src');
const TOKEN_REGISTRY_PATH = path.resolve(__dirname, '../../tokens/dist/registry.json');
const VARIABLES_PATH = path.resolve(__dirname, '../../react/src/style/_variables.scss');
const ICONS_INDEX = path.resolve(__dirname, '../../icons/src/index.ts');

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

console.log('Extracting Tiny Design data for CLI...');
ensureDir(DATA_DIR);

console.log('  extracting components (with docs & defaults)...');
writeJson(
  'components.json',
  extractComponents({ reactSrcPath: REACT_SRC, includeDocs: true, includeDefaults: true }),
);

console.log('  extracting tokens...');
writeJson('tokens.json', extractTokens({ registryPath: TOKEN_REGISTRY_PATH, variablesPath: VARIABLES_PATH }));

console.log('  extracting icons...');
writeJson('icons.json', extractIcons({ iconsIndexPath: ICONS_INDEX }));

console.log('Done.');
