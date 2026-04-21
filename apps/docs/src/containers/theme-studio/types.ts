import type { ThemeDocument } from '@tiny-design/react';
import type { BrandSeedFields } from '@tiny-design/tokens/compile-brand-theme';

export type ThemeEditorSection = 'colors' | 'typography' | 'other';
export type ThemePreviewTemplate = 'cards' | 'dashboard' | 'mail' | 'pricing';
export type ThemeCodeView = 'seeds' | 'json' | 'css' | 'tokens';
export type ThemeMode = 'light' | 'dark';

export type ThemeEditorFields = BrandSeedFields;

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

export type ThemeEditorSeedGroup = {
  title: string;
  description?: string;
  tier?: 'core' | 'advanced';
  fields: Array<{ key: FieldKey; label: string }>;
};

export type ThemeStudioCodeViewOption = { label: string; value: ThemeCodeView };
export type ThemeStudioTemplateOption = { label: string; value: ThemePreviewTemplate };
export type ThemeStudioSectionLabels = Record<ThemeEditorSection, string>;
export type ThemeStudioThemeDocument = ThemeDocument;
