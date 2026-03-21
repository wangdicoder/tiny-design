import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type TransitionState =
  | 'unmounted'
  | 'enter'
  | 'entering'
  | 'entered'
  | 'exit'
  | 'exiting'
  | 'exited';

export interface UseTransitionOptions {
  in: boolean;
  timeout?: number | { enter: number; exit: number };
  appear?: boolean;
  unmountOnExit?: boolean;
  mountOnEnter?: boolean;
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  nodeRef?: React.RefObject<HTMLElement | null>;
}

export interface UseTransitionResult {
  state: TransitionState;
  shouldMount: boolean;
}

function normalizeTimeout(
  timeout: number | { enter: number; exit: number } | undefined
): { enter: number; exit: number } {
  if (timeout == null) return { enter: 300, exit: 300 };
  if (typeof timeout === 'number') return { enter: timeout, exit: timeout };
  return timeout;
}

function useTransition(options: UseTransitionOptions): UseTransitionResult {
  const {
    in: inProp,
    timeout,
    appear = true,
    unmountOnExit = true,
    mountOnEnter = false,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    nodeRef,
  } = options;

  const normalizedTimeout = normalizeTimeout(timeout);

  // Determine initial state
  const getInitialState = (): TransitionState => {
    if (inProp) {
      return appear ? 'enter' : 'entered';
    }
    if (unmountOnExit || mountOnEnter) {
      return 'unmounted';
    }
    return 'exited';
  };

  const [state, setState] = useState<TransitionState>(getInitialState);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<number>(0);
  const transitionEndRef = useRef<(() => void) | null>(null);
  const initialMountRef = useRef(true);

  // Store latest callbacks in refs to avoid re-triggering effects
  const callbacksRef = useRef({
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  });
  callbacksRef.current = {
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  };

  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = 0;
    }
    if (transitionEndRef.current && nodeRef?.current) {
      nodeRef.current.removeEventListener('transitionend', transitionEndRef.current);
      transitionEndRef.current = null;
    }
  }, [nodeRef]);

  const waitForTransition = useCallback(
    (phase: 'enter' | 'exit', done: () => void) => {
      const safetyDuration =
        phase === 'enter' ? normalizedTimeout.enter : normalizedTimeout.exit;

      // timeout=0 means "don't wait" — advance immediately.
      // This matches react-transition-group's behavior where timeout=0
      // skips straight to the done state, letting CSS handle the animation
      // via the base element's transition property.
      if (safetyDuration === 0) {
        done();
        return;
      }

      const finish = () => {
        cleanup();
        done();
      };

      // Try transitionend listener first
      const node = nodeRef?.current;
      if (node) {
        const handler = (e: Event) => {
          if ((e as TransitionEvent).target === node) {
            finish();
          }
        };
        transitionEndRef.current = handler as () => void;
        node.addEventListener('transitionend', handler);
      }

      // Safety timeout fallback
      timerRef.current = window.setTimeout(finish, safetyDuration + 50);
    },
    [cleanup, nodeRef, normalizedTimeout.enter, normalizedTimeout.exit]
  );

  // Continue the enter animation after DOM is committed (state === 'enter').
  // useLayoutEffect fires synchronously after DOM mutations, guaranteeing
  // the child is mounted and refs are populated before onEnter runs.
  useLayoutEffect(() => {
    if (state === 'enter') {
      callbacksRef.current.onEnter?.();

      // Single rAF: useLayoutEffect runs before paint, so one rAF is enough
      // to ensure the browser has painted the -enter class before we add -enter-active.
      rafRef.current = requestAnimationFrame(() => {
        setState('entering');
        callbacksRef.current.onEntering?.();

        waitForTransition('enter', () => {
          setState('entered');
          callbacksRef.current.onEntered?.();
        });
      });
    }
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  // Continue the exit animation after DOM reflects exit state
  useLayoutEffect(() => {
    if (state === 'exit') {
      callbacksRef.current.onExit?.();

      rafRef.current = requestAnimationFrame(() => {
        setState('exiting');
        callbacksRef.current.onExiting?.();

        waitForTransition('exit', () => {
          setState((prev) => {
            if (prev === 'exiting') {
              callbacksRef.current.onExited?.();
              return unmountOnExit ? 'unmounted' : 'exited';
            }
            return prev;
          });
        });
      });
    }
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  // React to `in` prop changes — only set the initial phase state.
  // The useLayoutEffect above handles the rest after DOM commit.
  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      // On initial mount with appear=true, state is already 'enter' from getInitialState,
      // and the useLayoutEffect above will pick it up.
      return;
    }

    if (inProp) {
      cleanup();
      setState('enter');
    } else {
      cleanup();
      setState('exit');
    }
  }, [inProp]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const shouldMount = state !== 'unmounted';

  return { state, shouldMount };
}

export default useTransition;
