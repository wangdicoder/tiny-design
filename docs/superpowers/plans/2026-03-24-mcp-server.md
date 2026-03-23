# @tiny-design/mcp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an MCP server package that exposes Tiny Design's 92 components, design tokens, and 244 icons to AI assistants via 6 tools over stdio.

**Architecture:** A build-time extraction script uses `ts-morph` to parse component types, regex to parse SCSS tokens, and fs reads for icon names — all output to static JSON in `src/data/`. At build time, `tsup` bundles the server code with inlined JSON imports into a single `dist/index.js`. This makes the published package fully self-contained.

**Note:** The spec defined token entries as `{ variable, cssVar }` but this plan uses `{ variable, value }` (raw SCSS values) which is more useful to AI assistants generating code.

**Tech Stack:** TypeScript, ts-morph, @modelcontextprotocol/sdk, tsup, tsx

**Spec:** `docs/superpowers/specs/2026-03-24-mcp-server-design.md`

---

## File Structure

```
packages/mcp/
├── package.json                    # Package config with bin, files, scripts
├── tsconfig.json                   # TypeScript config
├── .gitignore                      # Ignore src/data/ (generated JSON)
├── scripts/
│   ├── extract.ts                  # Main extraction orchestrator
│   ├── extract-components.ts       # Component props/demos extractor (ts-morph)
│   ├── extract-tokens.ts           # SCSS token extractor (regex)
│   └── extract-icons.ts            # Icon name extractor (fs)
├── src/
│   ├── index.ts                    # MCP server entry (stdio transport, tool registration)
│   ├── tools/
│   │   ├── components.ts           # list_components, get_component_props, get_component_example
│   │   ├── tokens.ts               # get_design_tokens
│   │   └── icons.ts                # list_icons, get_icon
│   ├── types.ts                    # Shared TypeScript types for JSON data shapes
│   └── data/                       # Generated at build time, gitignored
│       ├── components.json
│       ├── tokens.json
│       └── icons.json
└── __tests__/
    ├── extract-components.test.ts  # Tests for component extraction
    ├── extract-tokens.test.ts      # Tests for token extraction
    ├── extract-icons.test.ts       # Tests for icon extraction
    ├── tool-components.test.ts     # Tests for component tools
    ├── tool-tokens.test.ts         # Tests for token tools
    └── tool-icons.test.ts          # Tests for icon tools
```

---

## Task 1: Package Scaffolding

**Files:**
- Create: `packages/mcp/package.json`
- Create: `packages/mcp/tsconfig.json`
- Create: `packages/mcp/.gitignore`
- Create: `packages/mcp/src/types.ts`

- [ ] **Step 1: Create `packages/mcp/package.json`**

```json
{
  "name": "@tiny-design/mcp",
  "version": "1.6.0",
  "description": "MCP server for AI assistants to access the Tiny Design component library",
  "license": "MIT",
  "keywords": ["tiny-design", "mcp", "model-context-protocol", "ai"],
  "repository": {
    "type": "git",
    "url": "https://github.com/wangdicoder/tiny-design.git",
    "directory": "packages/mcp"
  },
  "author": "Di Wang<wangdicoder@gmail.com>",
  "publishConfig": {
    "access": "public"
  },
  "bin": {
    "tiny-design-mcp": "./dist/index.js"
  },
  "files": ["dist"],
  "type": "module",
  "scripts": {
    "extract": "tsx scripts/extract.ts",
    "build": "pnpm extract && tsup",
    "test": "jest"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.1"
  },
  "devDependencies": {
    "@types/jest": "^29.0.0",
    "@types/node": "^22.0.0",
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "ts-morph": "^25.0.0",
    "tsup": "^8.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create `packages/mcp/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": false,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": ".",
    "resolveJsonModule": true
  },
  "include": ["src/**/*", "scripts/**/*"],
  "exclude": ["node_modules", "dist", "__tests__"]
}
```

- [ ] **Step 3: Create `packages/mcp/.gitignore`**

```
src/data/
dist/
```

- [ ] **Step 4: Create `packages/mcp/src/types.ts`**

These are the data shapes for the extracted JSON files.

```typescript
export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ComponentDemo {
  name: string;
  code: string;
}

export interface ComponentData {
  name: string;
  category: string;
  description: string;
  props: ComponentProp[];
  demos: ComponentDemo[];
}

