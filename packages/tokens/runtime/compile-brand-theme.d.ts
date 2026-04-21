import type { ThemeDocument, ThemeDocumentMeta } from './resolve-theme';

export type BrandThemeMode = 'light' | 'dark';

export interface BrandSeedFields {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  success: string;
  successForeground: string;
  info: string;
  infoForeground: string;
  warning: string;
  warningForeground: string;
  danger: string;
  dangerForeground: string;
  base: string;
  baseForeground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
  fontSans: string;
  fontMono: string;
  fontSizeBase: string;
  lineHeightBase: string;
  h1Size: string;
  h2Size: string;
  letterSpacing: string;
  radius: string;
  shadowControl: string;
  shadowCard: string;
  shadowFocus: string;
  buttonRadius: string;
  inputRadius: string;
  cardRadius: string;
  fieldPaddingSm: string;
  fieldPaddingMd: string;
  fieldPaddingLg: string;
  buttonPaddingSm: string;
  buttonPaddingMd: string;
  buttonPaddingLg: string;
  fieldHeightSm: string;
  fieldHeightMd: string;
  fieldHeightLg: string;
  buttonHeightSm: string;
  buttonHeightMd: string;
  buttonHeightLg: string;
  cardPadding: string;
}

export interface CompileBrandThemeOptions {
  mode: BrandThemeMode;
  presetId?: string;
  extends?: string;
  meta?: ThemeDocumentMeta;
}

export const DEFAULT_BRAND_SEED_FIELDS: BrandSeedFields;

export function compileBrandTheme(
  fields: Partial<BrandSeedFields>,
  options: CompileBrandThemeOptions
): ThemeDocument;
