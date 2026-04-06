export interface FontDef {
  label: string;
  value: string;
  weights?: number[];
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
  system?: boolean;
}

export const SANS_FONTS: FontDef[] = [
  {
    label: 'System Default',
    value:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    category: 'sans-serif',
    system: true,
  },
  { label: 'Inter', value: '"Inter", sans-serif', weights: [300, 400, 500, 600, 700], category: 'sans-serif' },
  { label: 'Poppins', value: '"Poppins", sans-serif', weights: [300, 400, 500, 600, 700], category: 'sans-serif' },
  { label: 'DM Sans', value: '"DM Sans", sans-serif', weights: [400, 500, 600, 700], category: 'sans-serif' },
  { label: 'Plus Jakarta Sans', value: '"Plus Jakarta Sans", sans-serif', weights: [400, 500, 600, 700], category: 'sans-serif' },
  { label: 'Nunito', value: '"Nunito", sans-serif', weights: [300, 400, 500, 600, 700], category: 'sans-serif' },
  { label: 'Lora', value: '"Lora", serif', weights: [400, 500, 600, 700], category: 'serif' },
  { label: 'Space Grotesk', value: '"Space Grotesk", sans-serif', weights: [300, 400, 500, 600, 700], category: 'display' },
];

export const MONO_FONTS: FontDef[] = [
  {
    label: 'System Default',
    value: '"Lucida Console", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    category: 'monospace',
    system: true,
  },
  { label: 'JetBrains Mono', value: '"JetBrains Mono", monospace', weights: [400, 500, 700], category: 'monospace' },
  { label: 'Fira Code', value: '"Fira Code", monospace', weights: [300, 400, 500, 700], category: 'monospace' },
];

export function loadFontFromValue(fontStack: string): void {
  const primary = extractPrimaryFont(fontStack);
  if (!primary || SYSTEM_GENERICS.has(primary.toLowerCase())) return;

  const href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(primary)}:wght@300;400;500;600;700&display=swap`;
  if (document.querySelector(`link[data-font="${primary}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.setAttribute('data-font', primary);
  document.head.appendChild(link);
}

function extractPrimaryFont(fontStack: string): string | null {
  const match = fontStack.match(/^"([^"]+)"/);
  return match ? match[1] : null;
}

const SYSTEM_GENERICS = new Set([
  'sans-serif',
  'serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'ui-sans-serif',
  'ui-serif',
  'ui-monospace',
  '-apple-system',
  'blinkmacsystemfont',
]);
