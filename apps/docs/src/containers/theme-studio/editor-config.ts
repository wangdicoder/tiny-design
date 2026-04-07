import type { FieldKey, ThemeEditorColorGroup } from './types';

export const COLOR_GROUPS: ThemeEditorColorGroup[] = [
  {
    title: 'Primary',
    fields: [
      { key: 'primary', label: 'Background' },
      { key: 'primaryForeground', label: 'Foreground' },
    ],
  },
  {
    title: 'Secondary',
    fields: [
      { key: 'secondary', label: 'Background' },
      { key: 'secondaryForeground', label: 'Foreground' },
    ],
  },
  {
    title: 'Accent',
    fields: [
      { key: 'accent', label: 'Background' },
      { key: 'accentForeground', label: 'Foreground' },
    ],
  },
  {
    title: 'Status',
    fields: [
      { key: 'success', label: 'Success' },
      { key: 'successForeground', label: 'Success FG' },
      { key: 'info', label: 'Info' },
      { key: 'infoForeground', label: 'Info FG' },
      { key: 'warning', label: 'Warning' },
      { key: 'warningForeground', label: 'Warning FG' },
      { key: 'danger', label: 'Danger' },
      { key: 'dangerForeground', label: 'Danger FG' },
    ],
  },
  {
    title: 'Base',
    fields: [
      { key: 'base', label: 'Background' },
      { key: 'baseForeground', label: 'Foreground' },
    ],
  },
  {
    title: 'Card',
    fields: [
      { key: 'card', label: 'Background' },
      { key: 'cardForeground', label: 'Foreground' },
    ],
  },
  {
    title: 'Popover',
    fields: [
      { key: 'popover', label: 'Background' },
      { key: 'popoverForeground', label: 'Foreground' },
    ],
  },
  {
    title: 'Muted',
    fields: [
      { key: 'muted', label: 'Background' },
      { key: 'mutedForeground', label: 'Foreground' },
    ],
  },
  {
    title: 'Border & Input',
    fields: [
      { key: 'border', label: 'Border' },
      { key: 'input', label: 'Input' },
      { key: 'ring', label: 'Ring' },
    ],
  },
  {
    title: 'Chart',
    fields: [
      { key: 'chart1', label: 'Chart 1' },
      { key: 'chart2', label: 'Chart 2' },
      { key: 'chart3', label: 'Chart 3' },
      { key: 'chart4', label: 'Chart 4' },
      { key: 'chart5', label: 'Chart 5' },
    ],
  },
  {
    title: 'Sidebar',
    fields: [
      { key: 'sidebar', label: 'Background' },
      { key: 'sidebarForeground', label: 'Foreground' },
      { key: 'sidebarPrimary', label: 'Primary' },
      { key: 'sidebarPrimaryForeground', label: 'Primary FG' },
      { key: 'sidebarAccent', label: 'Accent' },
      { key: 'sidebarAccentForeground', label: 'Accent FG' },
      { key: 'sidebarBorder', label: 'Border' },
      { key: 'sidebarRing', label: 'Ring' },
    ],
  },
];

export const CORE_COLOR_GROUP_TITLES = new Set([
  'Primary',
  'Secondary',
  'Accent',
  'Status',
  'Base',
  'Muted',
  'Border & Input',
]);

export const FONT_OPTIONS = [
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  '"Instrument Sans", "Inter", system-ui, sans-serif',
  '"Inter", system-ui, sans-serif',
  '"Geist", system-ui, sans-serif',
  '"DM Sans", system-ui, sans-serif',
  '"Plus Jakarta Sans", system-ui, sans-serif',
  '"Outfit", system-ui, sans-serif',
  '"Poppins", system-ui, sans-serif',
  '"Montserrat", system-ui, sans-serif',
  '"IBM Plex Sans", system-ui, sans-serif',
  '"Manrope", system-ui, sans-serif',
  '"Open Sans", "Helvetica Neue", Arial, sans-serif',
  '"Roboto", "Helvetica Neue", Arial, sans-serif',
  '"Quicksand", system-ui, sans-serif',
  '"Antic", system-ui, sans-serif',
  '"Oxanium", system-ui, sans-serif',
  '"Architects Daughter", "Comic Sans MS", cursive, sans-serif',
  '"Source Serif 4", Georgia, serif',
  '"Merriweather", Georgia, serif',
  '"Libre Baskerville", Georgia, serif',
];

export const MONO_OPTIONS = [
  'ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  '"JetBrains Mono", "SFMono-Regular", monospace',
  '"Geist Mono", "SFMono-Regular", monospace',
  '"IBM Plex Mono", "SFMono-Regular", monospace',
  '"Fira Code", "SFMono-Regular", monospace',
  '"Source Code Pro", "SFMono-Regular", monospace',
  '"Courier New", monospace',
];
