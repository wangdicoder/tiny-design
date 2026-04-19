import * as fs from 'node:fs';
import * as path from 'node:path';
import { Project, type InterfaceDeclaration } from 'ts-morph';
import type {
  ComponentData,
  ComponentDataWithDocs,
  ComponentProp,
  ExtractComponentsOptions,
} from './types.js';

// Category mapping from routers.tsx
export const CATEGORY_MAP: Record<string, string> = {
  button: 'Foundation', icon: 'Foundation', image: 'Foundation',
  link: 'Foundation', typography: 'Foundation',

  'aspect-ratio': 'Layout', divider: 'Layout', flex: 'Layout',
  grid: 'Layout', layout: 'Layout', space: 'Layout', split: 'Layout',
  waterfall: 'Layout',

  anchor: 'Navigation', breadcrumb: 'Navigation', dropdown: 'Navigation',
  menu: 'Navigation', pagination: 'Navigation', 'quick-actions': 'Navigation',
  steps: 'Navigation',

  avatar: 'Data Display', badge: 'Data Display', calendar: 'Data Display',
  card: 'Data Display', carousel: 'Data Display', collapse: 'Data Display',
  countdown: 'Data Display', empty: 'Data Display', descriptions: 'Data Display',
  flip: 'Data Display', list: 'Data Display', marquee: 'Data Display',
  popover: 'Data Display', progress: 'Data Display', 'scroll-number': 'Data Display',
  statistic: 'Data Display', table: 'Data Display', tag: 'Data Display',
  'text-loop': 'Data Display', timeline: 'Data Display', tooltip: 'Data Display',
  tree: 'Data Display',

  form: 'Form', 'auto-complete': 'Form', cascader: 'Form', checkbox: 'Form',
  'color-picker': 'Form', 'date-picker': 'Form', input: 'Form',
  'input-number': 'Form', 'input-password': 'Form', 'input-otp': 'Form',
  'native-select': 'Form', radio: 'Form', rate: 'Form', segmented: 'Form',
  select: 'Form', slider: 'Form', 'split-button': 'Form', switch: 'Form',
  tabs: 'Form', textarea: 'Form', 'time-picker': 'Form', transfer: 'Form',
  upload: 'Form',

  alert: 'Feedback', drawer: 'Feedback', loader: 'Feedback',
  overlay: 'Feedback', 'loading-bar': 'Feedback', message: 'Feedback',
  modal: 'Feedback', notification: 'Feedback', 'pop-confirm': 'Feedback',
  result: 'Feedback', 'scroll-indicator': 'Feedback', skeleton: 'Feedback',
  'strength-indicator': 'Feedback',

  'back-top': 'Miscellany', 'config-provider': 'Miscellany',
  'copy-to-clipboard': 'Miscellany', keyboard: 'Miscellany',
  sticky: 'Miscellany',
};

export function dirNameToComponentName(dirName: string): string {
  return dirName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function getDescription(componentDir: string, filename = 'index.md'): string {
  const mdPath = path.join(componentDir, filename);
  if (!fs.existsSync(mdPath)) return '';

  const content = fs.readFileSync(mdPath, 'utf-8');
  const lines = content.split('\n');

  let foundHeading = false;
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundHeading = true;
      continue;
    }
    if (foundHeading && line.trim() !== '' && !line.startsWith('import ')) {
      return line.trim();
    }
  }
  return '';
}

export function getDemos(componentDir: string): { name: string; code: string }[] {
  const demoDir = path.join(componentDir, 'demo');
  if (!fs.existsSync(demoDir)) return [];

  return fs
    .readdirSync(demoDir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => ({
      name: path.basename(f, '.tsx'),
      code: fs.readFileSync(path.join(demoDir, f), 'utf-8'),
    }));
}

function resolveTypeText(typeText: string, iface: InterfaceDeclaration): string {
  if (/^[A-Z][A-Za-z0-9]*$/.test(typeText)) {
    const sourceFile = iface.getSourceFile();
    const typeAlias = sourceFile.getTypeAlias(typeText);
    if (typeAlias) {
      const aliasTypeNode = typeAlias.getTypeNode();
      if (aliasTypeNode) {
        return aliasTypeNode.getText();
      }
    }
  }
  return typeText;
}

function extractPropsFromInterface(iface: InterfaceDeclaration): ComponentProp[] {
  const props: ComponentProp[] = [];

  for (const prop of iface.getProperties()) {
    const name = prop.getName();
    const typeNode = prop.getTypeNode();
    const rawTypeText = typeNode ? typeNode.getText() : prop.getType().getText(prop);
    const typeText = resolveTypeText(rawTypeText, iface);
    const isOptional = prop.hasQuestionToken();

    const jsDocs = prop.getJsDocs();
    const description = jsDocs.length > 0 ? jsDocs[0].getDescription().trim() : '';

    props.push({
      name,
      type: typeText,
      required: !isOptional,
      description,
    });
  }

  return props;
}

/**
 * Parse the markdown API table to extract default values for props.
 * Tables use the format: | Property | Description | Type | Default |
 * Pipe characters in cells are encoded as &#124;
 */
