import { getDesignTokens } from '../src/tools/tokens';

describe('getDesignTokens', () => {
  it('returns all token categories', () => {
    const result = getDesignTokens();
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['colors', 'typography', 'spacing', 'breakpoints', 'shadows'])
    );
  });

  it('filters by category', () => {
    const result = getDesignTokens('colors');
    expect(Object.keys(result)).toEqual(['colors']);
    expect(Object.keys(result.colors).length).toBeGreaterThan(0);
  });

  it('returns empty object for unknown category', () => {
    const result = getDesignTokens('unknown');
    expect(result).toEqual({});
  });
});
