/**
 * Simple terminal table rendering.
 */

export interface Column {
  header: string;
  key: string;
  width?: number;
}

export function renderTable(columns: Column[], rows: Record<string, string>[]): string {
  // Calculate column widths
  // Collapse multiline values to single line
  const normalized = rows.map((row) => {
    const result: Record<string, string> = {};
    for (const key in row) {
      result[key] = row[key].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    }
    return result;
  });

  const widths = columns.map((col) => {
    const maxContent = Math.max(
      col.header.length,
      ...normalized.map((row) => (row[col.key] || '').length),
    );
    return col.width ? Math.min(col.width, maxContent) : maxContent;
  });

  const separator = widths.map((w) => '-'.repeat(w + 2)).join('+');
  const headerLine = columns
    .map((col, i) => ` ${col.header.padEnd(widths[i])} `)
    .join('|');

  const lines = [headerLine, separator];

  for (const row of normalized) {
    const line = columns
      .map((col, i) => {
        const val = row[col.key] || '';
        const truncated = val.length > widths[i] ? val.slice(0, widths[i] - 1) + '…' : val;
        return ` ${truncated.padEnd(widths[i])} `;
      })
      .join('|');
    lines.push(line);
  }

  return lines.join('\n');
}
