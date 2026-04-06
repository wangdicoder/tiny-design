import { Color } from './types';

function rgbStringToHsb(input: string): Color | null {
  const rgbMatch = input.match(/rgba?\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)\s*(?:[,/]\s*([\d.]+))?\s*\)/i);
  if (!rgbMatch) return null;

  const r = parseInt(rgbMatch[1], 10) / 255;
  const g = parseInt(rgbMatch[2], 10) / 255;
  const b = parseInt(rgbMatch[3], 10) / 255;
  const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;
  const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
  return { ...hexToHsb(hex), a };
}

function resolveCssColor(input: string): string | null {
  if (typeof document === 'undefined') return null;

  const probe = document.createElement('div');
  probe.style.color = '';
  probe.style.color = input;

  if (!probe.style.color) return null;

  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.pointerEvents = 'none';
  document.body.appendChild(probe);
  const computed = window.getComputedStyle(probe).color;
  probe.remove();

  return computed || null;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function normalizeHue(value: number, unit?: string): number {
  if (!Number.isFinite(value)) return 0;

  switch ((unit ?? '').toLowerCase()) {
    case 'deg':
    case '':
      return ((value % 360) + 360) % 360;
    case 'turn':
      return ((value * 360) % 360 + 360) % 360;
    case 'grad':
      return (((value * 0.9) % 360) + 360) % 360;
    case 'rad':
      return (((value * 180) / Math.PI) % 360 + 360) % 360;
    default:
      return ((value % 360) + 360) % 360;
  }
}

function parseCssNumber(token: string): number | null {
  const trimmed = token.trim();
  if (!trimmed) return null;
  if (trimmed.endsWith('%')) {
    const value = Number.parseFloat(trimmed.slice(0, -1));
    return Number.isFinite(value) ? value / 100 : null;
  }
  const value = Number.parseFloat(trimmed);
  return Number.isFinite(value) ? value : null;
}

function parseHueToken(token: string): number | null {
  const trimmed = token.trim();
  const match = /^(-?\d*\.?\d+)(deg|rad|grad|turn)?$/i.exec(trimmed);
  if (!match) return null;
  return normalizeHue(Number.parseFloat(match[1]), match[2]);
}

function linearToSrgb(value: number): number {
  if (value <= 0.0031308) return 12.92 * value;
  return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
}

function oklchToHsb(input: string): Color | null {
  const match = /^oklch\(\s*([^)]+)\s*\)$/i.exec(input.trim());
  if (!match) return null;

  const [leftPart, alphaPart] = match[1].split('/').map((part) => part.trim());
  const channels = leftPart.split(/\s+/).filter(Boolean);
  if (channels.length < 3) return null;

  const l = parseCssNumber(channels[0]);
  const c = parseCssNumber(channels[1]);
  const h = parseHueToken(channels[2]);
  const alpha = alphaPart ? parseCssNumber(alphaPart) : 1;

  if (l == null || c == null || h == null || alpha == null) return null;

  const hueRadians = (h * Math.PI) / 180;
  const a = c * Math.cos(hueRadians);
  const b = c * Math.sin(hueRadians);

  const lComponent = l + 0.3963377774 * a + 0.2158037573 * b;
  const mComponent = l - 0.1055613458 * a - 0.0638541728 * b;
  const sComponent = l - 0.0894841775 * a - 1.291485548 * b;

  const lLinear = lComponent ** 3;
  const mLinear = mComponent ** 3;
  const sLinear = sComponent ** 3;

  const redLinear = +4.0767416621 * lLinear - 3.3077115913 * mLinear + 0.2309699292 * sLinear;
  const greenLinear = -1.2684380046 * lLinear + 2.6097574011 * mLinear - 0.3413193965 * sLinear;
  const blueLinear = -0.0041960863 * lLinear - 0.7034186147 * mLinear + 1.707614701 * sLinear;

  const red = Math.round(clamp01(linearToSrgb(redLinear)) * 255);
  const green = Math.round(clamp01(linearToSrgb(greenLinear)) * 255);
  const blue = Math.round(clamp01(linearToSrgb(blueLinear)) * 255);

  const hex = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  return { ...hexToHsb(hex), a: clamp01(alpha) };
}

export const hexToHsb = (hex: string): Color => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');

  let a = 1;
  if (h.length === 8) {
    a = parseInt(h.slice(6, 8), 16) / 255;
    h = h.slice(0, 6);
  }

  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let hue = 0;
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d + 6) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue *= 60;
  }

  const saturation = max === 0 ? 0 : (d / max) * 100;
  const brightness = max * 100;

  return { h: Math.round(hue), s: Math.round(saturation), b: Math.round(brightness), a };
};

export const hsbToHex = (color: Color): string => {
  const { h, s, b, a } = color;
  const sNorm = s / 100;
  const bNorm = b / 100;

  const c = bNorm * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = bNorm - c;

  let r = 0, g = 0, bl = 0;
  if (h < 60) { r = c; g = x; bl = 0; }
  else if (h < 120) { r = x; g = c; bl = 0; }
  else if (h < 180) { r = 0; g = c; bl = x; }
  else if (h < 240) { r = 0; g = x; bl = c; }
  else if (h < 300) { r = x; g = 0; bl = c; }
  else { r = c; g = 0; bl = x; }

  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
  if (a < 1) {
    return hex + Math.round(a * 255).toString(16).padStart(2, '0');
  }
  return hex;
};

export const hsbToRgb = (color: Color): string => {
  const hex = hsbToHex(color);
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if (color.a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${color.a.toFixed(2)})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

export const formatColor = (color: Color, format: string): string => {
  switch (format) {
    case 'rgb':
      return hsbToRgb(color);
    case 'hsb':
      return `hsb(${color.h}, ${color.s}%, ${color.b}%)`;
    default:
      return hsbToHex(color);
  }
};

export const parseColor = (input: string): Color => {
  if (!input) return { h: 0, s: 100, b: 100, a: 1 };

  // hex
  if (input.startsWith('#')) {
    return hexToHsb(input);
  }

  // rgb/rgba
  const directRgb = rgbStringToHsb(input);
  if (directRgb) return directRgb;

  const directOklch = oklchToHsb(input);
  if (directOklch) return directOklch;

  const resolvedCssColor = resolveCssColor(input);
  if (resolvedCssColor) {
    const resolvedRgb = rgbStringToHsb(resolvedCssColor);
    if (resolvedRgb) return resolvedRgb;
  }

  return { h: 0, s: 100, b: 100, a: 1 };
};
