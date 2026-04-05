export type TokenType = 'color' | 'size' | 'number' | 'select' | 'text' | 'font';

export interface TokenDef {
  key: string;
  label: string;
  labelZh: string;
  type: TokenType;
  defaultValue: string;

  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

// ---- Color seed tokens ----
export const COLOR_TOKENS: TokenDef[] = [
  {
    key: 'color-primary',
    label: 'Primary',
    labelZh: '主色',
    type: 'color',
    defaultValue: '#6e41bf',

  },
  {
    key: 'color-success',
    label: 'Success',
    labelZh: '成功色',
    type: 'color',
    defaultValue: '#52c41a',

  },
  {
    key: 'color-warning',
    label: 'Warning',
    labelZh: '警告色',
    type: 'color',
    defaultValue: '#ff9800',

  },
  {
    key: 'color-danger',
    label: 'Danger',
    labelZh: '危险色',
    type: 'color',
    defaultValue: '#f44336',

  },
  {
    key: 'color-info',
    label: 'Info',
    labelZh: '信息色',
    type: 'color',
    defaultValue: '#1890ff',

  },
  {
    key: 'color-bg',
    label: 'Background',
    labelZh: '背景色',
    type: 'color',
    defaultValue: '#ffffff',
  },
  {
    key: 'color-text',
    label: 'Text',
    labelZh: '文本色',
    type: 'color',
    defaultValue: 'rgba(0, 0, 0, 0.85)',
  },
  {
    key: 'color-border',
    label: 'Border',
    labelZh: '边框色',
    type: 'color',
    defaultValue: '#d9d9d9',
  },
];

// ---- Font tokens ----
export const FONT_TOKENS: TokenDef[] = [
  {
    key: 'font-family',
    label: 'Body Font',
    labelZh: '正文字体',
    type: 'font',
    defaultValue:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',

  },
  {
    key: 'font-family-monospace',
    label: 'Monospace Font',
    labelZh: '等宽字体',
    type: 'font',
    defaultValue:
      '"Lucida Console", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',

  },
];

// ---- Typography tokens ----
export const TYPOGRAPHY_TOKENS: TokenDef[] = [
  {
    key: 'font-size-base',
    label: 'Base Font Size',
    labelZh: '基础字号',
    type: 'size',
    defaultValue: '1rem',

    min: 12,
    max: 20,
    step: 1,
    unit: 'px',
  },
  {
    key: 'font-size-sm',
    label: 'Small Font Size',
    labelZh: '小号字号',
    type: 'size',
    defaultValue: '0.875rem',

    min: 10,
    max: 16,
    step: 1,
    unit: 'px',
  },
  {
    key: 'font-size-lg',
    label: 'Large Font Size',
    labelZh: '大号字号',
    type: 'size',
    defaultValue: '1.25rem',

    min: 14,
    max: 24,
    step: 1,
    unit: 'px',
  },
  {
    key: 'font-weight',
    label: 'Font Weight',
    labelZh: '字重',
    type: 'select',
    defaultValue: '400',

    options: [
      { label: 'Light (300)', value: '300' },
      { label: 'Regular (400)', value: '400' },
      { label: 'Medium (500)', value: '500' },
      { label: 'Semi Bold (600)', value: '600' },
      { label: 'Bold (700)', value: '700' },
    ],
  },
  {
    key: 'line-height-base',
    label: 'Line Height',
    labelZh: '行高',
    type: 'number',
    defaultValue: '1.5',

    min: 1,
    max: 2.5,
    step: 0.1,
  },
  {
    key: 'headings-font-weight',
    label: 'Headings Font Weight',
    labelZh: '标题字重',
    type: 'select',
    defaultValue: '500',

    options: [
      { label: 'Regular (400)', value: '400' },
      { label: 'Medium (500)', value: '500' },
      { label: 'Semi Bold (600)', value: '600' },
      { label: 'Bold (700)', value: '700' },
    ],
  },
  {
    key: 'letter-spacing',
    label: 'Letter Spacing',
    labelZh: '字间距',
    type: 'size',
    defaultValue: '0px',
    min: -1,
    max: 4,
    step: 0.25,
    unit: 'px',
  },
];

// ---- Detail tokens ----
export const DETAIL_TOKENS: TokenDef[] = [
  {
    key: 'border-radius',
    label: 'Border Radius',
    labelZh: '圆角',
    type: 'size',
    defaultValue: '2px',

    min: 0,
    max: 20,
    step: 1,
    unit: 'px',
  },
  {
    key: 'height-sm',
    label: 'Height Small',
    labelZh: '小尺寸高度',
    type: 'size',
    defaultValue: '24px',

    min: 20,
    max: 36,
    step: 2,
    unit: 'px',
  },
  {
    key: 'height-md',
    label: 'Height Medium',
    labelZh: '中尺寸高度',
    type: 'size',
    defaultValue: '32px',

    min: 28,
    max: 44,
    step: 2,
    unit: 'px',
  },
  {
    key: 'height-lg',
    label: 'Height Large',
    labelZh: '大尺寸高度',
    type: 'size',
    defaultValue: '42px',

    min: 36,
    max: 56,
    step: 2,
    unit: 'px',
  },
];

// ---- Shadow tokens ----
export const SHADOW_TOKENS: TokenDef[] = [
  {
    key: 'shadow-intensity',
    label: 'Shadow Intensity',
    labelZh: '阴影强度',
    type: 'select',
    defaultValue: 'medium',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Subtle', value: 'subtle' },
      { label: 'Medium', value: 'medium' },
      { label: 'Strong', value: 'strong' },
    ],
  },
];

// ---- Spacing tokens ----
export const SPACING_TOKENS: TokenDef[] = [
  {
    key: 'spacer',
    label: 'Base Spacing',
    labelZh: '基础间距',
    type: 'size',
    defaultValue: '16px',

    min: 8,
    max: 24,
    step: 2,
    unit: 'px',
  },
];

export const ALL_TOKENS = [
  ...COLOR_TOKENS,
  ...FONT_TOKENS,
  ...TYPOGRAPHY_TOKENS,
  ...DETAIL_TOKENS,
  ...SHADOW_TOKENS,
  ...SPACING_TOKENS,
];
