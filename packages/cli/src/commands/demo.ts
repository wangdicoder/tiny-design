import chalk from 'chalk';
import type { ComponentDataWithDocs } from '@tiny-design/extract';
import type { OutputFormat } from '../utils/format.js';
import { findBestMatch } from '../utils/match.js';

export function demoCommand(
  name: string,
  demoName: string | undefined,
  components: ComponentDataWithDocs[],
  options: { format: OutputFormat },
) {
  const names = components.map((c) => c.name);
  const result = findBestMatch(name, names);

  if (!result.match) {
    console.error(`Component "${name}" not found.`);
    if (result.suggestion) {
      console.error(`Did you mean "${result.suggestion}"?`);
    }
    process.exit(1);
  }

  const component = components.find((c) => c.name === result.match)!;

  if (component.demos.length === 0) {
    console.error(`No demos found for ${component.name}.`);
    process.exit(1);
  }

  // If no demo name specified, list available demos
  if (!demoName) {
    if (options.format === 'json') {
      console.log(
        JSON.stringify(
          component.demos.map((d) => d.name),
          null,
          2,
        ),
      );
      return;
    }
    console.log(`\n  ${chalk.bold.cyan(component.name)} demos:\n`);
    for (const demo of component.demos) {
      console.log(`  ${chalk.dim('•')} ${demo.name}`);
    }
    console.log(`\n  ${chalk.dim(`Run: tiny-design demo ${component.name} <name>`)}\n`);
    return;
  }

  // Find specific demo
  const demoNames = component.demos.map((d) => d.name);
  const demoResult = findBestMatch(demoName, demoNames);

  if (!demoResult.match) {
    console.error(`Demo "${demoName}" not found for ${component.name}.`);
    if (demoResult.suggestion) {
      console.error(`Did you mean "${demoResult.suggestion}"?`);
    }
    console.error(`Available demos: ${demoNames.join(', ')}`);
    process.exit(1);
  }

  const demo = component.demos.find((d) => d.name === demoResult.match)!;

  if (options.format === 'json') {
    console.log(JSON.stringify(demo, null, 2));
    return;
  }

  console.log(`\n  ${chalk.bold.cyan(component.name)} ${chalk.dim('/')} ${demo.name}\n`);
  console.log(demo.code);
}
