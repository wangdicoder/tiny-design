import React, { useContext, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { resolveTargetContainer } from '../config-provider/container-utils';
import { getPrefixCls } from '../_utils/general';
import { AnchorLinkProps, AnchorProps } from './types';
import { AnchorContext } from './anchor-context';
import Sticky from '../sticky';

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null): void {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  (ref as React.MutableRefObject<T | null>).current = value;
}

const Anchor = React.forwardRef<HTMLUListElement, AnchorProps>((props, ref): JSX.Element => {
  const {
    affix = false,
    offsetTop = 0,
    offsetBottom,
    type = 'dot',
    getContainer,
    onChange,
    onClick,
    className,
    style,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('anchor', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, { [`${prefixCls}_line`]: type === 'line' }, className);
  const [activeId, setActiveId] = useState('');
  const anchorRef = useRef<HTMLUListElement | null>(null);
  const inkBallRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<Set<string>>(new Set());

  const registerLink = useCallback((href: string) => {
    linksRef.current.add(href);
  }, []);

  const unregisterLink = useCallback((href: string) => {
    linksRef.current.delete(href);
  }, []);

  const setAnchorNode = useCallback(
    (node: HTMLUListElement | null) => {
      anchorRef.current = node;
      assignRef(ref, node);
    },
    [ref]
  );

  const updateInk = useCallback(() => {
    const anchorEl = anchorRef.current;
    if (!anchorEl) return;
    const activeNodes = anchorEl.getElementsByClassName(`${prefixCls}__link_active`);
    const inkEl = inkBallRef.current;
    // Use the last (deepest) active link so the ink ball targets the child, not the parent
    const linkNode = activeNodes[activeNodes.length - 1];
    if (linkNode && inkEl) {
      // Use the <a> title element, not the <li> (which includes nested children)
      const titleEl = linkNode.querySelector(`.${prefixCls}__link-title`);
      const targetEl = titleEl || linkNode;
      const anchorRect = anchorEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      if (type === 'line') {
        inkEl.style.top = `${targetRect.top - anchorRect.top}px`;
        inkEl.style.height = `${targetEl.clientHeight}px`;
      } else {
        inkEl.style.top = `${targetRect.top - anchorRect.top + targetEl.clientHeight / 2 - 4.5}px`;
      }
    }
  }, [prefixCls, type]);

  const getScrollContainer = useCallback((): HTMLElement | Window => {
    return resolveTargetContainer(configContext, getContainer);
  }, [configContext, getContainer]);

  const scrollToAnchor = useCallback(
    (anchorName: string): void => {
      const element = document.getElementById(anchorName);
      if (!element) return;

      const scrollContainer = resolveTargetContainer(configContext, getContainer);
      if (scrollContainer && scrollContainer !== window) {
        const container = scrollContainer as HTMLElement;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        container.scrollTo({
          top: container.scrollTop + elementRect.top - containerRect.top,
          behavior: 'smooth',
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [configContext, getContainer]
  );

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorName: string) => {
    onClick?.(e, { title: anchorName, href: `#${anchorName}` });
    const { location } = window;
    let url;
    // if it is a HashRouter mode, prevent the default event and update the query.
    if (location.pathname.includes('/#/')) {
      url = location.protocol + '//' + location.host + location.pathname + `?anchor=${anchorName}`;
    } else {
      url = location.protocol + '//' + location.host + location.pathname + `#${anchorName}`;
    }
    window.history.pushState({ path: url }, '', url);
    scrollToAnchor(anchorName);
  };

  /**
   * If the url contains the hash, check whether there is an element can be scrolled into
   */
  const initHashScroll = useCallback(() => {
    const { location } = window;
    if (location.search) {
      const urlParams = new URLSearchParams(location.search);
      const anchor = urlParams.get('anchor');
      !!anchor && scrollToAnchor(anchor);
    } else if (location.hash) {
      const anchor = location.hash.replace('#', '');
      !!anchor && scrollToAnchor(anchor);
    }
  }, [scrollToAnchor]);

  const handleScroll = useCallback(() => {
    const links = linksRef.current;
    if (links.size === 0) return;

    const targetContainer = resolveTargetContainer(configContext, getContainer);
    const container = targetContainer && targetContainer !== window ? (targetContainer as HTMLElement) : undefined;
    const containerTop = container
      ? container.getBoundingClientRect().top
      : 0;

    // Check if scrolled to the bottom
    let isAtBottom = false;
    if (container) {
      isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
    } else {
      isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
    }

    let newActiveId = '';
    let maxTop = -Infinity;
    let firstId = '';
    let firstTop = Infinity;
    // Track the last heading visible in the viewport (for bottom-of-page case)
    let lastVisibleId = '';
    let lastVisibleTop = -Infinity;
    const viewportHeight = container ? container.clientHeight : window.innerHeight;

    links.forEach((href) => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;
      const elTop = el.getBoundingClientRect().top - containerTop;
      if (elTop < firstTop) {
        firstTop = elTop;
        firstId = id;
      }
      if (elTop <= offsetTop && elTop > maxTop) {
        maxTop = elTop;
        newActiveId = id;
      }
      // Track headings visible in the viewport
      if (elTop >= 0 && elTop <= viewportHeight && elTop > lastVisibleTop) {
        lastVisibleTop = elTop;
        lastVisibleId = id;
      }
    });

    // When scrolled to the bottom, use the last visible heading
    if (isAtBottom && lastVisibleId) {
      newActiveId = lastVisibleId;
    } else if (!newActiveId && firstId) {
      newActiveId = firstId;
    }

    setActiveId((prev) => {
      if (prev !== newActiveId) {
        onChange?.(`#${newActiveId}`);
      }
      return newActiveId;
    });
  }, [configContext, onChange, getContainer, offsetTop]);

  useEffect(() => {
    updateInk();
  }, [activeId, updateInk]);

  useEffect(() => {
    initHashScroll();
  }, [initHashScroll]);

  useEffect(() => {
    const scrollTarget = getScrollContainer();
    scrollTarget.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, getScrollContainer]);

  const contextValue = useMemo(
    () => ({ activeId, onClick: handleLinkClick, registerLink, unregisterLink }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeId, registerLink, unregisterLink]
  );

  const anchorContent = (
    <ul {...otherProps} className={cls} style={style} ref={setAnchorNode}>
      <div className={`${prefixCls}__ink`}>
        <div className={`${prefixCls}__ink-ball`} ref={inkBallRef} />
      </div>
      {React.Children.map(children, (child) => {
        const childElement = child as React.FunctionComponentElement<AnchorLinkProps>;
        if (childElement.type.displayName === 'AnchorLink') {
          const childProps: Partial<AnchorLinkProps> = {
            prefixCls,
          };
          return React.cloneElement(childElement, childProps);
        }
        return null;
      })}
    </ul>
  );

  return (
    <AnchorContext.Provider value={contextValue}>
      {affix ? (
        <Sticky offsetTop={offsetTop} offsetBottom={offsetBottom}>
          {anchorContent}
        </Sticky>
      ) : (
        anchorContent
      )}
    </AnchorContext.Provider>
  );
});

Anchor.displayName = 'Anchor';

export default Anchor;
