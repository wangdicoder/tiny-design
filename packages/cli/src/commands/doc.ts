import chalk from 'chalk';
import type { ComponentDataWithDocs } from '@tiny-design/extract';
import type { OutputFormat } from '../utils/format.js';
import { findBestMatch } from '../utils/match.js';

export function docCommand(
  name: string,
  components: ComponentDataWithDocs[],
  options: { format: OutputFormat; lang?: string },
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
  const doc = options.lang === 'zh' ? component.doc.zh : component.doc.en;

  if (options.format === 'json') {
    console.log(
      JSON.stringify(
        {
          name: component.name,
          lang: options.lang || 'en',
          content: doc,
        },
        null,
        2,
      ),
    );
    return;
  }

  if (!doc) {
    console.log(
      `  ${chalk.yellow('No documentation found')} for ${component.name} in ${options.lang === 'zh' ? 'Chinese' : 'English'}.`,
    );
    return;
  }

  console.log(doc);
}
