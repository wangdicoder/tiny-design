import type { ThemeDocument } from '@tiny-design/react';
import { compileBrandTheme } from '@tiny-design/tokens/compile-brand-theme';
import { validateThemeDocument } from '@tiny-design/tokens/validate-theme';
import { toRgba } from './color-utils';
import { getPresetDraft } from './runtime-presets';
import type {
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
  return compileBrandTheme(draft.fields, {
    mode: draft.mode,
    presetId: draft.presetId,
    meta: {
      name: draft.meta.name,
      author: draft.meta.author,
      schemaVersion: 1,
    },
  });
}

function readToken(
  theme: ThemeDocument,
  semanticKey: string,
  componentKey?: string
): string | undefined {
  const semantic = theme.tokens?.semantic?.[semanticKey];
  if (semantic != null) return String(semantic);

  if (componentKey) {
    const component = theme.tokens?.components?.[componentKey];
    if (component != null) return String(component);
  }

  return undefined;
}

function readComponentFirst(
  theme: ThemeDocument,
  componentKey: string,
  semanticKey?: string
): string | undefined {
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
      primaryForeground:
        readComponentFirst(normalizedTheme, 'button.solid.primary.text') ??
        readComponentFirst(normalizedTheme, 'button.text.primary') ??
        baseFields.primaryForeground,
      secondary:
        readComponentFirst(normalizedTheme, 'card.bg.filled') ??
        readComponentFirst(normalizedTheme, 'table.header-bg') ??
        readComponentFirst(normalizedTheme, 'tag.bg') ??
        readToken(normalizedTheme, 'color-fill', 'button.solid.default.bg') ??
        readToken(normalizedTheme, 'color-fill', 'button.bg.default') ??
        baseFields.secondary,
      secondaryForeground:
        readComponentFirst(normalizedTheme, 'tag.color') ??
        readToken(normalizedTheme, 'color-text', 'button.solid.default.text') ??
        readToken(normalizedTheme, 'color-text', 'button.text.default') ??
        baseFields.secondaryForeground,
      accent: readToken(normalizedTheme, 'color-primary-bg') ?? baseFields.accent,
      success: readToken(normalizedTheme, 'color-success') ?? baseFields.success,
      info: readToken(normalizedTheme, 'color-info') ?? baseFields.info,
      warning: readToken(normalizedTheme, 'color-warning') ?? baseFields.warning,
      danger: readToken(normalizedTheme, 'color-danger') ?? baseFields.danger,
      base: readToken(normalizedTheme, 'color-bg') ?? baseFields.base,
      baseForeground: readToken(normalizedTheme, 'color-text') ?? baseFields.baseForeground,
      card: readToken(normalizedTheme, 'color-bg-container', 'card.bg') ?? baseFields.card,
      cardForeground:
        readToken(normalizedTheme, 'color-text-heading', 'card.header-color') ??
        baseFields.cardForeground,
      popover: readToken(normalizedTheme, 'color-bg-elevated') ?? baseFields.popover,
      muted: readToken(normalizedTheme, 'color-bg-spotlight') ?? baseFields.muted,
      mutedForeground:
        readToken(normalizedTheme, 'color-text-secondary') ?? baseFields.mutedForeground,
      border: readToken(normalizedTheme, 'color-border') ?? baseFields.border,
      input: readToken(normalizedTheme, 'color-border', 'input.border') ?? baseFields.input,
      ring: readToken(normalizedTheme, 'color-primary', 'input.border.focus') ?? baseFields.ring,
      chart1: readToken(normalizedTheme, 'chart-1') ?? baseFields.chart1,
      chart2: readToken(normalizedTheme, 'chart-2') ?? baseFields.chart2,
      chart3: readToken(normalizedTheme, 'chart-3') ?? baseFields.chart3,
      chart4: readToken(normalizedTheme, 'chart-4') ?? baseFields.chart4,
      chart5: readToken(normalizedTheme, 'chart-5') ?? baseFields.chart5,
      sidebar:
        readToken(normalizedTheme, 'color-bg-layout', 'layout.sidebar-bg') ?? baseFields.sidebar,
      sidebarForeground:
        readToken(normalizedTheme, 'color-text', 'layout.sidebar-color') ??
        baseFields.sidebarForeground,
      fontSans: readToken(normalizedTheme, 'font-family') ?? baseFields.fontSans,
      fontMono: readToken(normalizedTheme, 'font-family-monospace') ?? baseFields.fontMono,
      fontSizeBase: readToken(normalizedTheme, 'font-size-base') ?? baseFields.fontSizeBase,
      lineHeightBase: readToken(normalizedTheme, 'line-height-base') ?? baseFields.lineHeightBase,
      h1Size: readToken(normalizedTheme, 'h1-font-size') ?? baseFields.h1Size,
      h2Size: readToken(normalizedTheme, 'h2-font-size') ?? baseFields.h2Size,
      radius: readToken(normalizedTheme, 'border-radius') ?? baseFields.radius,
      shadowControl:
        readToken(normalizedTheme, 'shadow-control', 'input.shadow') ?? baseFields.shadowControl,
      shadowCard: readToken(normalizedTheme, 'shadow-card', 'card.shadow') ?? baseFields.shadowCard,
      shadowFocus: readToken(normalizedTheme, 'shadow-focus') ?? toRgba(baseFields.primary, 0.22),
      buttonRadius:
        readToken(normalizedTheme, 'border-radius', 'button.radius') ?? baseFields.buttonRadius,
      inputRadius:
        readToken(normalizedTheme, 'border-radius', 'input.radius') ?? baseFields.inputRadius,
      cardRadius:
        readToken(normalizedTheme, 'border-radius', 'card.radius') ?? baseFields.cardRadius,
      fieldPaddingSm:
        readComponentFirst(
          normalizedTheme,
          'input.padding-inline-sm',
          'control.padding-inline.sm'
        ) ?? baseFields.fieldPaddingSm,
      fieldPaddingMd:
        readComponentFirst(
          normalizedTheme,
          'input.padding-inline-md',
          'control.padding-inline.md'
        ) ??
        readToken(normalizedTheme, 'spacing-4') ??
        baseFields.fieldPaddingMd,
      fieldPaddingLg:
        readComponentFirst(
          normalizedTheme,
          'input.padding-inline-lg',
          'control.padding-inline.lg'
        ) ?? baseFields.fieldPaddingLg,
      buttonPaddingSm:
        readComponentFirst(
          normalizedTheme,
          'button.padding-inline-sm',
          'control.padding-inline.sm'
        ) ?? baseFields.buttonPaddingSm,
      buttonPaddingMd:
        readComponentFirst(
          normalizedTheme,
          'button.padding-inline-md',
          'control.padding-inline.md'
        ) ?? baseFields.buttonPaddingMd,
      buttonPaddingLg:
        readComponentFirst(
          normalizedTheme,
          'button.padding-inline-lg',
          'control.padding-inline.lg'
        ) ?? baseFields.buttonPaddingLg,
      fieldHeightSm:
        readComponentFirst(normalizedTheme, 'input.height.sm', 'control.height.sm') ??
        baseFields.fieldHeightSm,
      fieldHeightMd:
        readComponentFirst(normalizedTheme, 'input.height.md', 'control.height.md') ??
        readToken(normalizedTheme, 'height-md') ??
        baseFields.fieldHeightMd,
      fieldHeightLg:
        readComponentFirst(normalizedTheme, 'input.height.lg', 'control.height.lg') ??
        baseFields.fieldHeightLg,
      buttonHeightSm:
        readComponentFirst(normalizedTheme, 'button.height.sm', 'control.height.sm') ??
        baseFields.buttonHeightSm,
      buttonHeightMd:
        readComponentFirst(normalizedTheme, 'button.height.md', 'control.height.md') ??
        readToken(normalizedTheme, 'height-md') ??
        baseFields.buttonHeightMd,
      buttonHeightLg:
        readComponentFirst(normalizedTheme, 'button.height.lg', 'control.height.lg') ??
        baseFields.buttonHeightLg,
      cardPadding:
        readToken(normalizedTheme, 'spacing-5', 'card.body-padding') ?? baseFields.cardPadding,
    },
  };
}

export function createDefaultDraft(): ThemeEditorDraft {
  return getPresetDraft('default', 'light');
}

export function applyPresetToDraft(
  presetId: string,
  current?: ThemeEditorDraft,
  modeOverride?: ThemeMode
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
  colors: 'Color Seeds',
  typography: 'Type Seeds',
  other: 'Scale Seeds',
};

export const TEMPLATE_OPTIONS: ThemeStudioTemplateOption[] = [
  { label: 'Cards', value: 'cards' },
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Mail', value: 'mail' },
  { label: 'Pricing', value: 'pricing' },
];

export const CODE_VIEW_OPTIONS: ThemeStudioCodeViewOption[] = [
  { label: 'Seed JSON', value: 'seeds' },
  { label: 'Theme JSON', value: 'json' },
  { label: 'CSS Vars', value: 'css' },
  { label: 'Compiled Tokens', value: 'tokens' },
];
