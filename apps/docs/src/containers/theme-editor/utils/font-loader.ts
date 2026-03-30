export interface FontDef {
  label: string;
  value: string;
  weights?: number[];
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
  /** True if this is a system font stack (no loading needed) */
  system?: boolean;
}

// ---- Sans-serif fonts ----
export const SANS_FONTS: FontDef[] = [
  {
    label: 'System Default',
    value:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    category: 'sans-serif',
    system: true,
  },
  {
    label: 'Inter',
    value: '"Inter", sans-serif',
    weights: [300, 400, 500, 600, 700],
    category: 'sans-serif',
  },
  {
    label: 'Poppins',
    value: '"Poppins", sans-serif',
    weights: [300, 400, 500, 600, 700],
    category: 'sans-serif',
  },
  {
    label: 'DM Sans',
    value: '"DM Sans", sans-serif',
    weights: [400, 500, 600, 700],
    category: 'sans-serif',
  },
  {
    label: 'Plus Jakarta Sans',
    value: '"Plus Jakarta Sans", sans-serif',
    weights: [400, 500, 600, 700],
    category: 'sans-serif',
  },
  {
    label: 'Nunito',
    value: '"Nunito", sans-serif',
    weights: [300, 400, 500, 600, 700],
    category: 'sans-serif',
  },
  {
    label: 'Lato',
    value: '"Lato", sans-serif',
    weights: [300, 400, 700],
    category: 'sans-serif',
  },
  {
    label: 'Open Sans',
    value: '"Open Sans", sans-serif',
    weights: [300, 400, 500, 600, 700],
    category: 'sans-serif',
  },
  {
    label: 'Roboto',
    value: '"Roboto", sans-serif',
    weights: [300, 400, 500, 700],
    category: 'sans-serif',
  },
  {
    label: 'Montserrat',
    value: '"Montserrat", sans-serif',
    weights: [300, 400, 500, 600, 700],
    category: 'sans-serif',
  },
  {
    label: 'Source Sans 3',
    value: '"Source Sans 3", sans-serif',
    weights: [300, 400, 600, 700],
    category: 'sans-serif',
  },
  {
    label: 'Noto Sans SC',
    value: '"Noto Sans SC", sans-serif',
    weights: [300, 400, 500, 700],
    category: 'sans-serif',
  },
];

// ---- Serif fonts ----
export const SERIF_FONTS: FontDef[] = [
  {
    label: 'Georgia',
    value: 'Georgia, "Times New Roman", serif',
    category: 'serif',
    system: true,
  },
  {
    label: 'Merriweather',
    value: '"Merriweather", serif',
    weights: [300, 400, 700],
    category: 'serif',
  },
  {
    label: 'Lora',
    value: '"Lora", serif',
    weights: [400, 500, 600, 700],
    category: 'serif',
  },
  {
    label: 'Playfair Display',
    value: '"Playfair Display", serif',
    weights: [400, 500, 600, 700],
    category: 'serif',
  },
  {
    label: 'Source Serif 4',
    value: '"Source Serif 4", serif',
    weights: [300, 400, 600, 700],
    category: 'serif',
  },
  {
    label: 'Noto Serif SC',
    value: '"Noto Serif SC", serif',
    weights: [400, 500, 700],
    category: 'serif',
  },
];

// ---- Monospace fonts ----
export const MONO_FONTS: FontDef[] = [
  {
    label: 'System Default',
    value: '"Lucida Console", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    category: 'monospace',
    system: true,
  },
  {
    label: 'JetBrains Mono',
    value: '"JetBrains Mono", monospace',
    weights: [400, 500, 700],
    category: 'monospace',
  },
  {
    label: 'Fira Code',
    value: '"Fira Code", monospace',
    weights: [300, 400, 500, 700],
    category: 'monospace',
  },
  {
    label: 'Source Code Pro',
    value: '"Source Code Pro", monospace',
    weights: [300, 400, 500, 700],
    category: 'monospace',
  },
  {
    label: 'IBM Plex Mono',
    value: '"IBM Plex Mono", monospace',
    weights: [300, 400, 500, 700],
    category: 'monospace',
  },
  {
    label: 'Roboto Mono',
    value: '"Roboto Mono", monospace',
    weights: [300, 400, 500, 700],
    category: 'monospace',
  },
];

// ---- Display / decorative fonts ----
export const DISPLAY_FONTS: FontDef[] = [
  {
    label: 'Space Grotesk',
    value: '"Space Grotesk", sans-serif',
    weights: [300, 400, 500, 600, 700],
    category: 'display',
  },
  {
    label: 'Sora',
    value: '"Sora", sans-serif',
    weights: [300, 400, 500, 600, 700],
    category: 'display',
  },
  {
    label: 'Outfit',
    value: '"Outfit", sans-serif',
    weights: [300, 400, 500, 600, 700],
    category: 'display',
  },
  {
    label: 'Lexend',
    value: '"Lexend", sans-serif',
    weights: [300, 400, 500, 600, 700],
    category: 'display',
  },
];

export const ALL_BODY_FONTS: FontDef[] = [...SANS_FONTS, ...SERIF_FONTS, ...DISPLAY_FONTS];
export const ALL_MONO_FONTS: FontDef[] = MONO_FONTS;

/**
 * Extract the primary font family name from a CSS font stack.
 * e.g. '"Inter", sans-serif' → 'Inter'
 */
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

/** Already-loaded font family names */
const loadedFonts = new Set<string>();

/**
 * Load a Google Font by injecting a <link> element.
 * Only loads each font once per session.
 */
export function loadGoogleFont(fontDef: FontDef): void {
  if (fontDef.system) return;

  const name = extractPrimaryFont(fontDef.value);
  if (!name || loadedFonts.has(name)) return;

  // Skip system/generic fonts
  if (SYSTEM_GENERICS.has(name.toLowerCase())) return;

  loadedFonts.add(name);

  const weights = fontDef.weights ?? [400, 500, 700];
  const family = `${name.replace(/\s+/g, '+')}:wght@${weights.join(';')}`;
  const url = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.dataset.tinyFont = name;
  document.head.appendChild(link);
}

/**
 * Load a font from a CSS font-family value string.
 * Used when restoring from localStorage.
 */
export function loadFontFromValue(fontStack: string): void {
  const allFonts = [...ALL_BODY_FONTS, ...ALL_MONO_FONTS];
  const match = allFonts.find((f) => f.value === fontStack);
  if (match) {
    loadGoogleFont(match);
    return;
  }

  // Fallback: try to extract and load the primary font name
  const name = extractPrimaryFont(fontStack);
  if (name && !SYSTEM_GENERICS.has(name.toLowerCase()) && !loadedFonts.has(name)) {
    loadedFonts.add(name);
    const family = `${name.replace(/\s+/g, '+')}:wght@300;400;500;600;700`;
    const url = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.dataset.tinyFont = name;
    document.head.appendChild(link);
  }
}
