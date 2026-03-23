import { listComponents, getComponentProps, getComponentExample } from '../src/tools/components';

describe('listComponents', () => {
  it('returns all components', () => {
    const result = listComponents();
    expect(result.length).toBeGreaterThan(80);
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('category');
    expect(result[0]).toHaveProperty('description');
    expect(result[0]).not.toHaveProperty('props');
    expect(result[0]).not.toHaveProperty('demos');
  });

  it('filters by category', () => {
    const result = listComponents('Foundation');
    expect(result.length).toBeGreaterThan(0);
    result.forEach((c) => expect(c.category).toBe('Foundation'));
  });

  it('returns empty array for unknown category', () => {
    expect(listComponents('Unknown')).toEqual([]);
  });
});

describe('getComponentProps', () => {
  it('returns props for a known component', () => {
    const result = getComponentProps('Button');
    expect(result).not.toBeNull();
    expect(result!.name).toBe('Button');
    expect(result!.props.length).toBeGreaterThan(0);
    expect(result!.props.find((p) => p.name === 'btnType')).toBeDefined();
  });

  it('is case-insensitive', () => {
    const result = getComponentProps('button');
    expect(result).not.toBeNull();
    expect(result!.name).toBe('Button');
  });

  it('returns null for unknown component', () => {
    expect(getComponentProps('FooBar')).toBeNull();
  });
});

describe('getComponentExample', () => {
  it('returns all demos for a component', () => {
    const result = getComponentExample('Button');
    expect(result).not.toBeNull();
    expect(result!.length).toBeGreaterThan(0);
    expect(result![0].code).toContain('import');
  });

  it('returns specific demo by name', () => {
    const result = getComponentExample('Button', 'Type');
    expect(result).not.toBeNull();
    expect(result!.length).toBe(1);
    expect(result![0].name).toBe('Type');
  });

  it('returns null for unknown component', () => {
    expect(getComponentExample('FooBar')).toBeNull();
  });
});
