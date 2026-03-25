/**
 * Output formatting for json/text/markdown modes.
 */

export type OutputFormat = 'json' | 'text' | 'markdown';

export function output(data: unknown, format: OutputFormat): void {
  switch (format) {
    case 'json':
      console.log(JSON.stringify(data, null, 2));
      break;
    case 'text':
    case 'markdown':
      if (typeof data === 'string') {
        console.log(data);
      } else {
        console.log(JSON.stringify(data, null, 2));
      }
      break;
  }
}
