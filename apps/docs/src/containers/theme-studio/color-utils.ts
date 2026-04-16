import { DEFAULT_FIELDS } from './defaults';
import type { ThemeEditorFields, ThemeMode } from './types';

type RuntimeStyles = Record<string, string>;
type OklchColor = {
  l: number;
  c: number;
  h: number;
};
export type ShadowValue = {
  color: string;
  opacity: number;
  blur: number;
  spread: number;
  offsetX: number;
  offsetY: number;
};

function normalizeAlpha(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(1, Math.max(0, value));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizeHue(value: number): number {
  return ((value % 360) + 360) % 360;
}

export function parseHueToken(token: string): number | null {
  const match = /^(-?\d*\.?\d+)(deg|rad|grad|turn)?$/i.exec(token.trim());
  if (!match) return null;

  const value = Number.parseFloat(match[1]);
  if (!Number.isFinite(value)) return null;

  switch ((match[2] ?? 'deg').toLowerCase()) {
    case 'rad':
      return normalizeHue((value * 180) / Math.PI);
    case 'grad':
      return normalizeHue(value * 0.9);
    case 'turn':
      return normalizeHue(value * 360);
    default:
      return normalizeHue(value);
  }
}

export function parseCssScalar(token: string): number | null {
  const trimmed = token.trim();
  if (!trimmed) return null;
  if (trimmed.endsWith('%')) {
    const value = Number.parseFloat(trimmed.slice(0, -1));
    return Number.isFinite(value) ? value / 100 : null;
  }
  const value = Number.parseFloat(trimmed);
  return Number.isFinite(value) ? value : null;
}

export function parseOklchColor(input?: string): OklchColor | null {
  if (!input) return null;
  const match = /^oklch\(\s*([^)]+)\s*\)$/i.exec(input.trim());
  if (!match) return null;

  const channels = match[1].split('/')[0].trim().split(/\s+/).filter(Boolean);
  if (channels.length < 3) return null;

  const l = parseCssScalar(channels[0]);
  const c = parseCssScalar(channels[1]);
  const h = parseHueToken(channels[2]);

  if (l == null || c == null || h == null) return null;

  return { l, c, h };
}

export function formatOklchColor(color: OklchColor): string {
  return `oklch(${color.l.toFixed(3)} ${color.c.toFixed(3)} ${color.h.toFixed(3)})`;
}

export function deriveStatusPalette(
  styles: RuntimeStyles
): Pick<
  ThemeEditorFields,
  | 'success'
  | 'successForeground'
  | 'info'
  | 'infoForeground'
  | 'warning'
  | 'warningForeground'
  | 'danger'
  | 'dangerForeground'
> {
  const mode: ThemeMode =
    parseCssScalar(styles.background ?? '') != null
      ? (parseOklchColor(styles.background)?.l ?? 1) < 0.45
        ? 'dark'
        : 'light'
      : 'light';
  const seed =
    parseOklchColor(styles.primary) ??
    parseOklchColor(styles.accent) ??
    parseOklchColor(styles.ring);
  const chromaBase = clamp(seed?.c ?? (mode === 'dark' ? 0.17 : 0.19), 0.1, 0.24);
  const lightnessShift = seed ? (seed.l - (mode === 'dark' ? 0.78 : 0.58)) * 0.08 : 0;
  const hueShift = seed ? ((seed.h - 220) / 220) * 6 : 0;
  const statusForeground = mode === 'dark' ? 'oklch(0.145 0 0)' : 'oklch(0.985 0 0)';

  const createStatus = (hue: number, lightness: number, chromaScale: number) =>
    formatOklchColor({
      l: clamp(
        lightness + lightnessShift,
        mode === 'dark' ? 0.68 : 0.54,
        mode === 'dark' ? 0.84 : 0.74
      ),
      c: clamp(chromaBase * chromaScale, 0.12, 0.26),
      h: normalizeHue(hue + hueShift),
    });

  return {
    success: createStatus(148, mode === 'dark' ? 0.76 : 0.62, 0.92),
    successForeground: statusForeground,
    info: createStatus(238, mode === 'dark' ? 0.74 : 0.6, 0.96),
    infoForeground: statusForeground,
    warning: createStatus(72, mode === 'dark' ? 0.8 : 0.69, 0.94),
    warningForeground: mode === 'dark' ? 'oklch(0.145 0 0)' : 'oklch(0.205 0 0)',
    danger: createStatus(28, mode === 'dark' ? 0.72 : 0.6, 1),
    dangerForeground: statusForeground,
  };
}

