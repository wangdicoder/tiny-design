import registryJson from '../../../../../../packages/tokens/dist/registry.json';

export interface RegistryToken {
  key: string;
  cssVar: string;
  category: 'semantic' | 'component';
  type: string;
  group: string;
  description?: string;
  source?: string;
  defaultValue: string;
  status?: string;
  aliases?: string[];
}

interface RegistryFile {
  version: number;
  generatedAt: string;
  tokens: RegistryToken[];
}

const registry = registryJson as RegistryFile;

export const STUDIO_TOKENS = registry.tokens.filter((token) => {
  const isSemantic = token.category === 'semantic';
  const isComponent = ['button.', 'input.', 'card.'].some((prefix) => token.key.startsWith(prefix));
  return isSemantic || isComponent;
});

export interface StudioGroup {
  id: string;
  title: string;
  description: string;
  match: (token: RegistryToken) => boolean;
}

export const STUDIO_GROUPS: StudioGroup[] = [
  {
    id: 'brand',
    title: 'Brand',
    description: 'Primary and status colors that define the personality of the system.',
    match: (token) =>
      token.category === 'semantic' &&
      /^(color-primary|color-info|color-success|color-warning|color-danger)/.test(token.key),
  },
  {
    id: 'surfaces',
    title: 'Surfaces',
    description: 'Backgrounds, borders, fill colors, and readable text tokens.',
    match: (token) =>
      token.category === 'semantic' &&
      (/^color-bg/.test(token.key) ||
        /^color-fill$/.test(token.key) ||
        /^color-border/.test(token.key) ||
        /^color-text/.test(token.key)),
  },
  {
    id: 'typography',
    title: 'Typography',
    description: 'Font families, scale, line height, and tracking.',
    match: (token) =>
      token.category === 'semantic' &&
      (/^font-/.test(token.key) || /^line-height/.test(token.key) || /^letter-spacing/.test(token.key)),
  },
  {
    id: 'shape',
    title: 'Shape & Size',
    description: 'Radius, heights, and spacing scale used across controls.',
    match: (token) =>
      token.category === 'semantic' &&
      (/^border-radius$/.test(token.key) || /^height-/.test(token.key) || /^spacing-/.test(token.key)),
  },
  {
    id: 'effects',
    title: 'Effects',
    description: 'Shadows and focus treatments.',
    match: (token) => token.category === 'semantic' && /^shadow/.test(token.key),
  },
  {
    id: 'button',
    title: 'Button',
    description: 'Button component tokens and interaction states.',
    match: (token) => token.key.startsWith('button.'),
  },
  {
    id: 'input',
    title: 'Input',
    description: 'Input surface, border, radius, and focus behavior.',
    match: (token) => token.key.startsWith('input.'),
  },
  {
    id: 'card',
    title: 'Card',
    description: 'Card elevation, radius, and slot paddings.',
    match: (token) => token.key.startsWith('card.'),
  },
];

export function getTokensForGroup(groupId: string): RegistryToken[] {
  const group = STUDIO_GROUPS.find((item) => item.id === groupId);
  return group ? STUDIO_TOKENS.filter(group.match) : STUDIO_TOKENS;
}

export function prettifyTokenLabel(key: string): string {
  return key
    .replace(/\./g, ' / ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
