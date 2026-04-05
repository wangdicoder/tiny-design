export type Target = HTMLElement | Window;

export const getScroll = (node: Target, isVertical = true): number => {
  if (typeof window === 'undefined') {
    return 0;
  }
  const windowProp = isVertical ? 'scrollY' : 'scrollX';
  const elementProp = isVertical ? 'scrollTop' : 'scrollLeft';
  return node === window ? (node as Window)[windowProp] : (node as HTMLElement)[elementProp];
};

export const getRect = (node: Target = window) => {
  return node !== window
    ? (node as HTMLElement).getBoundingClientRect()
    : {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight,
      };
};

/**
 * Get element absolute position relative to the root
 * @param node
 */
export const getAbsolutePosition = (node: Target = window): { x: number; y: number } => {
  if (node === window) {
    return { x: 0, y: 0 };
  }
  const x =
    (node as HTMLElement).getBoundingClientRect().left + document.documentElement.scrollLeft;
  const y = (node as HTMLElement).getBoundingClientRect().top + document.documentElement.scrollTop;
  return { x, y };
};

export const getNodeHeight = (node: Target): number => {
  if (!node) {
    return 0;
  }
  if (node === window) {
    return window.innerHeight;
  }
  return (node as HTMLElement).clientHeight;
};

export const getNodeScrollHeight = (node: Target): number => {
  if (!node) {
    return 0;
  }

  if (node === window) {
    return window.document.documentElement.scrollHeight;
  }
  return (node as HTMLElement).scrollHeight;
};

export const getScrollParents = (node: HTMLElement | null): Array<HTMLElement | Window> => {
  if (typeof window === 'undefined' || !node) {
    return [];
  }

  const parents = new Set<HTMLElement | Window>();
  let current: HTMLElement | null = node.parentElement;

  while (current) {
    const style = window.getComputedStyle(current);
    const overflow = `${style.overflow}${style.overflowX}${style.overflowY}`;

    if (/(auto|scroll|overlay)/.test(overflow)) {
      parents.add(current);
    }

    current = current.parentElement;
  }

  parents.add(window);

  return Array.from(parents);
};
