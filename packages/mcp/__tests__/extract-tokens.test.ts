import { extractTokens } from '../scripts/extract-tokens';

describe('extractTokens', () => {
  it('extracts tokens grouped by category', () => {
    const result = extractTokens();

    // Should have known categories
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['colors', 'typography', 'spacing', 'breakpoints', 'shadows'])
    );
  });

  it('extracts color tokens', () => {
    const result = extractTokens();

    expect(result.colors['primary-color']).toEqual({
      variable: '$primary-color',
      value: '#6e41bf',
    });

    expect(result.colors['info-color']).toEqual({
      variable: '$info-color',
      value: '#1890ff',
    });
  });

  it('extracts typography tokens', () => {
    const result = extractTokens();

    expect(result.typography['font-size-base']).toEqual({
      variable: '$font-size-base',
      value: '1rem',
    });
  });

  it('extracts breakpoint tokens', () => {
    const result = extractTokens();

    expect(result.breakpoints['size-xs']).toEqual({
      variable: '$size-xs',
      value: '480px',
    });
  });

  it('extracts shadow tokens', () => {
    const result = extractTokens();

    expect(result.shadows).toBeDefined();
    expect(result.shadows['box-shadow-sm']).toBeDefined();
  });
});