function parseHexColor(color: string): [number, number, number] | null {
  const normalized = color.trim().replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;

  if (!/^[0-9a-f]{6}$/i.test(value)) return null;

  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

export function toRgba(color: string, alpha: number): string {
  const safeAlpha = normalizeAlpha(alpha);
  const hex = parseHexColor(color);

  if (hex) {
    const [red, green, blue] = hex;
    return `rgba(${red}, ${green}, ${blue}, ${safeAlpha})`;
  }

  const rgbMatch = color.trim().match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(',').map((part) => part.trim());
    if (parts.length >= 3) {
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${safeAlpha})`;
    }
  }

  return `color-mix(in srgb, ${color} ${Math.round(safeAlpha * 100)}%, transparent)`;
}

function mixColor(color: string, target: string, ratio: number): string {
  const safeRatio = Math.min(1, Math.max(0, ratio));
  return `color-mix(in srgb, ${color} ${Math.round((1 - safeRatio) * 100)}%, ${target} ${Math.round(safeRatio * 100)}%)`;
}

export function tintColor(color: string, amount: number): string {
  return mixColor(color, '#ffffff', amount);
}

function shadeColor(color: string, amount: number): string {
  return mixColor(color, '#000000', amount);
}

export function softenSurface(color: string, mode: ThemeMode, amount: number): string {
  return mode === 'dark' ? tintColor(color, amount) : shadeColor(color, amount);
}

function splitTopLevelTokens(value: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let depth = 0;

  for (const char of value) {
    if (char === '(') depth += 1;
    if (char === ')') depth = Math.max(0, depth - 1);

    if (/\s/.test(char) && depth === 0) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      continue;
    }

    current += char;
  }

  if (current) tokens.push(current);
  return tokens;
}

function parsePxValue(token: string): number | null {
  const trimmed = token.trim();
  if (/^-?0(?:\.0+)?(?:px)?$/i.test(trimmed)) return 0;

  const match = /^(-?\d+(?:\.\d+)?)px$/i.exec(trimmed);
  if (!match) return null;

  const parsed = Number.parseFloat(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function rgbChannelToHex(value: string): string | null {
  const parsed = Number.parseInt(value.trim(), 10);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 255) return null;
  return parsed.toString(16).padStart(2, '0');
}

function parseShadowColor(value: string): Pick<ShadowValue, 'color' | 'opacity'> | null {
  const colorMixMatch =
    /^color-mix\(in srgb,\s*(.+?)\s+(-?\d+(?:\.\d+)?)%,\s*transparent\s*\)$/i.exec(value.trim());
  if (colorMixMatch) {
    const percentage = Number.parseFloat(colorMixMatch[2]);
    if (Number.isFinite(percentage)) {
      return {
        color: colorMixMatch[1].trim(),
        opacity: clamp(percentage / 100, 0, 1),
      };
    }
  }

  const rgbaMatch = /^rgba\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\)$/i.exec(
    value.trim()
  );
  if (rgbaMatch) {
    const red = rgbChannelToHex(rgbaMatch[1]);
    const green = rgbChannelToHex(rgbaMatch[2]);
    const blue = rgbChannelToHex(rgbaMatch[3]);
    const alpha = Number.parseFloat(rgbaMatch[4]);

    if (red && green && blue && Number.isFinite(alpha)) {
      return {
        color: `#${red}${green}${blue}`,
        opacity: clamp(alpha, 0, 1),
      };
    }
  }

  const rgbMatch = /^rgb\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*\)$/i.exec(value.trim());
  if (rgbMatch) {
    const red = rgbChannelToHex(rgbMatch[1]);
    const green = rgbChannelToHex(rgbMatch[2]);
    const blue = rgbChannelToHex(rgbMatch[3]);

    if (red && green && blue) {
      return {
        color: `#${red}${green}${blue}`,
        opacity: 1,
      };
    }
  }

  return value.trim()
    ? {
        color: value.trim(),
        opacity: 1,
      }
    : null;
}

export function formatShadowValue(shadow: ShadowValue): string {
  const offsetX = `${shadow.offsetX}px`;
  const offsetY = `${shadow.offsetY}px`;
  const blur = `${shadow.blur}px`;
  const spread = `${shadow.spread}px`;

  return `${offsetX} ${offsetY} ${blur} ${spread} ${toRgba(shadow.color, shadow.opacity)}`;
}

export function parseShadowValue(value: string, fallback: ShadowValue): ShadowValue {
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === 'none') return fallback;

  const tokens = splitTopLevelTokens(trimmed);
  if (tokens.length < 5) return fallback;

  const offsetX = parsePxValue(tokens[0]);
  const offsetY = parsePxValue(tokens[1]);
  const blur = parsePxValue(tokens[2]);
  const spread = parsePxValue(tokens[3]);
  const color = parseShadowColor(tokens.slice(4).join(' '));

  if (offsetX == null || offsetY == null || blur == null || spread == null || !color) {
    return fallback;
  }

  return {
    color: color.color,
    opacity: color.opacity,
    blur,
    spread,
    offsetX,
    offsetY,
  };
}

export function buildShadow(styles: RuntimeStyles, fallback = DEFAULT_FIELDS.shadowCard): string {
  const color = styles['shadow-color'];
  if (!color) return fallback;

  const opacity = Number.parseFloat(styles['shadow-opacity'] ?? '0.1');
  const blur = styles['shadow-blur'] ?? '0px';
  const spread = styles['shadow-spread'] ?? '0px';
  const offsetX = styles['shadow-offset-x'] ?? '0px';
  const offsetY = styles['shadow-offset-y'] ?? '1px';

  return `${offsetX} ${offsetY} ${blur} ${spread} ${toRgba(color, opacity)}`;
}
