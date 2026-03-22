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
    id: 'modern-minimal',
    name: 'Modern Minimal',
    nameZh: '现代简约',
    seeds: {
      'color-primary': '#3b82f6',
      'border-radius': '6px',
    },
    darkSeeds: {
      'color-primary': '#3b82f6',
      'border-radius': '6px',
    },
    swatches: ['#3b82f6', '#e5e7eb', '#ffffff', '#333333'],
  },
  {
    id: 'violet-bloom',
    name: 'Violet Bloom',
    nameZh: '紫罗兰',
    seeds: {
      'color-primary': '#7033ff',
      'color-bg': '#fdfdfd',
      'border-radius': '22px',
    },
    darkSeeds: {
      'color-primary': '#8c5cff',
      'border-radius': '22px',
    },
    swatches: ['#7033ff', '#8c5cff', '#fdfdfd', '#e7e7ee'],
  },
  {
    id: 't3-chat',
    name: 'T3 Chat',
    nameZh: 'T3 聊天',
    seeds: {
      'color-primary': '#a84370',
      'color-bg': '#faf5fa',
      'color-text': 'rgba(80, 24, 84, 0.85)',
      'color-border': '#efbdeb',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#a3004c',
      'color-bg': '#221d27',
      'color-text': 'rgba(210, 196, 222, 0.85)',
      'color-border': '#3b3237',
      'border-radius': '8px',
    },
    swatches: ['#a84370', '#efbdeb', '#faf5fa', '#501854'],
  },
  {
    id: 'twitter',
    name: 'Twitter',
    nameZh: '推特蓝',
    seeds: {
      'color-primary': '#1e9df1',
      'border-radius': '20px',
    },
    darkSeeds: {
      'color-primary': '#1c9cf0',
      'border-radius': '20px',
    },
    swatches: ['#1e9df1', '#e1eaef', '#ffffff', '#0f1419'],
  },
  {
    id: 'mocha-mousse',
    name: 'Mocha Mousse',
    nameZh: '摩卡慕斯',
    seeds: {
      'color-primary': '#A37764',
      'color-bg': '#F1F0E5',
      'color-text': 'rgba(86, 69, 63, 0.85)',
      'color-border': '#BAAB92',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#C39E88',
      'color-bg': '#2d2521',
      'color-text': 'rgba(241, 240, 229, 0.85)',
      'color-border': '#56453F',
      'border-radius': '8px',
    },
    swatches: ['#A37764', '#BAAB92', '#F1F0E5', '#56453F'],
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    nameZh: '卡布奇诺',
    seeds: {
      'color-primary': '#8839ef',
      'color-bg': '#eff1f5',
      'color-text': 'rgba(76, 79, 105, 0.88)',
      'color-border': '#bcc0cc',
      'color-danger': '#d20f39',
      'border-radius': '6px',
    },
    darkSeeds: {
      'color-primary': '#cba6f7',
      'color-bg': '#181825',
      'color-text': 'rgba(205, 214, 244, 0.88)',
      'color-border': '#313244',
      'color-danger': '#f38ba8',
      'border-radius': '6px',
    },
    swatches: ['#8839ef', '#cba6f7', '#eff1f5', '#bcc0cc'],
  },
  {
    id: 'perpetuity',
    name: 'Perpetuity',
    nameZh: '永恒青',
    seeds: {
      'color-primary': '#06858e',
      'color-bg': '#e8f0f0',
      'color-text': 'rgba(10, 74, 85, 0.88)',
      'color-border': '#cde0e2',
      'border-radius': '2px',
    },
    darkSeeds: {
      'color-primary': '#4de8e8',
      'color-bg': '#0a1a20',
      'color-text': 'rgba(77, 232, 232, 0.85)',
      'color-border': '#164955',
      'border-radius': '2px',
    },
    swatches: ['#06858e', '#4de8e8', '#e8f0f0', '#cde0e2'],
  },
  {
    id: 'cosmic-night',
    name: 'Cosmic Night',
    nameZh: '星夜紫',
    seeds: {
      'color-primary': '#6e56cf',
      'color-bg': '#f5f5ff',
      'color-text': 'rgba(42, 42, 74, 0.88)',
      'color-border': '#e0e0f0',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#a48fff',
      'color-bg': '#0f0f1a',
      'color-text': 'rgba(226, 226, 245, 0.88)',
      'color-border': '#303052',
      'border-radius': '8px',
    },
    swatches: ['#6e56cf', '#a48fff', '#f5f5ff', '#e0e0f0'],
  },
  {
    id: 'tangerine',
    name: 'Tangerine',
    nameZh: '橘子橙',
    seeds: {
      'color-primary': '#e05d38',
      'color-bg': '#e8ebed',
      'color-border': '#dcdfe2',
      'border-radius': '12px',
    },
    darkSeeds: {
      'color-primary': '#e05d38',
      'color-bg': '#1c2433',
      'color-border': '#3d4354',
      'border-radius': '12px',
    },
    swatches: ['#e05d38', '#dcdfe2', '#e8ebed', '#333333'],
  },
  {
    id: 'nature',
    name: 'Nature',
    nameZh: '自然绿',
    seeds: {
      'color-primary': '#2e7d32',
      'color-bg': '#f8f5f0',
      'color-text': 'rgba(62, 39, 35, 0.88)',
      'color-border': '#e0d6c9',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#4caf50',
      'color-bg': '#1c2a1f',
      'color-text': 'rgba(240, 235, 229, 0.88)',
      'color-border': '#3e4a3d',
      'border-radius': '8px',
    },
    swatches: ['#2e7d32', '#4caf50', '#f8f5f0', '#e0d6c9'],
  },
  {
    id: 'bold-tech',
    name: 'Bold Tech',
    nameZh: '科技紫',
    seeds: {
      'color-primary': '#8b5cf6',
      'color-text': 'rgba(49, 46, 129, 0.88)',
      'color-border': '#e0e7ff',
      'border-radius': '10px',
    },
    darkSeeds: {
      'color-primary': '#8b5cf6',
      'color-bg': '#0f172a',
      'color-text': 'rgba(224, 231, 255, 0.88)',
      'color-border': '#2e1065',
      'border-radius': '10px',
    },
    swatches: ['#8b5cf6', '#e0e7ff', '#ffffff', '#312e81'],
  },
  {
    id: 'elegant-luxury',
    name: 'Elegant Luxury',
    nameZh: '奢华红',
    seeds: {
      'color-primary': '#9b2c2c',
      'color-bg': '#faf7f5',
      'color-border': '#f5e8d2',
      'border-radius': '6px',
    },
    darkSeeds: {
      'color-primary': '#b91c1c',
      'color-bg': '#1c1917',
      'color-border': '#44403c',
      'border-radius': '6px',
    },
    swatches: ['#9b2c2c', '#f5e8d2', '#faf7f5', '#1a1a1a'],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    nameZh: '赛博朋克',
    seeds: {
      'color-primary': '#ff00c8',
      'color-danger': '#ff3d00',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#ff00c8',
      'color-bg': '#0c0c1d',
      'color-text': 'rgba(236, 239, 244, 0.88)',
      'color-border': '#2e2e5e',
      'color-danger': '#ff3d00',
      'border-radius': '8px',
    },
    swatches: ['#ff00c8', '#ff3d00', '#f8f9fa', '#0c0c1d'],
  },
  {
    id: 'pastel-dreams',
    name: 'Pastel Dreams',
    nameZh: '梦幻粉彩',
    seeds: {
      'color-primary': '#a78bfa',
      'color-bg': '#f7f3f9',
      'color-border': '#e9d8fd',
      'border-radius': '24px',
    },
    darkSeeds: {
      'color-primary': '#c0aafd',
      'color-bg': '#1c1917',
      'color-text': 'rgba(224, 231, 255, 0.88)',
      'color-border': '#3f324a',
      'border-radius': '24px',
    },
    swatches: ['#a78bfa', '#c0aafd', '#f7f3f9', '#e9d8fd'],
  },
  {
    id: 'caffeine',
    name: 'Caffeine',
    nameZh: '咖啡因',
    seeds: {
      'color-primary': '#644a40',
      'color-border': '#d8d8d8',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#ffe0c2',
      'color-border': '#201e18',
      'border-radius': '8px',
    },
    swatches: ['#644a40', '#ffe0c2', '#f9f9f9', '#d8d8d8'],
  },
  {
    id: 'sunset-horizon',
    name: 'Sunset Horizon',
    nameZh: '落日余晖',
    seeds: {
      'color-primary': '#ff7e5f',
      'color-bg': '#fff9f5',
      'color-border': '#ffe0d6',
      'border-radius': '10px',
    },
    darkSeeds: {
      'color-primary': '#ff7e5f',
      'color-bg': '#2a2024',
      'color-text': 'rgba(242, 233, 228, 0.88)',
      'color-border': '#463a41',
      'border-radius': '10px',
    },
    swatches: ['#ff7e5f', '#ffe0d6', '#fff9f5', '#3d3436'],
  },
  {
    id: 'claude',
    name: 'Claude',
    nameZh: 'Claude',
    seeds: {
      'color-primary': '#c96442',
      'color-bg': '#faf9f5',
      'color-text': 'rgba(61, 57, 41, 0.88)',
      'color-border': '#dad9d4',
      'border-radius': '8px',
    },
    darkSeeds: {
      'color-primary': '#d97757',
      'color-bg': '#262624',
      'color-text': 'rgba(195, 192, 182, 0.88)',
      'color-border': '#3e3e38',
      'border-radius': '8px',
    },
    swatches: ['#c96442', '#d97757', '#faf9f5', '#dad9d4'],
  },
  {
    id: 'kodama-grove',
    name: 'Kodama Grove',
    nameZh: '树灵之林',
    seeds: {
      'color-primary': '#8d9d4f',
      'color-bg': '#e4d7b0',
      'color-text': 'rgba(92, 75, 62, 0.88)',
      'color-border': '#b19681',
      'border-radius': '7px',
    },
    darkSeeds: {
      'color-primary': '#8a9f7b',
      'color-bg': '#3a3529',
      'color-text': 'rgba(237, 228, 212, 0.88)',
      'color-border': '#5a5345',
      'border-radius': '7px',
    },
    swatches: ['#8d9d4f', '#b19681', '#e4d7b0', '#5c4b3e'],
  },
  {
    id: 'doom-64',
    name: 'Doom 64',
    nameZh: '毁灭战士',
    seeds: {
      'color-primary': '#b71c1c',
      'color-bg': '#cccccc',
      'color-border': '#505050',
      'color-danger': '#ff6f00',
      'border-radius': '0px',
    },
    darkSeeds: {
      'color-primary': '#e53935',
      'color-bg': '#1a1a1a',
      'color-border': '#4a4a4a',
      'color-danger': '#ffa000',
      'border-radius': '0px',
    },
    swatches: ['#b71c1c', '#e53935', '#cccccc', '#505050'],
  },
  {
    id: 'retro-arcade',
    name: 'Retro Arcade',
    nameZh: '复古街机',
    seeds: {
      'color-primary': '#d33682',
      'color-bg': '#fdf6e3',
      'color-text': 'rgba(7, 54, 66, 0.88)',
      'color-border': '#839496',
      'color-danger': '#dc322f',
      'border-radius': '4px',
    },
    darkSeeds: {
      'color-primary': '#d33682',
      'color-bg': '#002b36',
      'color-text': 'rgba(147, 161, 161, 0.88)',
      'color-border': '#586e75',
      'color-danger': '#dc322f',
      'border-radius': '4px',
    },
    swatches: ['#d33682', '#839496', '#fdf6e3', '#073642'],
  },
];
