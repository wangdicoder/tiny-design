import React from 'react';

/**
 * Maps component display names to their CSS class prefix.
 * Used to convert ThemeConfig.components keys to --ty-{prefix}-* CSS variables.
 */
const COMPONENT_PREFIX_MAP: Record<string, string> = {
  Alert: 'alert',
  Anchor: 'anchor',
  AutoComplete: 'auto-complete',
  Avatar: 'avatar',
  BackTop: 'back-top',
  Badge: 'badge',
  Breadcrumb: 'breadcrumb',
  Button: 'btn',
  Calendar: 'calendar',
  Card: 'card',
  Carousel: 'carousel',
  Cascader: 'cascader',
  Checkbox: 'checkbox',
  Collapse: 'collapse',
  ColorPicker: 'color-picker',
  DatePicker: 'picker',
  Descriptions: 'descriptions',
  Divider: 'divider',
  Drawer: 'drawer',
  Dropdown: 'dropdown',
  Empty: 'empty',
  Form: 'form',
  Input: 'input',
  InputNumber: 'input-number',
  Keyboard: 'kbd',
  Layout: 'layout',
  List: 'list',
  Menu: 'menu',
  Message: 'message',
  Modal: 'modal',
  NativeSelect: 'native-select',
  Notification: 'notification',
  Pagination: 'pagination',
  Popover: 'popover',
  Popup: 'popup',
  Progress: 'progress',
  Radio: 'radio',
  Result: 'result',
  Segmented: 'segmented',
  Select: 'select',
  Skeleton: 'skeleton',
  Slider: 'slider',
  SpeedDial: 'speed-dial',
  Split: 'split',
  Steps: 'steps',
  Switch: 'switch',
  Table: 'table',
  Tabs: 'tabs',
  Tag: 'tag',
  Textarea: 'textarea',
  TimePicker: 'picker',
  Timeline: 'timeline',
  Tooltip: 'tooltip',
  Transfer: 'transfer',
  Tree: 'tree',
  Typography: 'typography',
  Upload: 'upload',
};

/** Converts a camelCase key to kebab-case. */
function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export interface ThemeConfig {
  mode?: 'light' | 'dark' | 'system';
  token?: Record<string, string | number>;
  components?: Record<string, Record<string, string | number>>;
}

/**
 * Builds a CSSProperties object from a ThemeConfig.
 *
 * - `token` entries: `colorPrimary: '#1890ff'` → `'--ty-color-primary': '#1890ff'`
 * - `components.Button` entries: `borderRadius: '20px'` → `'--ty-btn-border-radius': '20px'`
 */
export function buildCssVars(
  theme: ThemeConfig
): React.CSSProperties | undefined {
  const { token, components } = theme;
  if (!token && !components) return undefined;

  const vars: Record<string, string> = {};

  if (token) {
    for (const [key, value] of Object.entries(token)) {
      vars[`--ty-${camelToKebab(key)}`] = String(value);
    }
  }

  if (components) {
    for (const [componentName, componentTokens] of Object.entries(components)) {
      const prefix = COMPONENT_PREFIX_MAP[componentName];
      if (!prefix) continue;
      for (const [key, value] of Object.entries(componentTokens)) {
        vars[`--ty-${prefix}-${camelToKebab(key)}`] = String(value);
      }
    }
  }

  if (Object.keys(vars).length === 0) return undefined;
  return vars as React.CSSProperties;
}
