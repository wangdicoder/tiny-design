import { useEffect, useState } from 'react';
import { Breakpoint } from '../types';

const breakpointMap: Record<Breakpoint, string> = {
  xxl: '(min-width: 1600px)',
  xl: '(min-width: 1200px)',
  lg: '(min-width: 992px)',
  md: '(min-width: 768px)',
  sm: '(min-width: 576px)',
  xs: '(max-width: 575.98px)',
};

const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

type Screens = Partial<Record<Breakpoint, boolean>>;

export { responsiveArray };

export default function useBreakpoint(): Screens {
  const [screens, setScreens] = useState<Screens>({});

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const queries = new Map<Breakpoint, MediaQueryList>();

    const update = () => {
      const next: Screens = {};
      for (const bp of responsiveArray) {
        const mql = queries.get(bp);
        if (mql) {
          next[bp] = mql.matches;
        }
      }
      setScreens(next);
    };

    for (const bp of responsiveArray) {
      const mql = window.matchMedia(breakpointMap[bp]);
      queries.set(bp, mql);
      mql.addEventListener('change', update);
    }

    update();

    return () => {
      for (const [, mql] of queries) {
        mql.removeEventListener('change', update);
      }
    };
  }, []);

  return screens;
}
