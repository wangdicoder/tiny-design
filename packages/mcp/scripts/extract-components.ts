import * as fs from 'node:fs';
import * as path from 'node:path';
import { Project, type InterfaceDeclaration } from 'ts-morph';
import type { ComponentData, ComponentProp } from '../src/types';

const REACT_SRC = path.resolve(__dirname, '../../react/src');

// Category mapping from routers.tsx
const CATEGORY_MAP: Record<string, string> = {
  button: 'Foundation', icon: 'Foundation', image: 'Foundation',
  link: 'Foundation', typography: 'Foundation',

  'aspect-ratio': 'Layout', divider: 'Layout', flex: 'Layout',
  grid: 'Layout', layout: 'Layout', space: 'Layout', split: 'Layout',
  waterfall: 'Layout',

  anchor: 'Navigation', breadcrumb: 'Navigation', dropdown: 'Navigation',
  menu: 'Navigation', pagination: 'Navigation', 'speed-dial': 'Navigation',
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

function getDescription(componentDir: string): string {
  const mdPath = path.join(componentDir, 'index.md');
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

function getDemos(componentDir: string): { name: string; code: string }[] {
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
  // If the type is a simple identifier (a type alias reference), try to resolve it
  // from the same source file so we get the actual union/type text
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

function dirNameToComponentName(dirName: string): string {
  return dirName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function extractComponents(): ComponentData[] {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
  });

  const components: ComponentData[] = [];
  const dirs = fs.readdirSync(REACT_SRC, { withFileTypes: true });

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    if (dir.name.startsWith('_')) continue;

    const dirName = dir.name;
    const typesPath = path.join(REACT_SRC, dirName, 'types.ts');
    if (!fs.existsSync(typesPath)) continue;

    const category = CATEGORY_MAP[dirName];
    if (!category) continue;

    const sourceFile = project.addSourceFileAtPath(typesPath);
    const interfaces = sourceFile.getInterfaces();

    const componentName = dirNameToComponentName(dirName);
    // Try exact match first, then fall back to the first exported interface in the file
    const mainInterface =
      interfaces.find((i) => i.getName() === `${componentName}Props`) ??
      interfaces.find((i) => i.isExported() && i.getName().endsWith('Props'));

    if (!mainInterface) continue;

    const props = extractPropsFromInterface(mainInterface);

    const baseProps: ComponentProp[] = [
      { name: 'style', type: 'CSSProperties', required: false, description: 'Inline styles' },
      { name: 'className', type: 'string', required: false, description: 'CSS class name' },
      { name: 'prefixCls', type: 'string', required: false, description: 'CSS class prefix (default: "ty")' },
    ];

    const propNames = new Set(props.map((p) => p.name));
    const allProps = [...props, ...baseProps.filter((p) => !propNames.has(p.name))];

    components.push({
      name: componentName,
      category,
      description: getDescription(path.join(REACT_SRC, dirName)),
      props: allProps,
      demos: getDemos(path.join(REACT_SRC, dirName)),
    });
  }

  return components.sort((a, b) => a.name.localeCompare(b.name));
}
