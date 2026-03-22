export type TokenType = 'color' | 'size' | 'number' | 'select' | 'text';

export interface TokenDef {
  key: string;
  label: string;
  labelZh: string;
  type: TokenType;
  defaultValue: string;
  scssVar?: string;
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
    scssVar: '$primary-color',
  },
  {
    key: 'color-success',
    label: 'Success',
    labelZh: '成功色',
    type: 'color',
    defaultValue: '#52c41a',
    scssVar: '$success-color',
  },
  {
    key: 'color-warning',
    label: 'Warning',
    labelZh: '警告色',
    type: 'color',
    defaultValue: '#ff9800',
    scssVar: '$warning-color',
  },
  {
    key: 'color-danger',
    label: 'Danger',
    labelZh: '危险色',
    type: 'color',
    defaultValue: '#f44336',
    scssVar: '$danger-color',
  },
  {
    key: 'color-info',
    label: 'Info',
    labelZh: '信息色',
    type: 'color',
    defaultValue: '#1890ff',
    scssVar: '$info-color',
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

// ---- Typography tokens ----
export const TYPOGRAPHY_TOKENS: TokenDef[] = [
  {
    key: 'font-size-base',
    label: 'Base Font Size',
    labelZh: '基础字号',
    type: 'size',
    defaultValue: '1rem',
    scssVar: '$font-size-base',
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
    scssVar: '$font-size-sm',
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
    scssVar: '$font-size-lg',
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
    scssVar: '$font-weight',
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
    scssVar: '$line-height-base',
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
    scssVar: '$headings-font-weight',
    options: [
      { label: 'Regular (400)', value: '400' },
      { label: 'Medium (500)', value: '500' },
      { label: 'Semi Bold (600)', value: '600' },
      { label: 'Bold (700)', value: '700' },
    ],
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
    scssVar: '$border-radius',
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
    scssVar: '$height-sm',
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
    scssVar: '$height-md',
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
    scssVar: '$height-lg',
    min: 36,
    max: 56,
    step: 2,
    unit: 'px',
  },
];

export const ALL_TOKENS = [...COLOR_TOKENS, ...TYPOGRAPHY_TOKENS, ...DETAIL_TOKENS];
