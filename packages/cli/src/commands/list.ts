import chalk from 'chalk';
import type { ComponentDataWithDocs } from '@tiny-design/extract';
import type { OutputFormat } from '../utils/format.js';
import { renderTable } from '../utils/table.js';

export function listCommand(
  components: ComponentDataWithDocs[],
  options: { format: OutputFormat; category?: string; detail?: boolean; lang?: string },
) {
  let filtered = components;
  if (options.category) {
    const cat = options.category.toLowerCase();
    filtered = components.filter((c) => c.category.toLowerCase() === cat);
    if (filtered.length === 0) {
      const categories = [...new Set(components.map((c) => c.category))];
      console.error(
        `Category "${options.category}" not found. Available: ${categories.join(', ')}`,
      );
      process.exit(1);
    }
  }

  if (options.format === 'json') {
    const data = filtered.map(({ name, category, description, descriptionZh }) => ({
      name,
      category,
      description: options.lang === 'zh' ? descriptionZh : description,
    }));
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  // Group by category
  const groups = new Map<string, ComponentDataWithDocs[]>();
  for (const c of filtered) {
    const list = groups.get(c.category) ?? [];
    list.push(c);
    groups.set(c.category, list);
  }

  if (options.format === 'markdown') {
    for (const [category, items] of groups) {
      console.log(`## ${category}\n`);
      console.log('| Component | Description |');
      console.log('|-----------|-------------|');
      for (const c of items) {
        const desc = options.lang === 'zh' ? c.descriptionZh : c.description;
        console.log(`| ${c.name} | ${desc} |`);
      }
      console.log();
    }
    return;
  }

  // Text format
  for (const [category, items] of groups) {
    console.log(chalk.bold.cyan(`\n  ${category}`));
    console.log();
    const rows = items.map((c) => ({
      name: c.name,
      description: options.lang === 'zh' ? c.descriptionZh : c.description,
      ...(options.detail ? { props: String(c.props.length) } : {}),
    }));
    const columns = [
      { header: 'Component', key: 'name' },
      { header: 'Description', key: 'description', width: 60 },
      ...(options.detail ? [{ header: 'Props', key: 'props' }] : []),
    ];
    console.log(
      renderTable(columns, rows)
        .split('\n')
        .map((l) => `  ${l}`)
        .join('\n'),
    );
  }
  console.log(`\n  ${chalk.dim(`${filtered.length} components total`)}\n`);
}
