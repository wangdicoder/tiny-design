import { hexToHsb, hsbToHex } from '@tiny-design/react/color-picker/utils';

function deriveHex(h: number, s: number, b: number): string {
  return hsbToHex({ h, s, b, a: 1 });
}

function derivePrimaryTokensLight(hex: string): Record<string, string> {
  const { h, s, b } = hexToHsb(hex);
  const hover = deriveHex(h, Math.max(0, s - 10), Math.min(100, b + 12));
  const active = deriveHex(h, s, Math.max(0, b - 10));
  const bg = deriveHex(h, 15, 98);
  const bgHover = deriveHex(h, 20, 96);
  const focusShadow = `0 0 0 2px ${hsbToHex({ h, s, b, a: 0.2 })}`;

  return {
    'color-primary': hex,
    'color-primary-hover': hover,
    'color-primary-active': active,
    'color-primary-bg': bg,
    'color-primary-bg-hover': bgHover,
    'btn-default-hover-border': hex,
    'btn-default-hover-color': hex,
    'btn-default-active-border': active,
    'btn-default-active-color': active,
    'btn-ghost-hover-bg': bg,
    'btn-ghost-active-bg': bgHover,
    'btn-outline-hover-bg': bg,
    'btn-outline-active-bg': bgHover,
    'input-focus-border': hex,
    'input-focus-shadow': focusShadow,
    'select-option-selected-bg': bg,
  };
}

function derivePrimaryTokensDark(hex: string): Record<string, string> {
  const { h, s, b } = hexToHsb(hex);
  const hover = deriveHex(h, Math.max(0, s - 10), Math.min(100, b + 10));
  const active = deriveHex(h, Math.min(100, s + 5), Math.max(0, b - 8));
  const bg = deriveHex(h, Math.min(40, s), 15);
  const bgHover = deriveHex(h, Math.min(35, s), 20);
  const focusShadow = `0 0 0 2px ${hsbToHex({ h, s: Math.min(60, s), b: Math.min(60, b), a: 0.2 })}`;

  return {
    'color-primary': hex,
    'color-primary-hover': hover,
    'color-primary-active': active,
    'color-primary-bg': bg,
    'color-primary-bg-hover': bgHover,
    'btn-default-hover-border': hex,
    'btn-default-hover-color': hex,
    'btn-default-active-border': active,
    'btn-default-active-color': active,
    'btn-ghost-hover-bg': bg,
    'btn-ghost-active-bg': bgHover,
    'btn-outline-hover-bg': bg,
    'btn-outline-active-bg': bgHover,
    'input-focus-border': hsbToHex({ h, s, b, a: 0.8 }),
    'input-focus-shadow': focusShadow,
    'select-option-selected-bg': bg,
  };
}

function deriveSemanticTokens(baseKey: string, hex: string, isDark: boolean): Record<string, string> {
  const { h, s, b } = hexToHsb(hex);
  const tokens: Record<string, string> = { [baseKey]: hex };

  if (isDark) {
    tokens[`${baseKey}-bg`] = deriveHex(h, Math.min(40, s), 10);
    tokens[`${baseKey}-border`] = deriveHex(h, Math.min(50, s), 28);
    tokens[`${baseKey}-text`] = deriveHex(h, Math.max(0, s - 10), Math.min(100, b + 10));
  } else {
    tokens[`${baseKey}-bg`] = deriveHex(h, 12, 99);
    tokens[`${baseKey}-border`] = deriveHex(h, 35, 92);
    tokens[`${baseKey}-text`] = deriveHex(h, Math.min(100, s + 5), Math.max(0, b - 8));
  }

  if (baseKey === 'color-danger') {
    tokens['color-danger-hover'] = isDark
      ? deriveHex(h, Math.max(0, s - 10), Math.min(100, b + 12))
      : deriveHex(h, Math.max(0, s - 15), Math.min(100, b + 15));
  }

  return tokens;
}

