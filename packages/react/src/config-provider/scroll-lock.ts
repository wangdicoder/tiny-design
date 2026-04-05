type ScrollLockEntry = {
  count: number;
  overflow: string;
};

const scrollLockMap = new WeakMap<HTMLElement, ScrollLockEntry>();

function resolveScrollLockTarget(container?: HTMLElement | Window | null): HTMLElement | null {
  if (typeof document === 'undefined') {
    return null;
  }

  if (!container || container === window) {
    return document.body;
  }

  return container as HTMLElement;
}

export function acquireScrollLock(container?: HTMLElement | Window | null): () => void {
  const target = resolveScrollLockTarget(container);

  if (!target) {
    return () => undefined;
  }

  const current = scrollLockMap.get(target);

  if (current) {
    current.count += 1;
  } else {
    scrollLockMap.set(target, {
      count: 1,
      overflow: target.style.overflow,
    });
    target.style.overflow = 'hidden';
  }

  let released = false;

  return () => {
    if (released) {
      return;
    }

    released = true;

    const entry = scrollLockMap.get(target);

    if (!entry) {
      return;
    }

    entry.count -= 1;

    if (entry.count <= 0) {
      target.style.overflow = entry.overflow;
      scrollLockMap.delete(target);
      return;
    }

    scrollLockMap.set(target, entry);
  };
}
