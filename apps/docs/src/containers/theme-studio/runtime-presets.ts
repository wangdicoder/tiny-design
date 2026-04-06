import { DEFAULT_FIELDS, createDraft } from './defaults';
import { buildShadow, deriveStatusPalette, toRgba } from './color-utils';
import {
  TWEAKCN_RUNTIME_PRESET_SOURCES,
  type TweakcnRuntimePresetSource,
} from './tweakcn-runtime-presets';
import type { ThemeEditorFields, ThemeEditorPreset, ThemeMode } from './types';

type RuntimeStyles = Record<string, string>;

function buildPresetDescription(source: TweakcnRuntimePresetSource): string {
  if (source.id === 'default') {
    return 'Default tweakcn editor theme captured from the live runtime.';
  }

  return source.createdAt
    ? `Imported from tweakcn runtime preset. Source created at ${source.createdAt}.`
    : 'Imported from tweakcn runtime preset.';
}

function mapRuntimeStylesToFields(styles: RuntimeStyles): Partial<ThemeEditorFields> {
  const radius = styles.radius ?? DEFAULT_FIELDS.radius;
  const ring = styles.ring ?? styles.primary ?? DEFAULT_FIELDS.ring;
  const statusPalette = deriveStatusPalette(styles);

  return {
    primary: styles.primary ?? DEFAULT_FIELDS.primary,
    primaryForeground: styles['primary-foreground'] ?? DEFAULT_FIELDS.primaryForeground,
    secondary: styles.secondary ?? DEFAULT_FIELDS.secondary,
    secondaryForeground: styles['secondary-foreground'] ?? DEFAULT_FIELDS.secondaryForeground,
    accent: styles.accent ?? DEFAULT_FIELDS.accent,
    accentForeground: styles['accent-foreground'] ?? DEFAULT_FIELDS.accentForeground,
    success: styles.success ?? statusPalette.success,
    successForeground: styles['success-foreground'] ?? statusPalette.successForeground,
    info: styles.info ?? statusPalette.info,
    infoForeground: styles['info-foreground'] ?? statusPalette.infoForeground,
    warning: styles.warning ?? statusPalette.warning,
    warningForeground: styles['warning-foreground'] ?? statusPalette.warningForeground,
    danger: styles.danger ?? statusPalette.danger,
    dangerForeground: styles['danger-foreground'] ?? statusPalette.dangerForeground,
    base: styles.background ?? DEFAULT_FIELDS.base,
    baseForeground: styles.foreground ?? DEFAULT_FIELDS.baseForeground,
    card: styles.card ?? DEFAULT_FIELDS.card,
    cardForeground: styles['card-foreground'] ?? DEFAULT_FIELDS.cardForeground,
    popover: styles.popover ?? DEFAULT_FIELDS.popover,
    popoverForeground: styles['popover-foreground'] ?? DEFAULT_FIELDS.popoverForeground,
    muted: styles.muted ?? DEFAULT_FIELDS.muted,
    mutedForeground: styles['muted-foreground'] ?? DEFAULT_FIELDS.mutedForeground,
    border: styles.border ?? DEFAULT_FIELDS.border,
    input: styles.input ?? DEFAULT_FIELDS.input,
    ring,
    chart1: styles['chart-1'] ?? DEFAULT_FIELDS.chart1,
    chart2: styles['chart-2'] ?? DEFAULT_FIELDS.chart2,
    chart3: styles['chart-3'] ?? DEFAULT_FIELDS.chart3,
    chart4: styles['chart-4'] ?? DEFAULT_FIELDS.chart4,
    chart5: styles['chart-5'] ?? DEFAULT_FIELDS.chart5,
    sidebar: styles.sidebar ?? DEFAULT_FIELDS.sidebar,
    sidebarForeground: styles['sidebar-foreground'] ?? DEFAULT_FIELDS.sidebarForeground,
    sidebarPrimary: styles['sidebar-primary'] ?? DEFAULT_FIELDS.sidebarPrimary,
    sidebarPrimaryForeground: styles['sidebar-primary-foreground'] ?? DEFAULT_FIELDS.sidebarPrimaryForeground,
    sidebarAccent: styles['sidebar-accent'] ?? DEFAULT_FIELDS.sidebarAccent,
    sidebarAccentForeground: styles['sidebar-accent-foreground'] ?? DEFAULT_FIELDS.sidebarAccentForeground,
    sidebarBorder: styles['sidebar-border'] ?? DEFAULT_FIELDS.sidebarBorder,
    sidebarRing: styles['sidebar-ring'] ?? DEFAULT_FIELDS.sidebarRing,
    fontSans: styles['font-sans'] ?? DEFAULT_FIELDS.fontSans,
    fontMono: styles['font-mono'] ?? DEFAULT_FIELDS.fontMono,
    letterSpacing: styles['letter-spacing'] ?? DEFAULT_FIELDS.letterSpacing,
    radius,
    shadowCard: buildShadow(styles),
    shadowFocus: `0 0 0 3px ${toRgba(ring, 0.24)}`,
    buttonRadius: radius,
    inputRadius: radius,
    cardRadius: radius,
  };
}

function buildPresetFromRuntimeSource(source: TweakcnRuntimePresetSource): ThemeEditorPreset {
  const lightStyles = source.styles.light;
  const darkStyles = source.styles.dark;

  return {
    id: source.id,
    name: source.label,
    description: buildPresetDescription(source),
    swatches: [
      lightStyles.primary ?? DEFAULT_FIELDS.primary,
      lightStyles.accent ?? DEFAULT_FIELDS.accent,
      lightStyles.background ?? DEFAULT_FIELDS.base,
      lightStyles.sidebar ?? DEFAULT_FIELDS.sidebar,
    ],
    drafts: {
      light: createDraft(
        source.id,
        source.label,
        'tweakcn',
        'light',
        mapRuntimeStylesToFields(lightStyles),
      ),
      dark: createDraft(
        source.id,
        source.label,
        'tweakcn',
        'dark',
        mapRuntimeStylesToFields(darkStyles),
      ),
    },
  };
}

export const THEME_EDITOR_PRESETS: ThemeEditorPreset[] =
  TWEAKCN_RUNTIME_PRESET_SOURCES.map(buildPresetFromRuntimeSource);

export function getPresetById(presetId: string): ThemeEditorPreset {
  return THEME_EDITOR_PRESETS.find((preset) => preset.id === presetId) ?? THEME_EDITOR_PRESETS[0];
}

export function getPresetDraft(presetId: string, mode: ThemeMode) {
  return structuredClone(getPresetById(presetId).drafts[mode]);
}
