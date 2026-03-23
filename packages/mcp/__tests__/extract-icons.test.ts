import { extractIcons } from '../scripts/extract-icons';

describe('extractIcons', () => {
  it('returns icon names and shared props', () => {
    const result = extractIcons();

    // Check structure
    expect(result.props).toEqual({
      size: { type: 'string | number', default: '"1em"' },
      color: { type: 'string', default: '"currentColor"' },
    });

    // Check icons array is populated
    expect(result.icons.length).toBeGreaterThan(200);

    // Check specific known icons exist
    expect(result.icons).toContain('IconPlus');
    expect(result.icons).toContain('IconClose');
    expect(result.icons).toContain('IconHeart');

    // All entries should start with "Icon"
    result.icons.forEach((name) => {
      expect(name).toMatch(/^Icon[A-Z]/);
    });
  });
});
