/**
 * Ref-counted registry for global styles and attributes on <html>.
 *
 * Multiple ConfigProvider instances may coexist.  Each one calls acquire()
 * when it applies a value and release() when it unmounts or its deps change.
 * The actual DOM mutation (set / remove) only happens on the first acquire
 * and when the last holder releases.
 */

// theme-mode ref count
let modeCount = 0;

export function acquireMode(mode: string): void {
  modeCount++;
  document.documentElement.setAttribute('data-tiny-theme', mode);
}

export function releaseMode(): void {
  modeCount = Math.max(0, modeCount - 1);
  if (modeCount === 0) {
    document.documentElement.removeAttribute('data-tiny-theme');
  }
}

// CSS custom-property ref counts  (key → count)
const propCounts = new Map<string, number>();

export function acquireProps(vars: Record<string, string>): void {
  const style = document.documentElement.style;
  for (const [key, value] of Object.entries(vars)) {
    propCounts.set(key, (propCounts.get(key) ?? 0) + 1);
    style.setProperty(key, value);
  }
}

export function releaseProps(keys: string[]): void {
  const style = document.documentElement.style;
  for (const key of keys) {
    const count = (propCounts.get(key) ?? 1) - 1;
    if (count <= 0) {
      propCounts.delete(key);
      style.removeProperty(key);
    } else {
      propCounts.set(key, count);
    }
  }
}
