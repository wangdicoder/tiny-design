export interface ThemePreset {
  id: string;
  name: string;
  nameZh: string;
  /** Light-mode seed overrides */
  seeds: Record<string, string>;
  /** Dark-mode seed overrides (if omitted, only non-color seeds from `seeds` are used) */
  darkSeeds?: Record<string, string>;
  swatches: string[];
}

/** Keys that are safe to use in both light and dark modes (non-color) */
const NON_COLOR_KEYS = new Set([
  'border-radius',
  'font-weight',
  'font-size-base',
  'font-size-sm',
  'font-size-lg',
  'line-height-base',
  'headings-font-weight',
  'height-sm',
  'height-md',
  'height-lg',
  'spacer',
]);

/**
 * Given a preset and the current mode, return the seeds to apply.
 */
export function getPresetSeeds(
  preset: ThemePreset,
  isDark: boolean
): Record<string, string> {
  if (!isDark) return preset.seeds;

  // Dark mode: use darkSeeds if provided, otherwise only use non-color seeds
  if (preset.darkSeeds) return preset.darkSeeds;

  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(preset.seeds)) {
    if (NON_COLOR_KEYS.has(key)) {
      result[key] = value;
    }
  }
  return result;
}

export const PRESETS: ThemePreset[] = [
  {
    id: 'default',
    name: 'Default Purple',
    nameZh: '默认紫',
    seeds: {},
    swatches: ['#6e41bf', '#f3eefa', '#ffffff', '#d9d9d9'],
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    nameZh: '海洋蓝',
    seeds: {
      'color-primary': '#1677ff',
      'border-radius': '6px',
    },
    darkSeeds: {
      'color-primary': '#3b8eff',
      'border-radius': '6px',
    },
    swatches: ['#1677ff', '#e6f4ff', '#ffffff', '#d9d9d9'],
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    nameZh: '森林绿',
    seeds: {
      'color-primary': '#389e0d',
      'color-bg': '#fafff5',
      'border-radius': '4px',
    },
    darkSeeds: {
      'color-primary': '#52c41a',
      'color-bg': '#0f1a0a',
      'color-text': 'rgba(220, 255, 200, 0.85)',
      'color-border': '#2d4a1e',
      'border-radius': '4px',
    },
    swatches: ['#389e0d', '#f6ffed', '#fafff5', '#d9d9d9'],
  },
  {
    id: 'sunset-horizon',
    name: 'Sunset Horizon',
    nameZh: '落日余晖',
    seeds: {
      'color-primary': '#fa8c16',
      'color-bg': '#fffcf5',
      'border-radius': '6px',
    },
    darkSeeds: {
      'color-primary': '#faad14',
      'color-bg': '#1a1510',
      'color-text': 'rgba(255, 235, 200, 0.85)',
      'color-border': '#4a3a1e',
      'border-radius': '6px',
    },
    swatches: ['#fa8c16', '#fff7e6', '#fffcf5', '#e8d5b5'],
  },
  {
    id: 'rose',
    name: 'Rose',
    nameZh: '玫瑰',
    seeds: {
      'color-primary': '#f43f5e',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#fb7185',
      'border-radius': '8px',
    },
    swatches: ['#f43f5e', '#fff1f2', '#ffffff', '#e5d5d8'],
  },
  {
    id: 'violet-bloom',
    name: 'Violet Bloom',
    nameZh: '紫罗兰',
    seeds: {
      'color-primary': '#8b5cf6',
      'color-bg': '#faf8ff',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#a78bfa',
      'color-bg': '#110e1a',
      'color-text': 'rgba(220, 210, 255, 0.85)',
      'color-border': '#3d2e6e',
      'border-radius': '8px',
    },
    swatches: ['#8b5cf6', '#f0ebff', '#faf8ff', '#ddd6f3'],
  },
  {
    id: 'slate-mono',
    name: 'Slate',
    nameZh: '石板灰',
    seeds: {
      'color-primary': '#475569',
      'color-border': '#cbd5e1',
      'border-radius': '4px',
    },
    darkSeeds: {
      'color-primary': '#94a3b8',
      'color-border': '#334155',
      'border-radius': '4px',
    },
    swatches: ['#475569', '#f1f5f9', '#ffffff', '#cbd5e1'],
  },
  {
    id: 'indigo-night',
    name: 'Indigo Night',
    nameZh: '靛蓝之夜',
    seeds: {
      'color-primary': '#6366f1',
      'border-radius': '6px',
    },
    darkSeeds: {
      'color-primary': '#818cf8',
      'border-radius': '6px',
    },
    swatches: ['#6366f1', '#eef2ff', '#ffffff', '#c7d2fe'],
  },
  {
    id: 'mocha-mousse',
    name: 'Mocha Mousse',
    nameZh: '摩卡慕斯',
    seeds: {
      'color-primary': '#8B6F4E',
      'color-bg': '#fdf8f3',
      'color-text': 'rgba(60, 40, 20, 0.85)',
      'color-border': '#d4c4b0',
      'border-radius': '6px',
    },
    darkSeeds: {
      'color-primary': '#b8956a',
      'color-bg': '#1a150f',
      'color-text': 'rgba(230, 210, 180, 0.85)',
      'color-border': '#4a3d2e',
      'border-radius': '6px',
    },
    swatches: ['#8B6F4E', '#f5ebe0', '#fdf8f3', '#d4c4b0'],
  },
  {
    id: 'vintage-paper',
    name: 'Vintage Paper',
    nameZh: '复古纸张',
    seeds: {
      'color-primary': '#7c6f5b',
      'color-bg': '#faf6ef',
      'color-text': 'rgba(50, 40, 30, 0.85)',
      'color-border': '#d5ccbb',
      'border-radius': '2px',
      'font-weight': '400',
    },
    darkSeeds: {
      'color-primary': '#a8977d',
      'color-bg': '#18150f',
      'color-text': 'rgba(225, 215, 195, 0.85)',
      'color-border': '#453e30',
      'border-radius': '2px',
      'font-weight': '400',
    },
    swatches: ['#7c6f5b', '#f0e8d8', '#faf6ef', '#d5ccbb'],
  },
  {
    id: 'soft-pop',
    name: 'Soft Pop',
    nameZh: '柔和流行',
    seeds: {
      'color-primary': '#06b6d4',
      'color-success': '#10b981',
      'color-warning': '#f59e0b',
      'color-danger': '#ef4444',
      'border-radius': '12px',
    },
    darkSeeds: {
      'color-primary': '#22d3ee',
      'color-success': '#34d399',
      'color-warning': '#fbbf24',
      'color-danger': '#f87171',
      'border-radius': '12px',
    },
    swatches: ['#06b6d4', '#10b981', '#f59e0b', '#ef4444'],
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights',
    nameZh: '北极光',
    seeds: {
      'color-primary': '#14b8a6',
      'color-bg': '#f0fdfa',
      'color-info': '#06b6d4',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#2dd4bf',
      'color-bg': '#0a1a17',
      'color-info': '#22d3ee',
      'color-border': '#1e4a40',
      'border-radius': '8px',
    },
    swatches: ['#14b8a6', '#06b6d4', '#f0fdfa', '#b2dfdb'],
  },
];
