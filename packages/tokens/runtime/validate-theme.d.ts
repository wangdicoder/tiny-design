import type { ThemeConfig, ThemeDocument } from './resolve-theme';

export interface ThemeValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  normalizedDocument: ThemeConfig;
}

export function validateThemeDocument(
  input: ThemeConfig | ThemeDocument,
  options?: {
    strict?: boolean;
    presets?: Record<string, ThemeDocument>;
    registry?: {
      tokens: Array<{
        key: string;
        category: 'semantic' | 'component' | 'primitive';
        status: 'active' | 'deprecated' | 'internal';
        defaultValue: string | number;
      }>;
    };
  }
): ThemeValidationResult;
