import chalk from 'chalk';
import type { TokenData } from '@tiny-design/extract';
import type { OutputFormat } from '../utils/format.js';
import { renderTable } from '../utils/table.js';

export function tokenCommand(
  category: string | undefined,
  tokens: TokenData,
  options: { format: OutputFormat; detail?: boolean },
) {
  const categories = Object.keys(tokens);

  // If no category, list categories with counts
  if (!category) {
    if (options.format === 'json') {
      const data = categories.map((cat) => ({
        category: cat,
        count: Object.keys(tokens[cat]).length,
      }));
      console.log(JSON.stringify(data, null, 2));
      return;
    }

    console.log(`\n  ${chalk.bold.cyan('Token Categories')}\n`);
    for (const cat of categories) {
      const count = Object.keys(tokens[cat]).length;
      console.log(`  ${chalk.dim('•')} ${cat} ${chalk.dim(`(${count} tokens)`)}`);
    }
    console.log(`\n  ${chalk.dim('Run: tiny-design token <category>')}\n`);
    return;
  }

  // Find category (case-insensitive)
  const match = categories.find((c) => c.toLowerCase() === category.toLowerCase());
  if (!match) {
    console.error(`Category "${category}" not found. Available: ${categories.join(', ')}`);
    process.exit(1);
  }

  const entries = tokens[match];

  if (options.format === 'json') {
    console.log(JSON.stringify(entries, null, 2));
    return;
  }

  if (options.format === 'markdown') {
    console.log(`## ${match}\n`);
    console.log('| Variable | Value |');
    console.log('|----------|-------|');
    for (const [, entry] of Object.entries(entries)) {
      console.log(`| \`${entry.variable}\` | \`${entry.value}\` |`);
    }
    return;
  }

  console.log(`\n  ${chalk.bold.cyan(match)}\n`);
  const rows = Object.entries(entries).map(([, entry]) => ({
    variable: entry.variable,
    value: entry.value,
  }));
  const columns = [
    { header: 'Variable', key: 'variable', width: 40 },
    { header: 'Value', key: 'value', width: 50 },
  ];
  console.log(
    renderTable(columns, rows)
      .split('\n')
      .map((l) => `  ${l}`)
      .join('\n'),
  );
  console.log();
}
