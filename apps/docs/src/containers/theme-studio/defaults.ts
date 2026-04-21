import { DEFAULT_BRAND_SEED_FIELDS } from '@tiny-design/tokens/compile-brand-theme';
import type { ThemeEditorDraft, ThemeEditorFields, ThemeMode } from './types';

export const DEFAULT_FIELDS: ThemeEditorFields = { ...DEFAULT_BRAND_SEED_FIELDS };

export function createDraft(
  id: string,
  name: string,
  author: string,
  mode: ThemeMode,
  fieldPatch: Partial<ThemeEditorFields>,
): ThemeEditorDraft {
  return {
    meta: { name, author },
    mode,
    presetId: id,
    activeSection: 'colors',
    activeTemplate: 'cards',
    activeCodeView: 'json',
    fields: {
      ...DEFAULT_FIELDS,
      ...fieldPatch,
    },
  };
}
