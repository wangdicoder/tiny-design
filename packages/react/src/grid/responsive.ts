export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const BREAKPOINT_ORDER_ASC: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
export const BREAKPOINT_ORDER_DESC: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const BREAKPOINT_VALUES: Record<Breakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 840,
  lg: 960,
  xl: 1280,
  xxl: 1440,
};

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export function isResponsiveObject<T>(value: ResponsiveValue<T> | undefined): value is Partial<Record<Breakpoint, T>> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function getActiveBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINT_VALUES.xxl) return 'xxl';
  if (width >= BREAKPOINT_VALUES.xl) return 'xl';
  if (width >= BREAKPOINT_VALUES.lg) return 'lg';
  if (width >= BREAKPOINT_VALUES.md) return 'md';
  if (width >= BREAKPOINT_VALUES.sm) return 'sm';
  return 'xs';
}

export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  breakpoint: Breakpoint,
): T | undefined {
  if (!isResponsiveObject(value)) {
    return value;
  }

  const activeIndex = BREAKPOINT_ORDER_ASC.indexOf(breakpoint);
  for (let i = activeIndex; i >= 0; i -= 1) {
    const matched = value[BREAKPOINT_ORDER_ASC[i]];
    if (matched !== undefined) {
      return matched;
    }
  }

  for (const key of BREAKPOINT_ORDER_ASC) {
    const fallback = value[key];
    if (fallback !== undefined) {
      return fallback;
    }
  }

  return undefined;
}