function buildBgMap(base: string, spotlight: string, elevated?: string): Record<string, string> {
  const elev = elevated ?? base;
  return {
    'color-bg': base,
    'color-bg-elevated': elev,
    'color-bg-container': elev,
    'color-bg-layout': base,
    'color-bg-spotlight': spotlight,
    'color-bg-disabled': spotlight,
    'card-bg': elev,
    'modal-bg': elev,
    'modal-header-bg': elev,
    'drawer-bg': elev,
    'select-dropdown-bg': elev,
    'notification-bg': elev,
    'message-bg': elev,
    'input-bg': elev,
    'picker-input-bg': elev,
    'picker-dropdown-bg': elev,
    'cascader-bg': elev,
    'cascader-dropdown-bg': elev,
    'calendar-bg': elev,
    'popup-light-bg': elev,
    'anchor-bg': elev,
    'btn-default-bg': elev,
    'btn-default-hover-bg': elev,
    'btn-loading-bg': elev,
    'checkbox-bg': elev,
    'radio-bg': elev,
    'native-select-bg': elev,
    'pagination-bg': elev,
    'transfer-header-bg': elev,
    'transfer-footer-bg': elev,
    'steps-icon-bg': elev,
    'timeline-dot-bg': elev,
    'timeline-head-bg': elev,
    'slider-dot-bg': elev,
    'picker-clear-bg': elev,
    'collapse-content-bg': elev,
    'tabs-card-active-bg': elev,
    'segmented-active-bg': elev,
    'select-option-disabled-bg': elev,
    'tag-checkable-bg': elev,
    'collapse-bg': spotlight,
    'upload-dragger-bg': spotlight,
    'table-header-bg': spotlight,
    'tabs-card-bg': spotlight,
    'input-addon-bg': spotlight,
    'tag-bg': spotlight,
    'descriptions-label-bg': spotlight,
    'result-content-bg': spotlight,
    'color-fill': spotlight,
    'select-option-active-bg': spotlight,
    'tree-hover-bg': spotlight,
    'upload-item-hover-bg': spotlight,
    'picker-cell-hover-bg': spotlight,
    'transfer-item-hover-bg': spotlight,
    'input-disabled-bg': spotlight,
    'btn-disabled-bg': spotlight,
    'checkbox-disabled-bg': spotlight,
  };
}

