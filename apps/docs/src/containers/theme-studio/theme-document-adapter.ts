import type { ThemeDocument } from '@tiny-design/react';
import { toRgba, tintColor, softenSurface } from './color-utils';
import { getPresetById, getPresetDraft } from './runtime-presets';
import type {
  ThemeCodeView,
  ThemeEditorDraft,
  ThemeEditorSection,
  ThemeMode,
  ThemePreviewTemplate,
  ThemeStudioCodeViewOption,
  ThemeStudioSectionLabels,
  ThemeStudioTemplateOption,
} from './types';

export function inferPresetIdFromThemeDocument(theme: ThemeDocument): string {
  const metaId = theme.meta?.id;
  if (typeof metaId === 'string' && metaId.startsWith('theme-editor-')) {
    return metaId.slice('theme-editor-'.length);
  }

  return 'default';
}

export function buildThemeDocumentFromDraft(draft: ThemeEditorDraft): ThemeDocument {
  const { fields } = draft;
  const primaryHover = tintColor(fields.primary, draft.mode === 'dark' ? 0.12 : 0.08);
  const primaryActive = tintColor(fields.primary, draft.mode === 'dark' ? 0.2 : 0.16);
  const primarySurface = toRgba(fields.primary, draft.mode === 'dark' ? 0.16 : 0.08);
  const primarySurfaceActive = toRgba(fields.primary, draft.mode === 'dark' ? 0.28 : 0.18);
  const defaultHover = softenSurface(fields.muted, draft.mode, draft.mode === 'dark' ? 0.1 : 0.06);
  const defaultActive = softenSurface(fields.muted, draft.mode, draft.mode === 'dark' ? 0.18 : 0.12);
  const defaultBorderHover = softenSurface(fields.border, draft.mode, draft.mode === 'dark' ? 0.16 : 0.12);
  const defaultBorderActive = softenSurface(fields.border, draft.mode, draft.mode === 'dark' ? 0.24 : 0.18);
  const infoHover = tintColor(fields.info, draft.mode === 'dark' ? 0.12 : 0.08);
  const infoActive = tintColor(fields.info, draft.mode === 'dark' ? 0.2 : 0.16);
  const successHover = tintColor(fields.success, draft.mode === 'dark' ? 0.12 : 0.08);
  const successActive = tintColor(fields.success, draft.mode === 'dark' ? 0.2 : 0.16);
  const warningHover = tintColor(fields.warning, draft.mode === 'dark' ? 0.12 : 0.08);
  const warningActive = tintColor(fields.warning, draft.mode === 'dark' ? 0.2 : 0.16);
  const dangerHover = tintColor(fields.danger, draft.mode === 'dark' ? 0.12 : 0.08);
  const dangerActive = tintColor(fields.danger, draft.mode === 'dark' ? 0.2 : 0.16);

  return {
    meta: {
      id: `theme-editor-${draft.presetId}`,
      name: draft.meta.name,
      author: draft.meta.author,
      schemaVersion: 1,
    },
    mode: draft.mode,
    extends: draft.mode === 'dark' ? 'tiny-dark' : 'tiny-light',
    tokens: {
      semantic: {
        'color-primary': fields.primary,
        'color-primary-hover': primaryHover,
        'color-primary-active': primaryActive,
        'color-primary-bg': primarySurface,
        'color-primary-bg-hover': primarySurfaceActive,
        'color-primary-border': fields.primary,
        'color-primary-text-hover': fields.primary,
        'color-success': fields.success,
        'color-success-hover': successHover,
        'color-success-active': successActive,
        'color-success-bg': toRgba(fields.success, draft.mode === 'dark' ? 0.18 : 0.12),
        'color-success-border': toRgba(fields.success, draft.mode === 'dark' ? 0.4 : 0.24),
        'color-info': fields.info,
        'color-info-hover': infoHover,
        'color-info-active': infoActive,
        'color-info-bg': toRgba(fields.info, draft.mode === 'dark' ? 0.18 : 0.12),
        'color-info-border': toRgba(fields.info, draft.mode === 'dark' ? 0.4 : 0.24),
        'color-warning': fields.warning,
        'color-warning-hover': warningHover,
        'color-warning-active': warningActive,
        'color-warning-bg': toRgba(fields.warning, draft.mode === 'dark' ? 0.18 : 0.12),
        'color-warning-border': toRgba(fields.warning, draft.mode === 'dark' ? 0.4 : 0.24),
        'color-danger-bg': toRgba(fields.danger, draft.mode === 'dark' ? 0.18 : 0.12),
        'color-danger-border': toRgba(fields.danger, draft.mode === 'dark' ? 0.4 : 0.24),
        'color-bg': fields.base,
        'color-bg-container': fields.card,
        'color-bg-elevated': fields.popover,
        'color-bg-layout': fields.base,
        'color-bg-spotlight': fields.muted,
        'color-fill': fields.muted,
        'color-fill-secondary': fields.accent,
        'color-fill-tertiary': fields.border,
        'color-bg-disabled': fields.muted,
        'color-text': fields.baseForeground,
        'color-text-heading': fields.cardForeground,
        'color-text-secondary': toRgba(fields.baseForeground, draft.mode === 'dark' ? 0.72 : 0.68),
        'color-text-tertiary': toRgba(fields.baseForeground, draft.mode === 'dark' ? 0.5 : 0.46),
        'color-text-quaternary': toRgba(fields.baseForeground, draft.mode === 'dark' ? 0.36 : 0.32),
        'color-border': fields.border,
        'color-border-secondary': fields.border,
        'color-border-light': fields.border,
        'color-border-btn-default': fields.border,
        'color-danger': fields.danger,
        'color-danger-hover': dangerHover,
        'color-danger-active': dangerActive,
        'chart-1': fields.chart1,
        'chart-2': fields.chart2,
        'chart-3': fields.chart3,
        'chart-4': fields.chart4,
        'chart-5': fields.chart5,
        'font-family': fields.fontSans,
        'font-family-monospace': fields.fontMono,
        'font-size-base': fields.fontSizeBase,
        'line-height-base': fields.lineHeightBase,
        'h1-font-size': fields.h1Size,
        'h2-font-size': fields.h2Size,
        'letter-spacing': fields.letterSpacing,
        'border-radius': fields.radius,
        'shadow-card': fields.shadowCard,
        'shadow-focus': fields.shadowFocus,
        'editor-primary-foreground': fields.primaryForeground,
        'editor-secondary': fields.secondary,
        'editor-secondary-foreground': fields.secondaryForeground,
        'editor-accent': fields.accent,
        'editor-accent-foreground': fields.accentForeground,
        'editor-success': fields.success,
        'editor-success-foreground': fields.successForeground,
        'editor-info': fields.info,
        'editor-info-foreground': fields.infoForeground,
        'editor-warning': fields.warning,
        'editor-warning-foreground': fields.warningForeground,
        'editor-danger': fields.danger,
        'editor-danger-foreground': fields.dangerForeground,
        'editor-base': fields.base,
        'editor-base-foreground': fields.baseForeground,
        'editor-card': fields.card,
        'editor-card-foreground': fields.cardForeground,
        'editor-popover': fields.popover,
        'editor-popover-foreground': fields.popoverForeground,
        'editor-muted': fields.muted,
        'editor-muted-foreground': fields.mutedForeground,
        'editor-border': fields.border,
        'editor-input': fields.input,
        'editor-ring': fields.ring,
        'editor-sidebar': fields.sidebar,
        'editor-sidebar-foreground': fields.sidebarForeground,
        'editor-sidebar-primary': fields.sidebarPrimary,
        'editor-sidebar-primary-foreground': fields.sidebarPrimaryForeground,
        'editor-sidebar-accent': fields.sidebarAccent,
        'editor-sidebar-accent-foreground': fields.sidebarAccentForeground,
        'editor-sidebar-border': fields.sidebarBorder,
        'editor-sidebar-ring': fields.sidebarRing,
      },
      components: {
        'button.bg.primary': fields.primary,
        'button.bg.primary-hover': primaryHover,
        'button.bg.primary-active': primaryActive,
        'button.text.primary': fields.primaryForeground,
        'button.bg.default': fields.muted,
        'button.bg.default-hover': defaultHover,
        'button.bg.default-active': defaultActive,
        'button.border.default': fields.border,
        'button.border.default-hover': defaultBorderHover,
        'button.border.default-active': defaultBorderActive,
        'button.text.default': fields.baseForeground,
        'button.text.default-hover': fields.baseForeground,
        'button.text.default-active': fields.baseForeground,
        'button.radius': fields.buttonRadius,
        'button.padding-inline-md': fields.buttonPaddingX,
        'card.bg': fields.card,
        'card.bg.filled': fields.secondary,
        'card.border': fields.border,
        'card.radius': fields.cardRadius,
        'card.shadow': fields.shadowCard,
        'card.shadow.hover': fields.shadowCard,
        'card.header-color': fields.cardForeground,
        'card.body-padding': fields.cardPadding,
        'card.header-padding': fields.cardPadding,
        'input.bg': fields.base,
        'input.color': fields.baseForeground,
        'input.border': fields.input,
        'input.border.hover': fields.ring,
        'input.border.focus': fields.ring,
        'input.shadow.focus': fields.shadowFocus,
        'input.radius': fields.inputRadius,
        'input.height.md': fields.inputHeight,
        'select.bg': fields.base,
        'select.color': fields.baseForeground,
        'select.border': fields.input,
        'select.border.hover': fields.ring,
        'select.border.focus': fields.ring,
        'select.shadow.focus': fields.shadowFocus,
        'select.radius': fields.inputRadius,
        'select.height.md': fields.inputHeight,
        'select.dropdown-bg': fields.popover,
        'select.option.active-bg': fields.muted,
        'select.option.selected-bg': fields.accent,
        'picker.input-bg': fields.base,
        'picker.input-border': fields.input,
        'picker.input-border-hover': fields.ring,
        'picker.input-border-focus': fields.ring,
        'picker.input-shadow-focus': fields.shadowFocus,
        'picker.input-color': fields.baseForeground,
        'picker.input-color-placeholder': fields.mutedForeground,
        'picker.input-color-muted': fields.mutedForeground,
        'picker.input-radius': fields.inputRadius,
        'picker.dropdown-bg': fields.popover,
        'picker.dropdown-radius': fields.cardRadius,
        'picker.header-border': fields.border,
        'picker.header-button-color': fields.mutedForeground,
        'picker.header-button-color-hover': fields.primary,
        'picker.today-color': fields.primary,
        'picker.today-color-hover': fields.primary,
        'picker.cell-hover-bg': fields.muted,
        'picker.cell-selected-bg': fields.primary,
        'picker.cell-selected-color': fields.primaryForeground,
        'picker.cell-selected-hover-bg': fields.primary,
        'picker.cell-today-border': fields.primary,
        'picker.cell-radius': fields.inputRadius,
        'picker.range-bg': fields.accent,
        'picker.time-column-border': fields.border,
        'picker.time-cell-bg-selected': fields.primary,
        'picker.time-cell-bg-selected-hover': fields.primary,
        'picker.ok-button-bg': fields.primary,
        'picker.ok-button-bg-hover': fields.primary,
        'picker.ok-button-color': fields.primaryForeground,
        'picker.ok-button-radius': fields.buttonRadius,
        'calendar.bg': fields.card,
        'calendar.border': fields.border,
        'calendar.radius': fields.cardRadius,
        'calendar.hover': fields.muted,
        'calendar.nav-button-color': fields.mutedForeground,
        'calendar.nav-button-color-hover': fields.primary,
        'calendar.title-color': fields.cardForeground,
        'calendar.title-color-hover': fields.primary,
        'calendar.cell-header-color': fields.mutedForeground,
        'calendar.week-number-color': fields.mutedForeground,
        'calendar.cell-color': fields.cardForeground,
        'calendar.cell-color-muted': fields.mutedForeground,
        'calendar.cell-disabled-bg': fields.muted,
        'calendar.cell-today-border': fields.primary,
        'calendar.cell-selected-bg': fields.primary,
        'calendar.cell-selected-color': fields.primaryForeground,
        'calendar.range-bg': fields.accent,
        'calendar.cell-focus-outline': fields.shadowFocus,
        'calendar.cell-dot-color': fields.primary,
        'calendar.panel-cell-radius': fields.inputRadius,
        'calendar.panel-cell-color-selected': fields.primaryForeground,
        'calendar.panel-cell-bg-selected': fields.primary,
        'calendar.today-link-color': fields.primary,
        'checkbox.bg': fields.base,
        'checkbox.border': fields.input,
        'checkbox.border.hover': fields.ring,
        'checkbox.bg.checked': fields.primary,
        'checkbox.border.checked': fields.primary,
        'checkbox.indicator-color': fields.primaryForeground,
        'radio.bg': fields.base,
        'radio.border': fields.input,
        'radio.border.checked': fields.primary,
        'radio.dot-bg': fields.primary,
        'switch.bg': fields.mutedForeground,
        'switch.bg.checked': fields.primary,
        'switch.thumb-border': fields.mutedForeground,
        'switch.thumb-border.checked': fields.primary,
        'segmented.bg': fields.muted,
        'segmented.active-bg': fields.card,
        'segmented.radius': fields.inputRadius,
        'tag.bg': fields.secondary,
        'tag.color': fields.secondaryForeground,
        'tag.border': fields.border,
        'tag.link-color': fields.mutedForeground,
        'tag.checkable-bg': fields.card,
        'tag.checkable-color': fields.primary,
        'tag.checkable-border': fields.border,
        'tag.checkable-bg.checked': fields.primary,
        'tag.checkable-color.checked': fields.primaryForeground,
        'tag.checkable-border.checked': fields.primary,
        'progress.stroke-color.primary': fields.primary,
        'progress.stroke-color.success': fields.success,
        'progress.stroke-color.info': fields.info,
        'progress.stroke-color.warning': fields.warning,
        'progress.stroke-color.danger': fields.danger,
        'progress.text-color': fields.baseForeground,
        'progress.trail-bg': fields.muted,
        'progress.circle-trail': fields.muted,
        'table.color': fields.baseForeground,
        'table.border': fields.border,
        'table.header-bg': fields.secondary,
        'table.row-hover-bg': fields.muted,
        'table.cell-sortable-hover-bg': fields.muted,
        'table.row-selected-bg': toRgba(fields.primary, draft.mode === 'dark' ? 0.22 : 0.08),
        'table.sorter-icon-color': fields.mutedForeground,
        'table.sorter-icon-color.active': fields.primary,
        'table.empty-color': fields.mutedForeground,
        'layout.sidebar-bg': fields.sidebar,
        'layout.sidebar-color': fields.sidebarForeground,
        'layout.sidebar-light-bg': fields.sidebar,
        'layout.sidebar-light-color': fields.sidebarForeground,
      },
    },
  };
}

