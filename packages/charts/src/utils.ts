/**
 * Safely reads a field from a Recharts payload entry.
 * Used by both tooltip and legend to resolve nameKey / labelKey.
 */
export function getPayloadValue(
  source: Record<string, unknown> | null | undefined,
  key: string | undefined
): unknown {
  if (!source || !key || typeof source !== 'object') {
    return undefined;
  }

  return (source as Record<string, unknown>)[key];
}
