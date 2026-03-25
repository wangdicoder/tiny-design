import chalk from 'chalk';
import type { IconData } from '@tiny-design/extract';
import type { OutputFormat } from '../utils/format.js';
import { findBestMatch } from '../utils/match.js';

export function iconCommand(
  search: string | undefined,
  icons: IconData,
  options: { format: OutputFormat; detail?: boolean },
) {
  if (!search) {
    // List all icons
    if (options.format === 'json') {
      console.log(JSON.stringify({ count: icons.icons.length, icons: icons.icons }, null, 2));
      return;
    }

    console.log(`\n  ${chalk.bold.cyan('Icons')} ${chalk.dim(`(${icons.icons.length} total)`)}\n`);

    // Display in columns
    const colWidth = 28;
    const termWidth = process.stdout.columns || 80;
    const cols = Math.max(1, Math.floor(termWidth / colWidth));

    for (let i = 0; i < icons.icons.length; i += cols) {
      const row = icons.icons
        .slice(i, i + cols)
        .map((name) => name.padEnd(colWidth))
        .join('');
      console.log(`  ${row}`);
    }
    console.log();
    return;
  }

  // Search icons
  const term = search.toLowerCase();
  const matches = icons.icons.filter((name) => name.toLowerCase().includes(term));

  if (matches.length === 0) {
    // Try fuzzy match
    const result = findBestMatch(search, icons.icons);
    console.error(`No icons matching "${search}".`);
    if (result.suggestion) {
      console.error(`Did you mean "${result.suggestion}"?`);
    }
    process.exit(1);
  }

  if (options.format === 'json') {
    console.log(
      JSON.stringify(
        {
          query: search,
          count: matches.length,
          icons: matches,
          props: icons.props,
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log(
    `\n  ${chalk.bold.cyan('Icons matching')} "${search}" ${chalk.dim(`(${matches.length} found)`)}\n`,
  );

  for (const name of matches) {
    console.log(`  ${chalk.dim('•')} ${name}`);
  }

  if (options.detail && matches.length > 0) {
    console.log(`\n  ${chalk.dim('Usage:')}`);
    console.log(
      `  ${chalk.dim(`import { ${matches[0]} } from '@tiny-design/icons';`)}`,
    );
    console.log(`  ${chalk.dim(`<${matches[0]} size={24} color="#6e41bf" />`)}`);
  }
  console.log();
}