function readToken(theme: ThemeDocument, semanticKey: string, componentKey?: string): string | undefined {
  const semantic = theme.tokens?.semantic?.[semanticKey];
  if (semantic != null) return String(semantic);

  if (componentKey) {
    const component = theme.tokens?.components?.[componentKey];
    if (component != null) return String(component);
  }

  return undefined;
}

export function buildDraftFromThemeDocument(theme: ThemeDocument): ThemeEditorDraft {
  const presetId = inferPresetIdFromThemeDocument(theme);
  const mode = theme.mode === 'dark' ? 'dark' : 'light';
  const baseDraft = getPresetDraft(presetId, mode);
  const baseFields = { ...baseDraft.fields };

  return {
    ...baseDraft,
    meta: {
      name: theme.meta?.name ?? baseDraft.meta.name,
      author: theme.meta?.author ?? baseDraft.meta.author,
    },
    mode,
    presetId,
    fields: {
      ...baseFields,
      primary: readToken(theme, 'color-primary') ?? baseFields.primary,
      primaryForeground: readToken(theme, 'editor-primary-foreground', 'button.text.primary') ?? baseFields.primaryForeground,
      secondary: readToken(theme, 'editor-secondary') ?? readToken(theme, 'color-fill', 'button.bg.default') ?? baseFields.secondary,
      secondaryForeground: readToken(theme, 'editor-secondary-foreground', 'button.text.default') ?? baseFields.secondaryForeground,
      accent: readToken(theme, 'editor-accent') ?? readToken(theme, 'color-primary-bg') ?? baseFields.accent,
      accentForeground: readToken(theme, 'editor-accent-foreground') ?? baseFields.accentForeground,
      success: readToken(theme, 'editor-success') ?? readToken(theme, 'color-success') ?? baseFields.success,
      successForeground: readToken(theme, 'editor-success-foreground') ?? baseFields.successForeground,
      info: readToken(theme, 'editor-info') ?? readToken(theme, 'color-info') ?? baseFields.info,
      infoForeground: readToken(theme, 'editor-info-foreground') ?? baseFields.infoForeground,
      warning: readToken(theme, 'editor-warning') ?? readToken(theme, 'color-warning') ?? baseFields.warning,
      warningForeground: readToken(theme, 'editor-warning-foreground') ?? baseFields.warningForeground,
      danger: readToken(theme, 'editor-danger') ?? readToken(theme, 'color-danger') ?? baseFields.danger,
      dangerForeground: readToken(theme, 'editor-danger-foreground') ?? baseFields.dangerForeground,
      base: readToken(theme, 'editor-base') ?? readToken(theme, 'color-bg') ?? baseFields.base,
      baseForeground: readToken(theme, 'editor-base-foreground') ?? readToken(theme, 'color-text') ?? baseFields.baseForeground,
      card: readToken(theme, 'editor-card') ?? readToken(theme, 'color-bg-container', 'card.bg') ?? baseFields.card,
      cardForeground: readToken(theme, 'editor-card-foreground', 'card.header-color') ?? baseFields.cardForeground,
      popover: readToken(theme, 'editor-popover') ?? readToken(theme, 'color-bg-elevated') ?? baseFields.popover,
      popoverForeground: readToken(theme, 'editor-popover-foreground') ?? baseFields.popoverForeground,
      muted: readToken(theme, 'editor-muted') ?? readToken(theme, 'color-bg-spotlight') ?? baseFields.muted,
      mutedForeground: readToken(theme, 'editor-muted-foreground') ?? readToken(theme, 'color-text-secondary') ?? baseFields.mutedForeground,
      border: readToken(theme, 'editor-border') ?? readToken(theme, 'color-border') ?? baseFields.border,
      input: readToken(theme, 'editor-input') ?? readToken(theme, 'color-border', 'input.border') ?? baseFields.input,
      ring: readToken(theme, 'editor-ring', 'input.border.focus') ?? baseFields.ring,
      chart1: readToken(theme, 'chart-1') ?? baseFields.chart1,
      chart2: readToken(theme, 'chart-2') ?? baseFields.chart2,
      chart3: readToken(theme, 'chart-3') ?? baseFields.chart3,
      chart4: readToken(theme, 'chart-4') ?? baseFields.chart4,
      chart5: readToken(theme, 'chart-5') ?? baseFields.chart5,
      sidebar: readToken(theme, 'editor-sidebar', 'layout.sidebar-bg') ?? baseFields.sidebar,
      sidebarForeground: readToken(theme, 'editor-sidebar-foreground', 'layout.sidebar-color') ?? baseFields.sidebarForeground,
      sidebarPrimary: readToken(theme, 'editor-sidebar-primary') ?? baseFields.sidebarPrimary,
      sidebarPrimaryForeground: readToken(theme, 'editor-sidebar-primary-foreground') ?? baseFields.sidebarPrimaryForeground,
      sidebarAccent: readToken(theme, 'editor-sidebar-accent') ?? baseFields.sidebarAccent,
      sidebarAccentForeground: readToken(theme, 'editor-sidebar-accent-foreground') ?? baseFields.sidebarAccentForeground,
      sidebarBorder: readToken(theme, 'editor-sidebar-border') ?? baseFields.sidebarBorder,
      sidebarRing: readToken(theme, 'editor-sidebar-ring') ?? baseFields.sidebarRing,
      fontSans: readToken(theme, 'font-family') ?? baseFields.fontSans,
      fontMono: readToken(theme, 'font-family-monospace') ?? baseFields.fontMono,
      fontSizeBase: readToken(theme, 'font-size-base') ?? baseFields.fontSizeBase,
      lineHeightBase: readToken(theme, 'line-height-base') ?? baseFields.lineHeightBase,
      h1Size: readToken(theme, 'h1-font-size') ?? baseFields.h1Size,
      h2Size: readToken(theme, 'h2-font-size') ?? baseFields.h2Size,
      letterSpacing: readToken(theme, 'letter-spacing') ?? baseFields.letterSpacing,
      radius: readToken(theme, 'border-radius') ?? baseFields.radius,
      shadowCard: readToken(theme, 'shadow-card', 'card.shadow') ?? baseFields.shadowCard,
      shadowFocus: readToken(theme, 'shadow-focus', 'input.shadow.focus') ?? toRgba(baseFields.primary, 0.22),
      buttonRadius: readToken(theme, 'border-radius', 'button.radius') ?? baseFields.buttonRadius,
      inputRadius: readToken(theme, 'border-radius', 'input.radius') ?? baseFields.inputRadius,
      cardRadius: readToken(theme, 'border-radius', 'card.radius') ?? baseFields.cardRadius,
      buttonPaddingX: readToken(theme, 'spacing-4', 'button.padding-inline-md') ?? baseFields.buttonPaddingX,
      inputHeight: readToken(theme, 'height-md', 'input.height.md') ?? baseFields.inputHeight,
      cardPadding: readToken(theme, 'spacing-5', 'card.body-padding') ?? baseFields.cardPadding,
    },
  };
}

