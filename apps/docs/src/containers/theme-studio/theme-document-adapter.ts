import type { ThemeDocument } from '@tiny-design/react';
import { validateThemeDocument } from '@tiny-design/tokens/validate-theme';
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

function normalizeImportedThemeDocument(theme: ThemeDocument): ThemeDocument {
  const validation = validateThemeDocument(theme, { strict: true });
  if (!validation.valid) {
    throw new Error(validation.errors.join('\n'));
  }
  return validation.normalizedDocument as ThemeDocument;
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
        'border-radius': fields.radius,
        'shadow-card': fields.shadowCard,
        'shadow-focus': fields.shadowFocus,
        'control.height.sm': fields.fieldHeightSm,
        'control.height.md': fields.fieldHeightMd,
        'control.height.lg': fields.fieldHeightLg,
        'control.padding-inline.sm': fields.fieldPaddingSm,
        'control.padding-inline.md': fields.fieldPaddingMd,
        'control.padding-inline.lg': fields.fieldPaddingLg,
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
        'button.height.sm': fields.buttonHeightSm,
        'button.height.md': fields.buttonHeightMd,
        'button.height.lg': fields.buttonHeightLg,
        'button.padding-inline-sm': fields.buttonPaddingSm,
        'button.padding-inline-md': fields.buttonPaddingMd,
        'button.padding-inline-lg': fields.buttonPaddingLg,
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
        'input.height.sm': fields.fieldHeightSm,
        'input.height.md': fields.fieldHeightMd,
        'input.height.lg': fields.fieldHeightLg,
        'input.padding-inline-sm': fields.fieldPaddingSm,
        'input.padding-inline-md': fields.fieldPaddingMd,
        'input.padding-inline-lg': fields.fieldPaddingLg,
        'select.bg': fields.base,
        'select.color': fields.baseForeground,
        'select.border': fields.input,
        'select.border.hover': fields.ring,
        'select.border.focus': fields.ring,
        'select.shadow.focus': fields.shadowFocus,
        'select.radius': fields.inputRadius,
        'select.height.sm': fields.fieldHeightSm,
        'select.height.md': fields.fieldHeightMd,
        'select.height.lg': fields.fieldHeightLg,
        'select.padding-inline-start.sm': fields.fieldPaddingSm,
        'select.padding-inline-start.md': fields.fieldPaddingMd,
        'select.padding-inline-start.lg': fields.fieldPaddingLg,
        'select.dropdown-bg': fields.popover,
        'select.option.active-bg': fields.muted,
        'select.option.selected-bg': fields.accent,
        'table.radius': fields.radius,
        'picker.input-bg': fields.base,
        'picker.input-border': fields.input,
        'picker.input-border-hover': fields.ring,
        'picker.input-border-focus': fields.ring,
        'picker.input-shadow-focus': fields.shadowFocus,
        'picker.input-color': fields.baseForeground,
        'picker.input-color-placeholder': fields.mutedForeground,
        'picker.input-color-muted': fields.mutedForeground,
        'picker.input-radius': fields.inputRadius,
        'picker.input-padding.sm': `0 ${fields.fieldPaddingSm}`,
        'picker.input-padding.md': `0 ${fields.fieldPaddingMd}`,
        'picker.input-padding.lg': `0 ${fields.fieldPaddingLg}`,
        'picker.dropdown-bg': fields.popover,
        'picker.dropdown-radius': fields.cardRadius,
        'date-picker.header-border': fields.border,
        'date-picker.header-button-color': fields.mutedForeground,
        'date-picker.header-button-color-hover': fields.primary,
        'date-picker.today-color': fields.primary,
        'date-picker.today-color-hover': fields.primary,
        'picker.cell-hover-bg': fields.muted,
        'date-picker.cell-selected-bg': fields.primary,
        'date-picker.cell-selected-color': fields.primaryForeground,
        'date-picker.cell-selected-hover-bg': fields.primary,
        'date-picker.cell-today-border': fields.primary,
        'date-picker.cell-radius': fields.inputRadius,
        'date-picker.range-bg': fields.accent,
        'time-picker.column-border': fields.border,
        'time-picker.cell-bg-selected': fields.primary,
        'time-picker.cell-bg-selected-hover': fields.primary,
        'time-picker.ok-button-bg': fields.primary,
        'time-picker.ok-button-bg-hover': fields.primary,
        'time-picker.ok-button-color': fields.primaryForeground,
        'time-picker.ok-button-radius': fields.buttonRadius,
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
        'cascader.height.sm': fields.fieldHeightSm,
        'cascader.height.md': fields.fieldHeightMd,
        'cascader.height.lg': fields.fieldHeightLg,
        'cascader.bg': fields.base,
        'cascader.border': fields.input,
        'cascader.border-hover': fields.ring,
        'cascader.border-focus': fields.ring,
        'cascader.shadow-focus': fields.shadowFocus,
        'cascader.radius': fields.inputRadius,
        'cascader.padding.sm': `0 calc(${fields.fieldPaddingSm} + 20px) 0 ${fields.fieldPaddingSm}`,
        'cascader.padding.md': `0 calc(${fields.fieldPaddingMd} + 20px) 0 ${fields.fieldPaddingMd}`,
        'cascader.padding.lg': `0 calc(${fields.fieldPaddingLg} + 20px) 0 ${fields.fieldPaddingLg}`,
        'native-select.bg': fields.base,
        'native-select.border': fields.input,
        'native-select.border-hover': fields.ring,
        'native-select.border-focus': fields.ring,
        'native-select.shadow-focus': fields.shadowFocus,
        'native-select.radius': fields.inputRadius,
        'checkbox.bg': fields.base,
        'checkbox.border': fields.input,
        'checkbox.border.hover': fields.ring,
        'checkbox.radius': fields.radius,
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
        'input-number.height.sm': fields.fieldHeightSm,
        'input-number.height.md': fields.fieldHeightMd,
        'input-number.height.lg': fields.fieldHeightLg,
        'segmented.bg': fields.muted,
        'segmented.active-bg': fields.card,
        'segmented.radius': fields.radius,
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

function readComponentFirst(theme: ThemeDocument, componentKey: string, semanticKey?: string): string | undefined {
  const component = theme.tokens?.components?.[componentKey];
  if (component != null) return String(component);

  if (semanticKey) {
    const semantic = theme.tokens?.semantic?.[semanticKey];
    if (semantic != null) return String(semantic);
  }

  return undefined;
}

export function buildDraftFromThemeDocument(theme: ThemeDocument): ThemeEditorDraft {
  const normalizedTheme = normalizeImportedThemeDocument(theme);
  const presetId = inferPresetIdFromThemeDocument(normalizedTheme);
  const mode = normalizedTheme.mode === 'dark' ? 'dark' : 'light';
  const baseDraft = getPresetDraft(presetId, mode);
  const baseFields = { ...baseDraft.fields };

  return {
    ...baseDraft,
    meta: {
      name: normalizedTheme.meta?.name ?? baseDraft.meta.name,
      author: normalizedTheme.meta?.author ?? baseDraft.meta.author,
    },
    mode,
    presetId,
    fields: {
      ...baseFields,
      primary: readToken(normalizedTheme, 'color-primary') ?? baseFields.primary,
      primaryForeground: readComponentFirst(normalizedTheme, 'button.text.primary') ?? baseFields.primaryForeground,
      secondary: readToken(normalizedTheme, 'color-fill', 'button.bg.default') ?? baseFields.secondary,
      secondaryForeground: readToken(normalizedTheme, 'color-text', 'button.text.default') ?? baseFields.secondaryForeground,
      accent: readToken(normalizedTheme, 'color-primary-bg') ?? baseFields.accent,
      success: readToken(normalizedTheme, 'color-success') ?? baseFields.success,
      info: readToken(normalizedTheme, 'color-info') ?? baseFields.info,
      warning: readToken(normalizedTheme, 'color-warning') ?? baseFields.warning,
      danger: readToken(normalizedTheme, 'color-danger') ?? baseFields.danger,
      base: readToken(normalizedTheme, 'color-bg') ?? baseFields.base,
      baseForeground: readToken(normalizedTheme, 'color-text') ?? baseFields.baseForeground,
      card: readToken(normalizedTheme, 'color-bg-container', 'card.bg') ?? baseFields.card,
      cardForeground: readToken(normalizedTheme, 'color-text-heading', 'card.header-color') ?? baseFields.cardForeground,
      popover: readToken(normalizedTheme, 'color-bg-elevated') ?? baseFields.popover,
      muted: readToken(normalizedTheme, 'color-bg-spotlight') ?? baseFields.muted,
      mutedForeground: readToken(normalizedTheme, 'color-text-secondary') ?? baseFields.mutedForeground,
      border: readToken(normalizedTheme, 'color-border') ?? baseFields.border,
      input: readToken(normalizedTheme, 'color-border', 'input.border') ?? baseFields.input,
      ring: readToken(normalizedTheme, 'color-primary', 'input.border.focus') ?? baseFields.ring,
      chart1: readToken(normalizedTheme, 'chart-1') ?? baseFields.chart1,
      chart2: readToken(normalizedTheme, 'chart-2') ?? baseFields.chart2,
      chart3: readToken(normalizedTheme, 'chart-3') ?? baseFields.chart3,
      chart4: readToken(normalizedTheme, 'chart-4') ?? baseFields.chart4,
      chart5: readToken(normalizedTheme, 'chart-5') ?? baseFields.chart5,
      sidebar: readToken(normalizedTheme, 'color-bg-layout', 'layout.sidebar-bg') ?? baseFields.sidebar,
      sidebarForeground: readToken(normalizedTheme, 'color-text', 'layout.sidebar-color') ?? baseFields.sidebarForeground,
      fontSans: readToken(normalizedTheme, 'font-family') ?? baseFields.fontSans,
      fontMono: readToken(normalizedTheme, 'font-family-monospace') ?? baseFields.fontMono,
      fontSizeBase: readToken(normalizedTheme, 'font-size-base') ?? baseFields.fontSizeBase,
      lineHeightBase: readToken(normalizedTheme, 'line-height-base') ?? baseFields.lineHeightBase,
      h1Size: readToken(normalizedTheme, 'h1-font-size') ?? baseFields.h1Size,
      h2Size: readToken(normalizedTheme, 'h2-font-size') ?? baseFields.h2Size,
      radius: readToken(normalizedTheme, 'border-radius') ?? baseFields.radius,
      shadowCard: readToken(normalizedTheme, 'shadow-card', 'card.shadow') ?? baseFields.shadowCard,
      shadowFocus: readToken(normalizedTheme, 'shadow-focus', 'input.shadow.focus') ?? toRgba(baseFields.primary, 0.22),
      buttonRadius: readToken(normalizedTheme, 'border-radius', 'button.radius') ?? baseFields.buttonRadius,
      inputRadius: readToken(normalizedTheme, 'border-radius', 'input.radius') ?? baseFields.inputRadius,
      cardRadius: readToken(normalizedTheme, 'border-radius', 'card.radius') ?? baseFields.cardRadius,
      fieldPaddingSm:
        readComponentFirst(normalizedTheme, 'input.padding-inline-sm', 'control.padding-inline.sm')
        ?? baseFields.fieldPaddingSm,
      fieldPaddingMd:
        readComponentFirst(normalizedTheme, 'input.padding-inline-md', 'control.padding-inline.md')
        ?? readToken(normalizedTheme, 'spacing-4')
        ?? baseFields.fieldPaddingMd,
      fieldPaddingLg:
        readComponentFirst(normalizedTheme, 'input.padding-inline-lg', 'control.padding-inline.lg')
        ?? baseFields.fieldPaddingLg,
      buttonPaddingSm:
        readComponentFirst(normalizedTheme, 'button.padding-inline-sm', 'control.padding-inline.sm')
        ?? baseFields.buttonPaddingSm,
      buttonPaddingMd:
        readComponentFirst(normalizedTheme, 'button.padding-inline-md', 'control.padding-inline.md')
        ?? baseFields.buttonPaddingMd,
      buttonPaddingLg:
        readComponentFirst(normalizedTheme, 'button.padding-inline-lg', 'control.padding-inline.lg')
        ?? baseFields.buttonPaddingLg,
      fieldHeightSm:
        readComponentFirst(normalizedTheme, 'input.height.sm', 'control.height.sm')
        ?? baseFields.fieldHeightSm,
      fieldHeightMd:
        readComponentFirst(normalizedTheme, 'input.height.md', 'control.height.md')
        ?? readToken(normalizedTheme, 'height-md')
        ?? baseFields.fieldHeightMd,
      fieldHeightLg:
        readComponentFirst(normalizedTheme, 'input.height.lg', 'control.height.lg')
        ?? baseFields.fieldHeightLg,
      buttonHeightSm:
        readComponentFirst(normalizedTheme, 'button.height.sm', 'control.height.sm')
        ?? baseFields.buttonHeightSm,
      buttonHeightMd:
        readComponentFirst(normalizedTheme, 'button.height.md', 'control.height.md')
        ?? readToken(normalizedTheme, 'height-md')
        ?? baseFields.buttonHeightMd,
      buttonHeightLg:
        readComponentFirst(normalizedTheme, 'button.height.lg', 'control.height.lg')
        ?? baseFields.buttonHeightLg,
      cardPadding: readToken(normalizedTheme, 'spacing-5', 'card.body-padding') ?? baseFields.cardPadding,
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
