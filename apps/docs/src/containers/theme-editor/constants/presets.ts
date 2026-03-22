export interface ThemePreset {
  id: string;
  name: string;
  nameZh: string;
  seeds: Record<string, string>;
  swatches: string[];
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
    swatches: ['#14b8a6', '#06b6d4', '#f0fdfa', '#b2dfdb'],
  },
];
