import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { TokenData } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.resolve(__dirname, '../data/tokens.json');

function loadTokens(): TokenData {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

export function getDesignTokens(category?: string): TokenData {
  const tokens = loadTokens();
  if (category) {
    if (!(category in tokens)) return {} as TokenData;
    return { [category]: tokens[category] } as TokenData;
  }
  return tokens;
}
