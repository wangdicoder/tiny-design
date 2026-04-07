import { useEffect, useState } from 'react';
import { Breakpoint, getActiveBreakpoint } from './responsive';

function getWindowWidth(): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  return window.innerWidth;
}

export function useActiveBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => getActiveBreakpoint(getWindowWidth()));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      setBreakpoint(getActiveBreakpoint(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
