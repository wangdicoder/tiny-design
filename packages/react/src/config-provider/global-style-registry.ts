/**
 * Stack-based registry for global styles and attributes on <html>.
 *
 * Multiple ConfigProvider instances may coexist and set overlapping values.
 * Each provider gets a stable id (Symbol). Values are stacked per-key:
 * the topmost (last-registered, not-yet-released) entry wins.
 * When a provider unmounts, the previous value is restored automatically.
 */

type Entry = { id: symbol; value: string };

// ---- theme mode ----

const modeStack: Entry[] = [];

export function acquireMode(id: symbol, mode: string): void {
  const idx = modeStack.findIndex((e) => e.id === id);
  if (idx !== -1) modeStack.splice(idx, 1);
  modeStack.push({ id, value: mode });
  document.documentElement.setAttribute('data-tiny-theme', mode);
}

export function releaseMode(id: symbol): void {
  const idx = modeStack.findIndex((e) => e.id === id);
  if (idx !== -1) modeStack.splice(idx, 1);
  if (modeStack.length > 0) {
    document.documentElement.setAttribute('data-tiny-theme', modeStack[modeStack.length - 1].value);
  } else {
    document.documentElement.removeAttribute('data-tiny-theme');
  }
}

// ---- CSS custom properties ----

const propStacks = new Map<string, Entry[]>();

export function acquireProps(id: symbol, vars: Record<string, string>): void {
  const style = document.documentElement.style;
  for (const [key, value] of Object.entries(vars)) {
    let stack = propStacks.get(key);
    if (!stack) {
      stack = [];
      propStacks.set(key, stack);
    }
    const idx = stack.findIndex((e) => e.id === id);
    if (idx !== -1) stack.splice(idx, 1);
    stack.push({ id, value });
    style.setProperty(key, value);
  }
}

export function releaseProps(id: symbol, keys: string[]): void {
  const style = document.documentElement.style;
  for (const key of keys) {
    const stack = propStacks.get(key);
    if (!stack) continue;
    const idx = stack.findIndex((e) => e.id === id);
    if (idx !== -1) stack.splice(idx, 1);
    if (stack.length > 0) {
      style.setProperty(key, stack[stack.length - 1].value);
    } else {
      propStacks.delete(key);
      style.removeProperty(key);
    }
  }
}
