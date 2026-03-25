import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';
import type { OutputFormat } from '../utils/format.js';
import { renderTable } from '../utils/table.js';

interface UsageEntry {
  component: string;
  count: number;
  files: string[];
}

function scanDir(dir: string, results: Map<string, string[]>) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath, results);
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      scanFile(fullPath, results);
    }
  }
}

function scanFile(filePath: string, results: Map<string, string[]>) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Match: import { Button, Modal } from '@tiny-design/react';
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]@tiny-design\/react['"]/g;
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(content)) !== null) {
    const names = match[1].split(',').map((n) => n.trim().split(/\s+as\s+/)[0].trim());
    for (const name of names) {
      if (!name) continue;
      const files = results.get(name) ?? [];
      files.push(filePath);
      results.set(name, files);
    }
  }
}

export function usageCommand(dir: string, options: { format: OutputFormat; detail?: boolean }) {
  const targetDir = path.resolve(dir);

  if (!fs.existsSync(targetDir)) {
    console.error(`Directory "${targetDir}" not found.`);
    process.exit(1);
  }

  const results = new Map<string, string[]>();
  scanDir(targetDir, results);

  if (results.size === 0) {
    if (options.format === 'json') {
      console.log(JSON.stringify([], null, 2));
    } else {
      console.log(`\n  ${chalk.yellow('No @tiny-design/react imports found')} in ${targetDir}\n`);
    }
    return;
  }

  const entries: UsageEntry[] = [...results.entries()]
    .map(([component, files]) => ({
      component,
      count: files.length,
      files: [...new Set(files)],
    }))
    .sort((a, b) => b.count - a.count);

  if (options.format === 'json') {
    console.log(JSON.stringify(entries, null, 2));
    return;
  }

  if (options.format === 'markdown') {
    console.log('## @tiny-design/react Usage\n');
    console.log(`Scanned: \`${targetDir}\`\n`);
    console.log('| Component | Imports |');
    console.log('|-----------|---------|');
    for (const e of entries) {
      console.log(`| ${e.component} | ${e.count} |`);
    }
    return;
  }

  // Text format
  console.log(`\n  ${chalk.bold.cyan('@tiny-design/react Usage')}`);
  console.log(`  ${chalk.dim(`Scanned: ${targetDir}`)}\n`);

  const rows = entries.map((e) => ({
    component: e.component,
    imports: String(e.count),
    ...(options.detail ? { files: e.files.join(', ') } : {}),
  }));

  const columns = [
    { header: 'Component', key: 'component' },
    { header: 'Imports', key: 'imports' },
    ...(options.detail ? [{ header: 'Files', key: 'files', width: 60 }] : []),
  ];

  console.log(
    renderTable(columns, rows)
      .split('\n')
      .map((l) => `  ${l}`)
      .join('\n'),
  );
  console.log(`\n  ${chalk.dim(`${entries.length} components, ${entries.reduce((s, e) => s + e.count, 0)} total imports`)}\n`);
}
