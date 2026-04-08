import type { ThemeDocument } from '@tiny-design/react';

export type ThemeEditorSection = 'colors' | 'typography' | 'other';
export type ThemePreviewTemplate = 'cards' | 'dashboard' | 'mail' | 'pricing';
export type ThemeCodeView = 'json' | 'css' | 'tokens';
export type ThemeMode = 'light' | 'dark';

export interface ThemeEditorFields {
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

export interface ThemeEditorDraft {
  meta: {
    name: string;
    author: string;
  };
  mode: ThemeMode;
  presetId: string;
  activeSection: ThemeEditorSection;
  activeTemplate: ThemePreviewTemplate;
  activeCodeView: ThemeCodeView;
  fields: ThemeEditorFields;
}

export interface ThemeEditorPreset {
  id: string;
  name: string;
  description: string;
  swatches: string[];
  drafts: Record<ThemeMode, ThemeEditorDraft>;
}

export type FieldKey = keyof ThemeEditorFields;
export type SliderFieldConfig = {
  min: number;
  max: number;
  step: number;
  unit?: 'px' | 'em' | 'rem';
};

export type ThemeEditorColorGroup = {
  title: string;
  fields: Array<{ key: FieldKey; label: string }>;
};

export type ThemeStudioCodeViewOption = { label: string; value: ThemeCodeView };
export type ThemeStudioTemplateOption = { label: string; value: ThemePreviewTemplate };
export type ThemeStudioSectionLabels = Record<ThemeEditorSection, string>;
export type ThemeStudioThemeDocument = ThemeDocument;
