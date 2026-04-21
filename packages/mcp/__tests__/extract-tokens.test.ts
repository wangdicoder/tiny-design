import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractTokens } from '@tiny-design/extract';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_REGISTRY_PATH = path.resolve(__dirname, '../../tokens/dist/registry.json');
const VARIABLES_PATH = path.resolve(__dirname, '../../react/src/style/_variables.scss');

describe('extractTokens', () => {
  it('extracts tokens grouped by category', () => {
    const result = extractTokens({ registryPath: TOKEN_REGISTRY_PATH, variablesPath: VARIABLES_PATH });

    // Should have known categories
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['colors', 'typography', 'spacing', 'breakpoints', 'shadows'])
    );
  });

  it('extracts color tokens', () => {
    const result = extractTokens({ registryPath: TOKEN_REGISTRY_PATH, variablesPath: VARIABLES_PATH });

    expect(result.colors['color-primary']).toEqual({
      variable: '--ty-color-primary',
      value: '#6e41bf',
    });

    expect(result.colors['color-info']).toEqual({
      variable: '--ty-color-info',
      value: '#1890ff',
    });
  });

  it('extracts resolved semantic color values from the token registry', () => {
    const result = extractTokens({ registryPath: TOKEN_REGISTRY_PATH, variablesPath: VARIABLES_PATH });

    expect(result.colors['color-bg']).toEqual({
      variable: '--ty-color-bg',
      value: '#ffffff',
    });
  });

  it('extracts typography tokens', () => {
    const result = extractTokens({ registryPath: TOKEN_REGISTRY_PATH, variablesPath: VARIABLES_PATH });

    expect(result.typography['font-size-base']).toEqual({
      variable: '--ty-font-size-base',
      value: '14px',
    });
  });

  it('extracts breakpoint tokens', () => {
    const result = extractTokens({ registryPath: TOKEN_REGISTRY_PATH, variablesPath: VARIABLES_PATH });

    expect(result.breakpoints['size-xs']).toEqual({
      variable: '$size-xs',
      value: '480px',
    });
  });

  it('extracts shadow tokens', () => {
    const result = extractTokens({ registryPath: TOKEN_REGISTRY_PATH, variablesPath: VARIABLES_PATH });

    expect(result.shadows).toBeDefined();
    expect(result.shadows['shadow-sm']).toBeDefined();
  });
});
