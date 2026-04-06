const PREFIX = '--ty-';

export function applyTokens(overrides: Record<string, string>): void {
  const style = document.documentElement.style;
  for (const [key, value] of Object.entries(overrides)) {
    const cssVarName = key.startsWith('--') ? key : `${PREFIX}${key}`;
    style.setProperty(cssVarName, value);
  }
}

export function removeTokens(keys: string[]): void {
  const style = document.documentElement.style;
  for (const key of keys) {
    const cssVarName = key.startsWith('--') ? key : `${PREFIX}${key}`;
    style.removeProperty(cssVarName);
  }
}

export function clearAllTokenOverrides(overrides: Record<string, string>): void {
  removeTokens(Object.keys(overrides));
}
