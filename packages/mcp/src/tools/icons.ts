import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { IconData } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.resolve(__dirname, '../data/icons.json');

function loadIcons(): IconData {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

export function listIcons(search?: string): string[] {
  const data = loadIcons();
  if (search) {
    const term = search.toLowerCase();
    return data.icons.filter((name) => name.toLowerCase().includes(term));
  }
  return data.icons;
}

export function getIcon(name: string) {
  const data = loadIcons();
  const icon = data.icons.find(
    (i) => i.toLowerCase() === name.toLowerCase()
  );
  if (!icon) return null;
  return {
    name: icon,
    props: data.props,
    usage: `import { ${icon} } from '@tiny-design/icons';\n\n<${icon} size={24} color="#6e41bf" />`,
  };
}