function parseApiTableDefaults(mdPath: string): Record<string, string> {
  const defaults: Record<string, string> = {};
  if (!fs.existsSync(mdPath)) return defaults;

  const content = fs.readFileSync(mdPath, 'utf-8');
  const lines = content.split('\n');

  let inApiSection = false;
  let headerParsed = false;

  for (const line of lines) {
    if (line.startsWith('## API')) {
      inApiSection = true;
      headerParsed = false;
      continue;
    }
    if (inApiSection && line.startsWith('## ')) {
      break; // Next section
    }
    if (!inApiSection) continue;

    // Skip the header row and separator
    if (line.includes('Property') && line.includes('Description')) {
      headerParsed = true;
      continue;
    }
    if (line.match(/^\|\s*-+/)) continue;

    if (headerParsed && line.startsWith('|')) {
      // Split by | but handle &#124; escape
      const raw = line.replace(/&#124;/g, '\u0000');
      const cells = raw.split('|').map((c) => c.replace(/\u0000/g, '|').trim());
      // cells[0] is empty (before first |), cells[1]=Property, cells[4]=Default
      if (cells.length >= 5) {
        const propName = cells[1].trim();
        const defaultVal = cells[4].trim();
        if (propName && defaultVal && defaultVal !== '-') {
          defaults[propName] = defaultVal;
        }
      }
    }
  }

  return defaults;
}

/**
 * Read full markdown doc, stripping import lines and JSX components.
 */
function readDocMarkdown(mdPath: string): string {
  if (!fs.existsSync(mdPath)) return '';

  const content = fs.readFileSync(mdPath, 'utf-8');
  const lines = content.split('\n');
  const result: string[] = [];
  let skipDepth = 0;
  let inCodeBlock = false;
  let preamble = true; // Track whether we're still in the file preamble (before first heading)

  for (const line of lines) {
    // Track code blocks to avoid stripping content inside them
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }

    // Only skip import lines in the preamble (before first heading), not inside code blocks
    if (preamble && !inCodeBlock && line.startsWith('import ')) continue;
    if (line.startsWith('#')) preamble = false;

    // Inside code blocks, emit as-is
    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // Track JSX block elements to skip
    if (line.match(/^\s*<(Layout|Column|Demo|DemoBlock)\b/)) {
      skipDepth++;
      continue;
    }
    if (line.match(/^\s*<\/(Layout|Column|Demo)>/)) {
      skipDepth--;
      continue;
    }
    // Skip self-closing DemoBlock tags
    if (line.match(/^\s*<DemoBlock\b.*\/>/)) continue;

    if (skipDepth > 0) {
      // Still include markdown content inside JSX blocks (headings, paragraphs)
      if (line.startsWith('#') || (line.trim() !== '' && !line.trim().startsWith('<'))) {
        result.push(line);
      }
      continue;
    }

    result.push(line);
  }

  return result.join('\n').trim();
}

const BASE_PROPS: ComponentProp[] = [
  { name: 'style', type: 'CSSProperties', required: false, description: 'Inline styles' },
  { name: 'className', type: 'string', required: false, description: 'CSS class name' },
  {
    name: 'prefixCls',
    type: 'string',
    required: false,
    description: 'CSS class prefix (default: "ty")',
  },
];

export function extractComponents(options: ExtractComponentsOptions): ComponentData[];
export function extractComponents(
  options: ExtractComponentsOptions & { includeDocs: true },
): ComponentDataWithDocs[];
export function extractComponents(
  options: ExtractComponentsOptions,
): (ComponentData | ComponentDataWithDocs)[] {
  const { reactSrcPath, includeDocs = false, includeDefaults = false } = options;

  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
  });

  const components: (ComponentData | ComponentDataWithDocs)[] = [];
  const dirs = fs.readdirSync(reactSrcPath, { withFileTypes: true });

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    if (dir.name.startsWith('_')) continue;

    const dirName = dir.name;
    const componentDir = path.join(reactSrcPath, dirName);
    const typesPath = path.join(componentDir, 'types.ts');
    if (!fs.existsSync(typesPath)) continue;

    const category = CATEGORY_MAP[dirName];
    if (!category) continue;

    const sourceFile = project.addSourceFileAtPath(typesPath);
    const interfaces = sourceFile.getInterfaces();

    const componentName = dirNameToComponentName(dirName);
    const mainInterface =
      interfaces.find((i) => i.getName() === `${componentName}Props`) ??
      interfaces.find((i) => i.isExported() && i.getName().endsWith('Props'));

    if (!mainInterface) continue;

    const props = extractPropsFromInterface(mainInterface);

    // Merge default values from API table
    if (includeDefaults) {
      const defaults = parseApiTableDefaults(path.join(componentDir, 'index.md'));
      for (const prop of props) {
        if (defaults[prop.name]) {
          prop.default = defaults[prop.name];
        }
      }
    }

    const propNames = new Set(props.map((p) => p.name));
    const allProps = [...props, ...BASE_PROPS.filter((p) => !propNames.has(p.name))];

    const component: ComponentData = {
      name: componentName,
      dirName,
      category,
      description: getDescription(componentDir),
      descriptionZh: getDescription(componentDir, 'index.zh_CN.md'),
      props: allProps,
      demos: getDemos(componentDir),
    };

    if (includeDocs) {
      (component as ComponentDataWithDocs).doc = {
        en: readDocMarkdown(path.join(componentDir, 'index.md')),
        zh: readDocMarkdown(path.join(componentDir, 'index.zh_CN.md')),
      };
    }

    components.push(component);
  }

  return components.sort((a, b) => a.name.localeCompare(b.name));
}
