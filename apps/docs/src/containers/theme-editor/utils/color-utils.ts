import { hexToHsb, hsbToHex } from '@tiny-design/react/color-picker/utils';

/**
 * Derive related tokens from a base color using HSB manipulation.
 */
function deriveHex(h: number, s: number, b: number): string {
  return hsbToHex({ h, s, b, a: 1 });
}

export function derivePrimaryTokens(hex: string): Record<string, string> {
  const { h, s, b } = hexToHsb(hex);

  const hover = deriveHex(h, Math.max(0, s - 10), Math.min(100, b + 12));
  const active = deriveHex(h, s, Math.max(0, b - 10));
  const bg = deriveHex(h, 15, 98);
  const border = deriveHex(h, 35, 90);
  const bgHover = deriveHex(h, 20, 96);
  const textHover = hover;
  const focusShadow = `0 0 0 2px ${hsbToHex({ h, s, b, a: 0.2 })}`;

  return {
    'color-primary': hex,
    'color-primary-hover': hover,
    'color-primary-active': active,
    'color-primary-bg': bg,
    'color-primary-border': border,
    'color-primary-bg-hover': bgHover,
    'color-primary-text-hover': textHover,
    // Component-specific tokens that reference primary
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

export function deriveSemanticTokens(
  baseKey: string,
  hex: string
): Record<string, string> {
  const { h, s, b } = hexToHsb(hex);

  const tokens: Record<string, string> = { [baseKey]: hex };

  const bgHex = deriveHex(h, 12, 99);
  const borderHex = deriveHex(h, 35, 92);
  const textHex = deriveHex(h, Math.min(100, s + 5), Math.max(0, b - 8));

  tokens[`${baseKey}-bg`] = bgHex;
  tokens[`${baseKey}-border`] = borderHex;
  tokens[`${baseKey}-text`] = textHex;

  if (baseKey === 'color-danger') {
    tokens['color-danger-hover'] = deriveHex(h, Math.max(0, s - 15), Math.min(100, b + 15));
  }

  return tokens;
}

export function deriveBgTokens(hex: string): Record<string, string> {
  const { h, s, b } = hexToHsb(hex);
  const spotlight = deriveHex(h, s, Math.max(0, b - 4));

  return {
    'color-bg': hex,
    'color-bg-elevated': hex,
    'color-bg-container': hex,
    'color-bg-layout': hex,
    'color-bg-spotlight': spotlight,
    'color-bg-disabled': spotlight,
    // Component backgrounds that should follow the base bg
    'card-bg': hex,
    'modal-bg': hex,
    'modal-header-bg': hex,
    'drawer-bg': hex,
    'select-dropdown-bg': hex,
    'notification-bg': hex,
    'message-bg': hex,
    'input-bg': hex,
    'picker-input-bg': hex,
    'picker-dropdown-bg': hex,
    'cascader-bg': hex,
    'cascader-dropdown-bg': hex,
    'calendar-bg': hex,
    'popup-light-bg': hex,
    'anchor-bg': hex,
    'btn-default-bg': hex,
    'btn-default-hover-bg': hex,
    'btn-loading-bg': hex,
    'checkbox-bg': hex,
    'radio-bg': hex,
    'native-select-bg': hex,
    'pagination-bg': hex,
    'transfer-header-bg': hex,
    'transfer-footer-bg': hex,
    'steps-icon-bg': hex,
    'timeline-dot-bg': hex,
    'timeline-head-bg': hex,
    'slider-dot-bg': hex,
    'picker-clear-bg': hex,
    'collapse-content-bg': hex,
    'tabs-card-active-bg': hex,
    'segmented-active-bg': hex,
    'select-option-disabled-bg': hex,
    'tag-checkable-bg': hex,
    // Spotlight-derived backgrounds
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

export function deriveTextTokens(hex: string): Record<string, string> {
  return {
    'color-text': hex,
    'color-text-secondary': hex.startsWith('rgba')
      ? hex
      : adjustOpacity(hex, 0.65),
    'color-text-tertiary': hex.startsWith('rgba')
      ? hex
      : adjustOpacity(hex, 0.45),
    'color-text-quaternary': hex.startsWith('rgba')
      ? hex
      : adjustOpacity(hex, 0.25),
  };
}

export function deriveBorderTokens(hex: string): Record<string, string> {
  const { h, s, b } = hexToHsb(hex);
  return {
    'color-border': hex,
    'color-border-secondary': deriveHex(h, Math.max(0, s - 5), Math.min(100, b + 6)),
    'color-border-light': deriveHex(h, Math.max(0, s - 10), Math.min(100, b + 10)),
  };
}

function adjustOpacity(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Derive all tokens from a set of seed overrides.
 */
export function deriveAllTokens(seeds: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(seeds)) {
    switch (key) {
      case 'color-primary':
        Object.assign(result, derivePrimaryTokens(value));
        break;
      case 'color-success':
      case 'color-warning':
      case 'color-danger':
      case 'color-info':
        Object.assign(result, deriveSemanticTokens(key, value));
        break;
      case 'color-bg':
        Object.assign(result, deriveBgTokens(value));
        break;
      case 'color-text':
        Object.assign(result, deriveTextTokens(value));
        break;
      case 'color-border':
        Object.assign(result, deriveBorderTokens(value));
        break;
      default:
        result[key] = value;
        break;
    }
  }

  return result;
}