export function createDefaultDraft(): ThemeEditorDraft {
  return getPresetDraft('default', 'light');
}

export function applyPresetToDraft(
  presetId: string,
  current?: ThemeEditorDraft,
  modeOverride?: ThemeMode,
): ThemeEditorDraft {
  const draft = getPresetDraft(presetId, modeOverride ?? current?.mode ?? 'light');

  if (!current) return draft;

  return {
    ...draft,
    meta: {
      name: current.meta.name || draft.meta.name,
      author: current.meta.author || draft.meta.author,
    },
    mode: draft.mode,
    activeSection: current.activeSection,
    activeTemplate: current.activeTemplate,
    activeCodeView: current.activeCodeView,
  };
}

export const THEME_SECTION_LABELS: ThemeStudioSectionLabels = {
  colors: 'Colors',
  typography: 'Typography',
  other: 'Other',
};

export const TEMPLATE_OPTIONS: ThemeStudioTemplateOption[] = [
  { label: 'Cards', value: 'cards' },
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Mail', value: 'mail' },
  { label: 'Pricing', value: 'pricing' },
];

export const CODE_VIEW_OPTIONS: ThemeStudioCodeViewOption[] = [
  { label: 'Theme JSON', value: 'json' },
  { label: 'CSS Vars', value: 'css' },
  { label: 'Changed Tokens', value: 'tokens' },
];
