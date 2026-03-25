import chalk from 'chalk';
import type { ComponentDataWithDocs } from '@tiny-design/extract';
import type { OutputFormat } from '../utils/format.js';
import { findBestMatch } from '../utils/match.js';
import { renderTable } from '../utils/table.js';

export function infoCommand(
  name: string,
  components: ComponentDataWithDocs[],
  options: { format: OutputFormat; lang?: string; detail?: boolean },
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

  if (options.format === 'json') {
    const data = {
      name: component.name,
      category: component.category,
      description: options.lang === 'zh' ? component.descriptionZh : component.description,
      props: component.props,
    };
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  const desc = options.lang === 'zh' ? component.descriptionZh : component.description;

  if (options.format === 'markdown') {
    console.log(`# ${component.name}\n`);
    console.log(`${desc}\n`);
    console.log(`**Category:** ${component.category}\n`);
    console.log('## Props\n');
    console.log('| Property | Type | Required | Default | Description |');
    console.log('|----------|------|----------|---------|-------------|');
    for (const p of component.props) {
      console.log(
        `| ${p.name} | \`${p.type}\` | ${p.required ? 'Yes' : 'No'} | ${p.default || '-'} | ${p.description} |`,
      );
    }
    return;
  }

  // Text format
  console.log();
  console.log(`  ${chalk.bold.cyan(component.name)}  ${chalk.dim(`[${component.category}]`)}`);
  console.log(`  ${desc}`);
  console.log();

  const rows = component.props.map((p) => ({
    name: p.name,
    type: p.type,
    required: p.required ? chalk.yellow('Yes') : 'No',
    default: p.default || '-',
    description: p.description,
  }));

  const columns = [
    { header: 'Property', key: 'name' },
    { header: 'Type', key: 'type', width: 40 },
    { header: 'Required', key: 'required' },
    { header: 'Default', key: 'default' },
    { header: 'Description', key: 'description', width: 50 },
  ];

  console.log(
    renderTable(columns, rows)
      .split('\n')
      .map((l) => `  ${l}`)
      .join('\n'),
  );
  console.log();
}
