const FONT_STYLESHEET_ID = 'theme-studio-font-loader';

const GOOGLE_FONT_QUERY_MAP: Record<string, string> = {
  'Instrument Sans': 'Instrument+Sans:wght@400;500;600;700',
  Inter: 'Inter:wght@400;500;600;700',
  Geist: 'Geist:wght@400;500;600;700',
  'DM Sans': 'DM+Sans:wght@400;500;700',
  'Plus Jakarta Sans': 'Plus+Jakarta+Sans:wght@400;500;600;700',
  Outfit: 'Outfit:wght@400;500;600;700',
  Poppins: 'Poppins:wght@400;500;600;700',
  Montserrat: 'Montserrat:wght@400;500;600;700',
  'IBM Plex Sans': 'IBM+Plex+Sans:wght@400;500;600;700',
  Manrope: 'Manrope:wght@400;500;600;700',
  'Open Sans': 'Open+Sans:wght@400;500;600;700',
  Roboto: 'Roboto:wght@400;500;700',
  Quicksand: 'Quicksand:wght@400;500;600;700',
  Antic: 'Antic',
  Oxanium: 'Oxanium:wght@400;500;600;700',
  'Architects Daughter': 'Architects+Daughter',
  'Source Serif 4': 'Source+Serif+4:wght@400;600;700',
  Merriweather: 'Merriweather:wght@400;700',
  'Libre Baskerville': 'Libre+Baskerville:wght@400;700',
  'JetBrains Mono': 'JetBrains+Mono:wght@400;500;700',
  'Geist Mono': 'Geist+Mono:wght@400;500;700',
  'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500;600;700',
  'Fira Code': 'Fira+Code:wght@400;500;600;700',
  'Source Code Pro': 'Source+Code+Pro:wght@400;500;600;700',
};

function extractPrimaryFamily(stack: string): string | null {
  const primary = stack.split(',')[0]?.trim().replace(/^['"]|['"]$/g, '');
  return primary || null;
}

function buildGoogleFontsHref(families: string[]): string | null {
  const queries = families
    .map((family) => GOOGLE_FONT_QUERY_MAP[family])
    .filter(Boolean);

  if (!queries.length) return null;

  return `https://fonts.googleapis.com/css2?family=${queries.join('&family=')}&display=swap`;
}

export function syncThemeStudioFonts(fontStacks: string[]): void {
  if (typeof document === 'undefined') return;

  const families = Array.from(
    new Set(
      fontStacks
        .map(extractPrimaryFamily)
        .filter((family): family is string => Boolean(family)),
    ),
  );

  const href = buildGoogleFontsHref(families);
  const existing = document.getElementById(FONT_STYLESHEET_ID) as HTMLLinkElement | null;

  if (!href) {
    existing?.remove();
    return;
  }

  if (existing) {
    if (existing.href !== href) existing.href = href;
    return;
  }

  const link = document.createElement('link');
  link.id = FONT_STYLESHEET_ID;
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}
