import { listIcons, getIcon } from '../src/tools/icons';

describe('listIcons', () => {
  it('returns all icons', () => {
    const result = listIcons();
    expect(result.length).toBeGreaterThan(200);
  });

  it('filters by search term', () => {
    const result = listIcons('arrow');
    expect(result.length).toBeGreaterThan(0);
    result.forEach((name) => {
      expect(name.toLowerCase()).toContain('arrow');
    });
  });

  it('returns empty for no matches', () => {
    expect(listIcons('zzzznotanicon')).toEqual([]);
  });
});

describe('getIcon', () => {
  it('returns icon details', () => {
    const result = getIcon('IconPlus');
    expect(result).not.toBeNull();
    expect(result!.name).toBe('IconPlus');
    expect(result!.props).toBeDefined();
    expect(result!.usage).toContain('IconPlus');
  });

  it('is case-insensitive', () => {
    const result = getIcon('iconplus');
    expect(result).not.toBeNull();
  });

  it('returns null for unknown icon', () => {
    expect(getIcon('IconFooBar')).toBeNull();
  });
});
