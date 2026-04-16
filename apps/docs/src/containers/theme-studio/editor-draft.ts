import React from 'react';
import {
  buildDraftFromThemeDocument,
  createDefaultDraft,
  type ThemeEditorDraft,
  type ThemeEditorFields,
} from './presets';
import {
  clearPendingThemeDocument,
  loadPendingThemeDocument,
} from '../../utils/theme-document';
import { loadStoredThemeDocument } from '../../utils/theme-persistence';

export const DRAFT_KEY = 'ty-theme-studio-editor-draft';
export const PRESET_ID_KEY = 'ty-theme-preset-id';

function safeJsonParse<T>(value: string): T | undefined {
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

export function encodeDraft(draft: ThemeEditorDraft): string {
  return btoa(encodeURIComponent(JSON.stringify(draft)));
}

function decodeDraft(value: string): ThemeEditorDraft | undefined {
  try {
    return JSON.parse(decodeURIComponent(atob(value))) as ThemeEditorDraft;
  } catch {
    return undefined;
  }
}

export function loadInitialDraft(): ThemeEditorDraft {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get('draft');
    if (shared) {
      const decoded = decodeDraft(shared);
      if (decoded) return decoded;
    }
  }

  const pendingTheme = loadPendingThemeDocument();
  if (pendingTheme) {
    clearPendingThemeDocument();
    try {
      return buildDraftFromThemeDocument(pendingTheme);
    } catch {
      // Ignore invalid cached documents and continue with the next source.
    }
  }

  const storedTheme = loadStoredThemeDocument();
  if (storedTheme) {
    try {
      return buildDraftFromThemeDocument(storedTheme);
    } catch {
      // Ignore invalid cached documents and fall back to the editor draft/default.
    }
  }

  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      const parsed = safeJsonParse<ThemeEditorDraft>(raw);
      if (parsed) return parsed;
    }
  } catch {
    // ignore
  }

  return createDefaultDraft();
}

export function buildPreviewVars(fields: ThemeEditorFields): React.CSSProperties {
  return {
    fontFamily: fields.fontSans,
    fontSize: fields.fontSizeBase,
    lineHeight: fields.lineHeightBase,
    letterSpacing: fields.letterSpacing,
    '--ty-font-family': fields.fontSans,
    '--ty-font-family-monospace': fields.fontMono,
    '--ty-font-size-base': fields.fontSizeBase,
    '--ty-line-height-base': fields.lineHeightBase,
    '--ty-h1-font-size': fields.h1Size,
    '--ty-h2-font-size': fields.h2Size,
    '--editor-primary': fields.primary,
    '--editor-primary-foreground': fields.primaryForeground,
    '--editor-secondary': fields.secondary,
    '--editor-secondary-foreground': fields.secondaryForeground,
    '--editor-accent': fields.accent,
    '--editor-accent-foreground': fields.accentForeground,
    '--editor-success': fields.success,
    '--editor-success-foreground': fields.successForeground,
    '--editor-info': fields.info,
    '--editor-info-foreground': fields.infoForeground,
    '--editor-warning': fields.warning,
    '--editor-warning-foreground': fields.warningForeground,
    '--editor-danger': fields.danger,
    '--editor-danger-foreground': fields.dangerForeground,
    '--editor-base': fields.base,
    '--editor-base-foreground': fields.baseForeground,
    '--editor-card': fields.card,
    '--editor-card-foreground': fields.cardForeground,
    '--editor-popover': fields.popover,
    '--editor-popover-foreground': fields.popoverForeground,
    '--editor-muted': fields.muted,
    '--editor-muted-foreground': fields.mutedForeground,
    '--editor-border': fields.border,
    '--editor-ring': fields.ring,
    '--editor-sidebar': fields.sidebar,
    '--editor-sidebar-foreground': fields.sidebarForeground,
    '--editor-sidebar-primary': fields.sidebarPrimary,
    '--editor-sidebar-primary-foreground': fields.sidebarPrimaryForeground,
    '--editor-sidebar-accent': fields.sidebarAccent,
    '--editor-sidebar-accent-foreground': fields.sidebarAccentForeground,
    '--editor-sidebar-border': fields.sidebarBorder,
    '--editor-sidebar-ring': fields.sidebarRing,
    '--editor-font-sans': fields.fontSans,
    '--editor-font-mono': fields.fontMono,
    '--editor-font-size-base': fields.fontSizeBase,
    '--editor-line-height-base': fields.lineHeightBase,
    '--editor-h1-size': fields.h1Size,
    '--editor-h2-size': fields.h2Size,
    '--editor-letter-spacing': fields.letterSpacing,
    '--editor-radius': fields.radius,
    '--editor-shadow-control': fields.shadowControl,
    '--editor-shadow-card': fields.shadowCard,
    '--editor-shadow-focus': fields.shadowFocus,
    '--editor-button-radius': fields.buttonRadius,
    '--editor-input-radius': fields.inputRadius,
    '--editor-card-radius': fields.cardRadius,
    '--editor-field-padding-sm': fields.fieldPaddingSm,
    '--editor-field-padding-md': fields.fieldPaddingMd,
    '--editor-field-padding-lg': fields.fieldPaddingLg,
    '--editor-button-padding-sm': fields.buttonPaddingSm,
    '--editor-button-padding-md': fields.buttonPaddingMd,
    '--editor-button-padding-lg': fields.buttonPaddingLg,
    '--editor-field-height-sm': fields.fieldHeightSm,
    '--editor-field-height-md': fields.fieldHeightMd,
    '--editor-field-height-lg': fields.fieldHeightLg,
    '--editor-button-height-sm': fields.buttonHeightSm,
    '--editor-button-height-md': fields.buttonHeightMd,
    '--editor-button-height-lg': fields.buttonHeightLg,
    '--editor-card-padding': fields.cardPadding,
  } as React.CSSProperties;
}