function adjustOpacity(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function deriveBgTokens(hex: string, isDark: boolean): Record<string, string> {
  const { h, s, b } = hexToHsb(hex);
  if (isDark) {
    const elevated = deriveHex(h, s, Math.min(100, b + 5));
    const spotlight = deriveHex(h, s, Math.min(100, b + 8));
    return buildBgMap(hex, spotlight, elevated);
  }

  const spotlight = deriveHex(h, s, Math.max(0, b - 4));
  return buildBgMap(hex, spotlight);
}

function deriveTextTokens(hex: string): Record<string, string> {
  if (hex.startsWith('rgba')) {
    const match = hex.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
    if (match) {
      const [, r, g, b] = match;
      return {
        'color-text': hex,
        'color-text-secondary': `rgba(${r}, ${g}, ${b}, 0.65)`,
        'color-text-tertiary': `rgba(${r}, ${g}, ${b}, 0.45)`,
        'color-text-quaternary': `rgba(${r}, ${g}, ${b}, 0.25)`,
      };
    }
  }

  return {
    'color-text': hex,
    'color-text-secondary': adjustOpacity(hex, 0.65),
    'color-text-tertiary': adjustOpacity(hex, 0.45),
    'color-text-quaternary': adjustOpacity(hex, 0.25),
  };
}

function deriveBorderTokens(hex: string, isDark: boolean): Record<string, string> {
  const { h, s, b } = hexToHsb(hex);
  return isDark
    ? {
      'color-border': hex,
      'color-border-secondary': deriveHex(h, Math.max(0, s - 3), Math.max(0, b - 4)),
      'color-border-light': deriveHex(h, Math.max(0, s - 5), Math.max(0, b - 7)),
      'color-border-btn-default': hex,
    }
    : {
      'color-border': hex,
      'color-border-secondary': deriveHex(h, Math.max(0, s - 5), Math.min(100, b + 6)),
      'color-border-light': deriveHex(h, Math.max(0, s - 10), Math.min(100, b + 10)),
    };
}

interface ShadowSet {
  'shadow-sm': string;
  shadow: string;
  'shadow-lg': string;
  'shadow-popup': string;
  'shadow-card': string;
  'shadow-modal': string;
  'shadow-btn': string;
}

function deriveShadowTokens(intensity: string, isDark: boolean): ShadowSet {
  if (intensity === 'none') {
    return {
      'shadow-sm': 'none',
      shadow: 'none',
      'shadow-lg': 'none',
      'shadow-popup': 'none',
      'shadow-card': 'none',
      'shadow-modal': 'none',
      'shadow-btn': 'none',
    };
  }

  if (intensity === 'subtle') {
    return isDark
      ? {
        'shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.15)',
        shadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        'shadow-lg': '0 8px 24px rgba(0, 0, 0, 0.25)',
        'shadow-popup': '0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)',
        'shadow-card': '0 1px 3px rgba(0, 0, 0, 0.18)',
        'shadow-modal': '0 4px 12px rgba(0, 0, 0, 0.22)',
        'shadow-btn': 'none',
      }
      : {
        'shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        shadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        'shadow-lg': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'shadow-popup': '0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'shadow-card': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'shadow-modal': '0 4px 12px rgba(0, 0, 0, 0.06)',
        'shadow-btn': 'none',
      };
  }

  if (intensity === 'strong') {
    return isDark
      ? {
        'shadow-sm': '0 2px 4px rgba(0, 0, 0, 0.45)',
        shadow: '0 4px 16px rgba(0, 0, 0, 0.55)',
        'shadow-lg': '0 12px 40px rgba(0, 0, 0, 0.65)',
        'shadow-popup': '0 4px 8px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.4), 0 12px 40px rgba(0, 0, 0, 0.3)',
        'shadow-card': '0 2px 10px rgba(0, 0, 0, 0.5)',
        'shadow-modal': '0 8px 24px rgba(0, 0, 0, 0.55)',
        'shadow-btn': 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 2px 4px rgba(0, 0, 0, 0.35)',
      }
      : {
        'shadow-sm': '0 2px 4px rgba(0, 0, 0, 0.12)',
        shadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        'shadow-lg': '0 12px 40px rgba(0, 0, 0, 0.25)',
        'shadow-popup': '0 4px 8px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.12), 0 12px 40px rgba(0, 0, 0, 0.08)',
        'shadow-card': '0 2px 10px rgba(0, 0, 0, 0.18)',
        'shadow-modal': '0 8px 24px rgba(0, 0, 0, 0.22)',
        'shadow-btn': 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.12)',
      };
  }

  return isDark
    ? {
      'shadow-sm': '0 0.125rem 0.25rem rgba(0, 0, 0, 0.3)',
      shadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.4)',
      'shadow-lg': '0 1rem 3rem rgba(0, 0, 0, 0.5)',
      'shadow-popup': '0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.2)',
      'shadow-card': '0 1px 6px rgba(0, 0, 0, 0.35)',
      'shadow-modal': '0 4px 12px rgba(0, 0, 0, 0.45)',
      'shadow-btn': 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 1px 1px rgba(0, 0, 0, 0.2)',
    }
    : {
      'shadow-sm': '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
      shadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
      'shadow-lg': '0 1rem 3rem rgba(0, 0, 0, 0.175)',
      'shadow-popup': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
      'shadow-card': '0 1px 6px rgba(0, 0, 0, 0.12)',
      'shadow-modal': '0 4px 12px rgba(0, 0, 0, 0.15)',
      'shadow-btn': 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075)',
    };
}

export function deriveAllTokens(seeds: Record<string, string>, isDark = false): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(seeds)) {
    switch (key) {
      case 'color-primary':
        Object.assign(result, isDark ? derivePrimaryTokensDark(value) : derivePrimaryTokensLight(value));
        break;
      case 'color-success':
      case 'color-warning':
      case 'color-danger':
      case 'color-info':
        Object.assign(result, deriveSemanticTokens(key, value, isDark));
        break;
      case 'color-bg':
        Object.assign(result, deriveBgTokens(value, isDark));
        break;
      case 'color-text':
        Object.assign(result, deriveTextTokens(value));
        break;
      case 'color-border':
        Object.assign(result, deriveBorderTokens(value, isDark));
        break;
      case 'shadow-intensity':
        Object.assign(result, deriveShadowTokens(value, isDark));
        break;
      case 'font-family':
      case 'font-family-monospace':
      case 'letter-spacing':
      case 'spacer':
        result[key] = value;
        break;
      default:
        result[key] = value;
        break;
    }
  }

  return result;
}