export interface TokenEntry {
  variable: string;
  value: string;
}

export interface TokenData {
  [category: string]: {
    [name: string]: TokenEntry;
  };
}

export interface IconData {
  props: {
    size: { type: string; default: string };
    color: { type: string; default: string };
  };
  icons: string[];
}
```

- [ ] **Step 5: Run `pnpm install` from the monorepo root**

Run: `pnpm install`
Expected: Lockfile updates, all dependencies installed including `@modelcontextprotocol/sdk` and `ts-morph`

- [ ] **Step 6: Commit**

```bash
git add packages/mcp/package.json packages/mcp/tsconfig.json packages/mcp/.gitignore packages/mcp/src/types.ts pnpm-lock.yaml
git commit -m "feat(mcp): scaffold @tiny-design/mcp package"
```

---

## Task 2: Icon Extractor

The simplest extractor — reads the barrel export `packages/icons/src/index.ts` and parses icon names from the export lines.

**Files:**
- Create: `packages/mcp/scripts/extract-icons.ts`
- Create: `packages/mcp/__tests__/extract-icons.test.ts`

- [ ] **Step 1: Write the test**

```typescript
// packages/mcp/__tests__/extract-icons.test.ts
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
```

- [ ] **Step 2: Verify test fails**

Run: `cd packages/mcp && npx jest __tests__/extract-icons.test.ts`
Expected: FAIL — Cannot find module `'../scripts/extract-icons'`

- [ ] **Step 3: Implement the extractor**

```typescript
// packages/mcp/scripts/extract-icons.ts
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { IconData } from '../src/types';

const ICONS_INDEX = path.resolve(__dirname, '../../icons/src/index.ts');

export function extractIcons(): IconData {
  const content = fs.readFileSync(ICONS_INDEX, 'utf-8');

  const icons: string[] = [];
  const exportRegex = /export\s*\{\s*(\w+)\s*\}/g;
  let match: RegExpExecArray | null;

  while ((match = exportRegex.exec(content)) !== null) {
    const name = match[1];
    // Skip the IconProps type export
    if (name !== 'IconProps') {
      icons.push(name);
    }
  }

  return {
    props: {
      size: { type: 'string | number', default: '"1em"' },
      color: { type: 'string', default: '"currentColor"' },
    },
    icons,
  };
}
```

- [ ] **Step 4: Add jest config for the mcp package**

Create `packages/mcp/jest.config.js`:

```javascript
/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd packages/mcp && npx jest __tests__/extract-icons.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add packages/mcp/scripts/extract-icons.ts packages/mcp/__tests__/extract-icons.test.ts packages/mcp/jest.config.js
git commit -m "feat(mcp): add icon extractor"
```

---

## Task 3: Token Extractor

Parses `packages/tokens/scss/_variables.scss` with regex to extract SCSS variable names and values, grouped by category.

**Files:**
- Create: `packages/mcp/scripts/extract-tokens.ts`
- Create: `packages/mcp/__tests__/extract-tokens.test.ts`

- [ ] **Step 1: Write the test**

```typescript
// packages/mcp/__tests__/extract-tokens.test.ts
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
```

- [ ] **Step 2: Verify test fails**

Run: `cd packages/mcp && npx jest __tests__/extract-tokens.test.ts`
Expected: FAIL — Cannot find module

- [ ] **Step 3: Implement the extractor**

```typescript
// packages/mcp/scripts/extract-tokens.ts
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { TokenData } from '../src/types';

const VARIABLES_PATH = path.resolve(__dirname, '../../tokens/scss/_variables.scss');

// Map variable name prefixes to categories
const CATEGORY_RULES: Array<{ test: (name: string) => boolean; category: string }> = [
  { test: (n) => /^(box-)?shadow/.test(n), category: 'shadows' },
  { test: (n) => /^size-(xs|sm|md|lg|xl|xxl)$/.test(n), category: 'breakpoints' },
  { test: (n) => /^(font|line-height|heading|h\d-)/.test(n), category: 'typography' },
  { test: (n) => /^(spacer|height-)/.test(n), category: 'spacing' },
  {
    test: (n) =>
      /color$/.test(n) ||
      /^(white|black|gray|red|orange|yellow|green|teal|cyan|blue|indigo|purple|magenta)-/.test(n) ||
      /^(info|success|warning|danger|primary)-/.test(n) ||
      /^(body-bg|body-color)/.test(n),
    category: 'colors',
  },
];

