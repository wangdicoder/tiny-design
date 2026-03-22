const PREFIX = '--ty-';

export function applyTokens(overrides: Record<string, string>): void {
  const style = document.documentElement.style;
  for (const [key, value] of Object.entries(overrides)) {
    style.setProperty(`${PREFIX}${key}`, value);
  }
}

export function removeTokens(keys: string[]): void {
  const style = document.documentElement.style;
  for (const key of keys) {
    style.removeProperty(`${PREFIX}${key}`);
  }
}

export function clearAllTokenOverrides(overrides: Record<string, string>): void {
  removeTokens(Object.keys(overrides));
}
