export type ThemeTokenValue = string | number;

export interface ThemeDocumentMeta {
  id?: string;
  name?: string;
  author?: string;
  description?: string;
  version?: string;
  schemaVersion?: number;
  tags?: string[];
}

export interface ThemeDocumentTokens {
  semantic?: Record<string, ThemeTokenValue>;
  components?: Record<string, ThemeTokenValue>;
}

export interface ThemeDocument {
  $schema?: string;
  meta?: ThemeDocumentMeta;
  mode: 'light' | 'dark' | 'system';
  extends?: string;
  tokens?: ThemeDocumentTokens;
}

export interface ThemeConfig {
  $schema?: string;
  meta?: ThemeDocumentMeta;
  mode?: 'light' | 'dark' | 'system';
  extends?: string;
  tokens?: ThemeDocumentTokens;
}

export interface ResolvedThemeResult {
  mode?: 'light' | 'dark' | 'system';
  cssVars: Record<string, string>;
  warnings: string[];
  errors: string[];
  valid: boolean;
  normalizedDocument: ThemeConfig;
}

export interface ResolveThemeOptions {
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

export interface GetThemeStylesheetOptions extends ResolveThemeOptions {
  /** CSS selector prefix for the rule. Defaults to `:root`. */
  selector?: string;
}

export function tokenKeyToCssVar(key: string): string;
export function resolveTheme(
  input: ThemeConfig | ThemeDocument,
  options?: ResolveThemeOptions
): ResolvedThemeResult;
/**
 * Returns a CSS string that applies the theme's overrides under the given
 * selector. Safe to inline in a server-rendered `<style>` tag before hydration
 * to avoid theme FOUC.
 */
export function getThemeStylesheet(
  input: ThemeConfig | ThemeDocument,
  options?: GetThemeStylesheetOptions
): string;