function categorize(name: string): string | null {
  for (const rule of CATEGORY_RULES) {
    if (rule.test(name)) return rule.category;
  }
  return null;
}

export function extractTokens(): TokenData {
  const content = fs.readFileSync(VARIABLES_PATH, 'utf-8');
  const result: TokenData = {
    colors: {},
    typography: {},
    spacing: {},
    breakpoints: {},
    shadows: {},
  };

  // Match SCSS variable declarations: $name: value !default;
  const varRegex = /^\$([a-z0-9-]+):\s*(.+?)\s*!default\s*;/gm;
  let match: RegExpExecArray | null;

  while ((match = varRegex.exec(content)) !== null) {
    const name = match[1];
    const value = match[2];
    const category = categorize(name);

    if (category) {
      result[category][name] = {
        variable: `$${name}`,
        value,
      };
    }
  }

  return result;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/mcp && npx jest __tests__/extract-tokens.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/mcp/scripts/extract-tokens.ts packages/mcp/__tests__/extract-tokens.test.ts
git commit -m "feat(mcp): add token extractor"
```

---

## Task 4: Component Extractor

The most complex extractor — uses `ts-morph` to parse `types.ts` files, reads demo files, and extracts descriptions from `index.md`.

**Files:**
- Create: `packages/mcp/scripts/extract-components.ts`
- Create: `packages/mcp/__tests__/extract-components.test.ts`

- [ ] **Step 1: Write the test**

```typescript
// packages/mcp/__tests__/extract-components.test.ts
import { extractComponents } from '../scripts/extract-components';

describe('extractComponents', () => {
  // Run extraction once for all tests (it's slow with ts-morph)
  let components: ReturnType<typeof extractComponents>;

  beforeAll(() => {
    components = extractComponents();
  });

  it('extracts all components', () => {
    expect(components.length).toBeGreaterThan(80);
  });

  it('extracts Button component correctly', () => {
    const button = components.find((c) => c.name === 'Button');
    expect(button).toBeDefined();
    expect(button!.category).toBe('Foundation');
    expect(button!.description).toBe('To trigger an operation.');

    // Check specific props
    const btnType = button!.props.find((p) => p.name === 'btnType');
    expect(btnType).toBeDefined();
    expect(btnType!.required).toBe(false);
    expect(btnType!.type).toContain('primary');

    // Should have BaseProps (style, className, prefixCls)
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
```

- [ ] **Step 2: Verify test fails**

Run: `cd packages/mcp && npx jest __tests__/extract-components.test.ts`
Expected: FAIL — Cannot find module

- [ ] **Step 3: Implement the extractor**

```typescript
// packages/mcp/scripts/extract-components.ts
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Project, SyntaxKind, type InterfaceDeclaration } from 'ts-morph';
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

  // Find the first non-empty line after the first heading
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

function extractPropsFromInterface(iface: InterfaceDeclaration): ComponentProp[] {
  const props: ComponentProp[] = [];

  for (const prop of iface.getProperties()) {
    const name = prop.getName();
    const typeNode = prop.getTypeNode();
    const typeText = typeNode ? typeNode.getText() : prop.getType().getText(prop);
    const isOptional = prop.hasQuestionToken();

    // Get JSDoc comment if present
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
    tsConfigFilePath: path.resolve(REACT_SRC, '../../tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });

  const components: ComponentData[] = [];
  const dirs = fs.readdirSync(REACT_SRC, { withFileTypes: true });

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    if (dir.name.startsWith('_')) continue; // Skip _utils, _hooks, etc.

    const dirName = dir.name;
    const typesPath = path.join(REACT_SRC, dirName, 'types.ts');
    if (!fs.existsSync(typesPath)) continue;

    const category = CATEGORY_MAP[dirName];
    if (!category) continue; // Skip internal components not in the docs router

    const sourceFile = project.addSourceFileAtPath(typesPath);
    const interfaces = sourceFile.getInterfaces();

    // Find the main Props interface (the one ending with "Props" that matches the component name)
    const componentName = dirNameToComponentName(dirName);
    const mainInterface = interfaces.find(
      (i) => i.getName() === `${componentName}Props`
    );

    if (!mainInterface) continue;

    const props = extractPropsFromInterface(mainInterface);

    // Also extract props from extended BaseProps
    const baseProps: ComponentProp[] = [
      { name: 'style', type: 'CSSProperties', required: false, description: 'Inline styles' },
      { name: 'className', type: 'string', required: false, description: 'CSS class name' },
      { name: 'prefixCls', type: 'string', required: false, description: 'CSS class prefix (default: "ty")' },
    ];

    // Merge: component-specific props first, then BaseProps (skip duplicates)
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/mcp && npx jest __tests__/extract-components.test.ts --testTimeout=30000`
Expected: PASS (may take ~10-15s due to ts-morph parsing)

- [ ] **Step 5: Commit**

```bash
git add packages/mcp/scripts/extract-components.ts packages/mcp/__tests__/extract-components.test.ts
git commit -m "feat(mcp): add component extractor with ts-morph"
```

---

## Task 5: Extraction Orchestrator

Ties the three extractors together and writes JSON to `src/data/`.

**Files:**
- Create: `packages/mcp/scripts/extract.ts`

- [ ] **Step 1: Implement the orchestrator**

```typescript
// packages/mcp/scripts/extract.ts
import * as fs from 'node:fs';
import * as path from 'node:path';
import { extractComponents } from './extract-components';
import { extractTokens } from './extract-tokens';
import { extractIcons } from './extract-icons';

const DATA_DIR = path.resolve(__dirname, '../src/data');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeJson(filename: string, data: unknown) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  wrote ${filePath}`);
}

console.log('Extracting Tiny Design data...');
ensureDir(DATA_DIR);

console.log('  extracting components...');
writeJson('components.json', extractComponents());

console.log('  extracting tokens...');
writeJson('tokens.json', extractTokens());

console.log('  extracting icons...');
writeJson('icons.json', extractIcons());

console.log('Done.');
```

- [ ] **Step 2: Run extraction to verify**

Run: `cd packages/mcp && npx tsx scripts/extract.ts`
Expected: Outputs three JSON files in `src/data/`, logs success. Verify `src/data/components.json` has 80+ entries, `src/data/icons.json` has 200+ icon names.

- [ ] **Step 3: Commit**

```bash
git add packages/mcp/scripts/extract.ts
git commit -m "feat(mcp): add extraction orchestrator"
```

---

## Task 6: MCP Tool Handlers — Components

**Files:**
- Create: `packages/mcp/src/tools/components.ts`
- Create: `packages/mcp/__tests__/tool-components.test.ts`

- [ ] **Step 1: Write the tests**

```typescript
// packages/mcp/__tests__/tool-components.test.ts
import { listComponents, getComponentProps, getComponentExample } from '../src/tools/components';

describe('listComponents', () => {
  it('returns all components', () => {
    const result = listComponents();
    expect(result.length).toBeGreaterThan(80);
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('category');
    expect(result[0]).toHaveProperty('description');
    // Should NOT have props or demos (lightweight listing)
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
```

- [ ] **Step 2: Verify test fails**

Run: `cd packages/mcp && npx jest __tests__/tool-components.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement the tool handlers**

```typescript
// packages/mcp/src/tools/components.ts
import type { ComponentData } from '../types';
import componentsData from '../data/components.json';

function loadComponents(): ComponentData[] {
  return componentsData as ComponentData[];
}

export function listComponents(category?: string) {
  const components = loadComponents();
  const filtered = category
    ? components.filter((c) => c.category === category)
    : components;

  return filtered.map(({ name, category, description }) => ({
    name,
    category,
    description,
  }));
}

export function getComponentProps(name: string) {
  const components = loadComponents();
  const component = components.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  if (!component) return null;

  return {
    name: component.name,
    category: component.category,
    description: component.description,
    props: component.props,
  };
}

export function getComponentExample(name: string, demo?: string) {
  const components = loadComponents();
  const component = components.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  if (!component) return null;

  if (demo) {
    const found = component.demos.filter(
      (d) => d.name.toLowerCase() === demo.toLowerCase()
    );
    return found.length > 0 ? found : null;
  }

  return component.demos;
}
```

- [ ] **Step 4: Make sure extracted data exists, then run tests**

Run: `cd packages/mcp && npx tsx scripts/extract.ts && npx jest __tests__/tool-components.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/mcp/src/tools/components.ts packages/mcp/__tests__/tool-components.test.ts
git commit -m "feat(mcp): add component tool handlers"
```

---

## Task 7: MCP Tool Handlers — Tokens

**Files:**
- Create: `packages/mcp/src/tools/tokens.ts`
- Create: `packages/mcp/__tests__/tool-tokens.test.ts`

- [ ] **Step 1: Write the tests**

```typescript
// packages/mcp/__tests__/tool-tokens.test.ts
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
```

- [ ] **Step 2: Verify test fails**

Run: `cd packages/mcp && npx jest __tests__/tool-tokens.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement the handler**

```typescript
// packages/mcp/src/tools/tokens.ts
import type { TokenData } from '../types';
import tokensData from '../data/tokens.json';

function loadTokens(): TokenData {
  return tokensData as TokenData;
}

export function getDesignTokens(category?: string): TokenData {
  const tokens = loadTokens();

  if (category) {
    if (!(category in tokens)) return {} as TokenData;
    return { [category]: tokens[category] } as TokenData;
  }

  return tokens;
}
```

- [ ] **Step 4: Run tests**

Run: `cd packages/mcp && npx jest __tests__/tool-tokens.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/mcp/src/tools/tokens.ts packages/mcp/__tests__/tool-tokens.test.ts
git commit -m "feat(mcp): add token tool handler"
```

---

## Task 8: MCP Tool Handlers — Icons

**Files:**
- Create: `packages/mcp/src/tools/icons.ts`
- Create: `packages/mcp/__tests__/tool-icons.test.ts`

- [ ] **Step 1: Write the tests**

```typescript
// packages/mcp/__tests__/tool-icons.test.ts
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
```

- [ ] **Step 2: Verify test fails**

Run: `cd packages/mcp && npx jest __tests__/tool-icons.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement the handler**

```typescript
// packages/mcp/src/tools/icons.ts
import type { IconData } from '../types';
import iconsData from '../data/icons.json';

function loadIcons(): IconData {
  return iconsData as IconData;
}

export function listIcons(search?: string): string[] {
  const data = loadIcons();

  if (search) {
    const term = search.toLowerCase();
    return data.icons.filter((name) => name.toLowerCase().includes(term));
  }

  return data.icons;
}

export function getIcon(name: string) {
  const data = loadIcons();
  const icon = data.icons.find(
    (i) => i.toLowerCase() === name.toLowerCase()
  );

  if (!icon) return null;

  return {
    name: icon,
    props: data.props,
    usage: `import { ${icon} } from '@tiny-design/icons';\n\n<${icon} size={24} color="#6e41bf" />`,
  };
}
```

- [ ] **Step 4: Run tests**

Run: `cd packages/mcp && npx jest __tests__/tool-icons.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/mcp/src/tools/icons.ts packages/mcp/__tests__/tool-icons.test.ts
git commit -m "feat(mcp): add icon tool handlers"
```

---

## Task 9: MCP Server Entry Point

Wires all tool handlers into an MCP server using `@modelcontextprotocol/sdk` with stdio transport.

**Files:**
- Create: `packages/mcp/src/index.ts`

- [ ] **Step 1: Implement the MCP server**

```typescript
// packages/mcp/src/index.ts
// Note: shebang is added by tsup via banner config — do NOT add #!/usr/bin/env node here
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { listComponents, getComponentProps, getComponentExample } from './tools/components';
import { getDesignTokens } from './tools/tokens';
import { listIcons, getIcon } from './tools/icons';

const server = new McpServer({
  name: '@tiny-design/mcp',
  version: '1.6.0',
});

// --- Component tools ---

server.tool(
  'list_components',
  'List all Tiny Design components. Optionally filter by category: Foundation, Layout, Navigation, Data Display, Form, Feedback, Miscellany.',
  { category: z.string().optional().describe('Filter by component category') },
  async ({ category }) => ({
    content: [{ type: 'text', text: JSON.stringify(listComponents(category), null, 2) }],
  })
);

server.tool(
  'get_component_props',
  'Get the full props interface for a Tiny Design component, including types, required flags, and descriptions.',
  { name: z.string().describe('Component name (e.g., "Button", "Modal", "Select")') },
  async ({ name }) => {
    const result = getComponentProps(name);
    if (!result) {
      return { content: [{ type: 'text', text: `Component "${name}" not found.` }] };
    }
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  'get_component_example',
  'Get usage examples (demo code) for a Tiny Design component.',
  {
    name: z.string().describe('Component name (e.g., "Button")'),
    demo: z.string().optional().describe('Specific demo name (e.g., "Type", "Size"). Returns all demos if omitted.'),
  },
  async ({ name, demo }) => {
    const result = getComponentExample(name, demo);
    if (!result) {
      return { content: [{ type: 'text', text: `Component "${name}" not found.` }] };
    }
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Token tools ---

server.tool(
  'get_design_tokens',
  'Get Tiny Design design tokens (SCSS variables). Categories: colors, typography, spacing, breakpoints, shadows.',
  { category: z.string().optional().describe('Token category to filter by') },
  async ({ category }) => ({
    content: [{ type: 'text', text: JSON.stringify(getDesignTokens(category), null, 2) }],
  })
);

// --- Icon tools ---

server.tool(
  'list_icons',
  'List all Tiny Design icon names. Optionally filter by search term.',
  { search: z.string().optional().describe('Search term to filter icons (e.g., "arrow", "close")') },
  async ({ search }) => ({
    content: [{ type: 'text', text: JSON.stringify(listIcons(search), null, 2) }],
  })
);

server.tool(
  'get_icon',
  'Get details for a specific Tiny Design icon, including props and usage example.',
  { name: z.string().describe('Icon name (e.g., "IconPlus", "IconClose")') },
  async ({ name }) => {
    const result = getIcon(name);
    if (!result) {
      return { content: [{ type: 'text', text: `Icon "${name}" not found.` }] };
    }
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Start server ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

Note: `zod` is bundled with `@modelcontextprotocol/sdk` — no separate dependency needed.

- [ ] **Step 2: Create tsup config**

Create `packages/mcp/tsup.config.ts`:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  outDir: 'dist',
  clean: true,
  banner: { js: '#!/usr/bin/env node' },
  // Bundle JSON data files into the output so the package is self-contained
  loader: { '.json': 'json' },
});
```

- [ ] **Step 3: Build and verify the server starts**

Run: `cd packages/mcp && npx tsx scripts/extract.ts && npx tsup`
Expected: Builds `dist/index.js` successfully.

Then test that the server starts (it will hang waiting for stdio input — just verify no crash):
Run: `cd packages/mcp && echo '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}},"id":1}' | timeout 5 node dist/index.js || true`
Expected: JSON response with server info (or timeout, which is fine — means it started).

- [ ] **Step 4: Commit**

```bash
git add packages/mcp/src/index.ts packages/mcp/tsup.config.ts
git commit -m "feat(mcp): add MCP server entry point with 6 tools"
```

---

## Task 10: Build Integration & Final Verification

Wire the MCP package into the monorepo's turborepo pipeline and verify the full build.

**Files:**
- Modify: `pnpm-workspace.yaml` (if `packages/mcp` not already included)
- Verify: `turbo.json` (existing `^build` dependency is sufficient)

- [ ] **Step 1: Verify `pnpm-workspace.yaml` includes `packages/mcp`**

Read `pnpm-workspace.yaml` — it should have `packages/*` which already covers `packages/mcp`. If it uses explicit paths, add `packages/mcp`.

- [ ] **Step 2: Run the full build from monorepo root**

Run: `pnpm build`
Expected: turborepo builds tokens → react + icons → mcp in order. MCP package runs extract then tsup.

- [ ] **Step 3: Run all MCP tests**

Run: `cd packages/mcp && npx jest`
Expected: All tests pass.

- [ ] **Step 4: Verify the binary works**

Run: `cd packages/mcp && node dist/index.js --help 2>&1 || echo '{"jsonrpc":"2.0","method":"tools/list","id":2}' | node dist/index.js 2>/dev/null | head -1`
Expected: Shows the tool list or server output.

- [ ] **Step 5: Commit**

```bash
git add packages/mcp/ pnpm-lock.yaml pnpm-workspace.yaml
git commit -m "feat(mcp): wire @tiny-design/mcp into monorepo build pipeline"
```
