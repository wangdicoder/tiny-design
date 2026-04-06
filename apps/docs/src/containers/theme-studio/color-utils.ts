import { DEFAULT_FIELDS } from './defaults';
import type { ThemeEditorFields, ThemeMode } from './types';

type RuntimeStyles = Record<string, string>;
type OklchColor = {
  l: number;
  c: number;
  h: number;
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

export function deriveStatusPalette(styles: RuntimeStyles): Pick<
  ThemeEditorFields,
  'success' | 'successForeground' | 'info' | 'infoForeground' | 'warning' | 'warningForeground' | 'danger' | 'dangerForeground'
> {
  const mode: ThemeMode = parseCssScalar(styles.background ?? '') != null
    ? ((parseOklchColor(styles.background)?.l ?? 1) < 0.45 ? 'dark' : 'light')
    : 'light';
  const seed = parseOklchColor(styles.primary) ?? parseOklchColor(styles.accent) ?? parseOklchColor(styles.ring);
  const chromaBase = clamp(seed?.c ?? (mode === 'dark' ? 0.17 : 0.19), 0.1, 0.24);
  const lightnessShift = seed ? (seed.l - (mode === 'dark' ? 0.78 : 0.58)) * 0.08 : 0;
  const hueShift = seed ? ((seed.h - 220) / 220) * 6 : 0;
  const statusForeground = mode === 'dark' ? 'oklch(0.145 0 0)' : 'oklch(0.985 0 0)';

  const createStatus = (hue: number, lightness: number, chromaScale: number) => formatOklchColor({
    l: clamp(lightness + lightnessShift, mode === 'dark' ? 0.68 : 0.54, mode === 'dark' ? 0.84 : 0.74),
    c: clamp(chromaBase * chromaScale, 0.12, 0.26),
    h: normalizeHue(hue + hueShift),
  });

  return {
    success: createStatus(148, mode === 'dark' ? 0.76 : 0.62, 0.92),
    successForeground: statusForeground,
    info: createStatus(238, mode === 'dark' ? 0.74 : 0.60, 0.96),
    infoForeground: statusForeground,
    warning: createStatus(72, mode === 'dark' ? 0.80 : 0.69, 0.94),
    warningForeground: mode === 'dark' ? 'oklch(0.145 0 0)' : 'oklch(0.205 0 0)',
    danger: createStatus(28, mode === 'dark' ? 0.72 : 0.60, 1),
    dangerForeground: statusForeground,
  };
}

function parseHexColor(color: string): [number, number, number] | null {
  const normalized = color.trim().replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
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

export function buildShadow(styles: RuntimeStyles): string {
  const color = styles['shadow-color'];
  if (!color) return DEFAULT_FIELDS.shadowCard;

  const opacity = Number.parseFloat(styles['shadow-opacity'] ?? '0.1');
  const blur = styles['shadow-blur'] ?? '0px';
  const spread = styles['shadow-spread'] ?? '0px';
  const offsetX = styles['shadow-offset-x'] ?? '0px';
  const offsetY = styles['shadow-offset-y'] ?? '1px';

  return `${offsetX} ${offsetY} ${blur} ${spread} ${toRgba(color, opacity)}`;
}
