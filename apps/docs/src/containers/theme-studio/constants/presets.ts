export interface ThemePreset {
  id: string;
  name: string;
  nameZh: string;
  seeds: Record<string, string>;
  darkSeeds?: Record<string, string>;
  swatches: string[];
}

const NON_COLOR_KEYS = new Set([
  'border-radius',
  'font-family',
  'font-family-monospace',
  'font-weight',
  'font-size-base',
  'font-size-sm',
  'font-size-lg',
  'line-height-base',
  'headings-font-weight',
  'letter-spacing',
  'height-sm',
  'height-md',
  'height-lg',
  'spacer',
  'shadow-intensity',
]);

export function getPresetSeeds(preset: ThemePreset, isDark: boolean): Record<string, string> {
  if (!isDark) return preset.seeds;
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
      'font-family': '"Inter", sans-serif',
      'shadow-intensity': 'subtle',
    },
    darkSeeds: {
      'color-primary': '#3b82f6',
      'border-radius': '6px',
      'font-family': '"Inter", sans-serif',
      'shadow-intensity': 'subtle',
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
      'font-family': '"Nunito", sans-serif',
    },
    darkSeeds: {
      'color-primary': '#8c5cff',
      'border-radius': '22px',
      'font-family': '"Nunito", sans-serif',
    },
    swatches: ['#7033ff', '#8c5cff', '#fdfdfd', '#e7e7ee'],
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
    id: 'nature',
    name: 'Nature',
    nameZh: '自然绿',
    seeds: {
      'color-primary': '#2e7d32',
      'color-bg': '#f8f5f0',
      'color-text': 'rgba(62, 39, 35, 0.88)',
      'color-border': '#e0d6c9',
      'border-radius': '8px',
      'font-family': '"Lora", serif',
      'shadow-intensity': 'subtle',
    },
    darkSeeds: {
      'color-primary': '#4caf50',
      'color-bg': '#1c2a1f',
      'color-text': 'rgba(240, 235, 229, 0.88)',
      'color-border': '#3e4a3d',
      'border-radius': '8px',
      'font-family': '"Lora", serif',
      'shadow-intensity': 'subtle',
    },
    swatches: ['#2e7d32', '#4caf50', '#f8f5f0', '#e0d6c9'],
  },
];
