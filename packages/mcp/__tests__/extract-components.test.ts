import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractComponents, ComponentData } from '@tiny-design/extract';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REACT_SRC = path.resolve(__dirname, '../../react/src');

describe('extractComponents', () => {
  let components: ComponentData[];

  beforeAll(() => {
    components = extractComponents({ reactSrcPath: REACT_SRC });
  });

  it('extracts all components', () => {
    expect(components.length).toBeGreaterThan(80);
  });

  it('extracts Button component correctly', () => {
    const button = components.find((c) => c.name === 'Button');
    expect(button).toBeDefined();
    expect(button!.category).toBe('Foundation');
    expect(button!.description).toBe('To trigger an operation.');

    const btnType = button!.props.find((p) => p.name === 'btnType');
    expect(btnType).toBeDefined();
    expect(btnType!.required).toBe(false);
    expect(btnType!.type).toContain('primary');

    const style = button!.props.find((p) => p.name === 'style');
    expect(style).toBeDefined();
  });

  it('extracts demo files', () => {
    const button = components.find((c) => c.name === 'Button');
    expect(button!.demos.length).toBeGreaterThan(0);
    expect(button!.demos[0].name).toBeDefined();
    expect(button!.demos[0].code).toContain('import');
  });

  it('assigns categories to all components', () => {
    const validCategories = [
      'Foundation', 'Layout', 'Navigation', 'Data Display',
      'Form', 'Feedback', 'Miscellany',
    ];
    components.forEach((c) => {
      expect(validCategories).toContain(c.category);
    });
  });
});
