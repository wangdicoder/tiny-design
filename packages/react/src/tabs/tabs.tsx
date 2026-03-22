import React, { useContext, useId, useRef, useState, useEffect, useCallback, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { TabsProps, TabItem, TabPanelProps } from './types';

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (props: TabsProps, ref): React.ReactElement => {
    const {
      type = 'line',
      tabPosition = 'top',
      size = 'md',
      animated = true,
      centered = false,
      destroyInactiveTabPane = false,
      hideAdd = false,
      activeKey,
      defaultActiveKey,
      items,
      tabBarExtraContent,
      tabBarGutter,
      tabBarStyle,
      onChange,
      onTabClick,
      onEdit,
      className,
      children,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('tabs', configContext.prefixCls, customisedCls);

    // Resolve items from either `items` prop or `children`
    const resolvedItems: TabItem[] = items ?? resolveItemsFromChildren(children);

    const getDefaultKey = (): string => {
      if (defaultActiveKey !== undefined) return defaultActiveKey;
      const first = resolvedItems.find((item) => !item.disabled);
      return first?.key ?? '';
    };

    const [currentKey, setCurrentKey] = useState<string>(activeKey ?? getDefaultKey());
    const [inkStyle, setInkStyle] = useState<CSSProperties>({});
    const baseId = useId();
    const [scrollOffset, setScrollOffset] = useState(0);
    const [showNav, setShowNav] = useState(false);
    const navWrapRef = useRef<HTMLDivElement>(null);
    const navListRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const isHorizontal = tabPosition === 'top' || tabPosition === 'bottom';

    // Controlled mode
    useEffect(() => {
      if (activeKey !== undefined) {
        setCurrentKey(activeKey);
      }
    }, [activeKey]);

    // Update ink indicator
    const updateInk = useCallback(() => {
      if (type !== 'line') return;
      const el = tabRefs.current.get(currentKey);
      if (!el) return;

      if (isHorizontal) {
        setInkStyle({
          width: el.offsetWidth,
          transform: `translate3d(${el.offsetLeft}px, 0, 0)`,
        });
      } else {
        setInkStyle({
          height: el.offsetHeight,
          transform: `translate3d(0, ${el.offsetTop}px, 0)`,
        });
      }
    }, [currentKey, type, isHorizontal]);

    // Check overflow for scroll arrows
    const checkOverflow = useCallback(() => {
      const wrap = navWrapRef.current;
      const list = navListRef.current;
      if (!wrap || !list) return;
      setShowNav(
        isHorizontal
          ? list.scrollWidth > wrap.clientWidth
          : list.scrollHeight > wrap.clientHeight
      );
    }, [isHorizontal]);

    useEffect(() => {
      updateInk();
      checkOverflow();
    }, [updateInk, checkOverflow]);

    const handleTabClick = (key: string, disabled: boolean | undefined, e: React.MouseEvent) => {
      if (disabled) return;
      onTabClick?.(key, e);
      if (activeKey === undefined) {
        setCurrentKey(key);
      }
      onChange?.(key);
    };

    const handleRemove = (key: string, e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit?.(key, 'remove');
    };

    const handleAdd = (e: React.MouseEvent) => {
      onEdit?.(e, 'add');
    };

    const handleTabKeyDown = (e: React.KeyboardEvent, itemIndex: number) => {
      const enabledItems = resolvedItems.filter((item) => !item.disabled);
      const currentEnabledIdx = enabledItems.findIndex((item) => item.key === resolvedItems[itemIndex].key);
      let targetItem: TabItem | undefined;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = currentEnabledIdx <= 0 ? enabledItems.length - 1 : currentEnabledIdx - 1;
        targetItem = enabledItems[prevIdx];
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = currentEnabledIdx >= enabledItems.length - 1 ? 0 : currentEnabledIdx + 1;
        targetItem = enabledItems[nextIdx];
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetItem = enabledItems[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        targetItem = enabledItems[enabledItems.length - 1];
      }

      if (targetItem) {
        const el = tabRefs.current.get(targetItem.key);
        el?.focus();
        handleTabClick(targetItem.key, targetItem.disabled, e as unknown as React.MouseEvent);
      }
    };

    // Scroll navigation
    const scrollStep = 200;
    const getMaxScroll = () => {
      const wrap = navWrapRef.current;
      const list = navListRef.current;
      if (!wrap || !list) return 0;
      return isHorizontal
        ? list.scrollWidth - wrap.clientWidth
        : list.scrollHeight - wrap.clientHeight;
    };

    const scrollPrev = () => setScrollOffset((prev) => Math.max(0, prev - scrollStep));
    const scrollNext = () => setScrollOffset((prev) => Math.min(getMaxScroll(), prev + scrollStep));

    // Ensure active tab is scrolled into view
    useEffect(() => {
      const el = tabRefs.current.get(currentKey);
      const wrap = navWrapRef.current;
      if (!el || !wrap || !showNav) return;

      if (isHorizontal) {
        const wrapWidth = wrap.clientWidth;
        if (wrapWidth <= 0) return;
        const elLeft = el.offsetLeft;
        const elRight = elLeft + el.offsetWidth;
        if (elLeft < scrollOffset) {
          setScrollOffset(elLeft);
        } else if (elRight > scrollOffset + wrapWidth) {
          setScrollOffset(elRight - wrapWidth);
        }
      }
    }, [currentKey, showNav, isHorizontal, scrollOffset]);

    // Extra content
    const isExtraObj = tabBarExtraContent != null
      && typeof tabBarExtraContent === 'object'
      && !React.isValidElement(tabBarExtraContent)
      && ('left' in tabBarExtraContent || 'right' in tabBarExtraContent);
    const extraLeft: React.ReactNode = isExtraObj
      ? (tabBarExtraContent as { left?: React.ReactNode }).left ?? null
      : null;
    const extraRight: React.ReactNode = isExtraObj
      ? (tabBarExtraContent as { right?: React.ReactNode }).right ?? null
      : (tabBarExtraContent as React.ReactNode) ?? null;

    // Class names
    const isVertical = !isHorizontal;
    const cls = classNames(prefixCls, className, `${prefixCls}_${size}`, {
      [`${prefixCls}_${tabPosition}`]: true,
      [`${prefixCls}_${type}`]: true,
      [`${prefixCls}_vertical`]: isVertical,
      [`${prefixCls}_centered`]: centered,
    });

    const navScrollStyle: CSSProperties = isHorizontal
      ? { transform: `translate3d(${-scrollOffset}px, 0, 0)` }
      : { transform: `translate3d(0, ${-scrollOffset}px, 0)` };

    const prevDisabled = scrollOffset === 0;
    const nextDisabled = scrollOffset >= getMaxScroll();

    return (
      <div {...otherProps} ref={ref} className={cls}>
        {tabPosition === 'bottom' && (
          <div className={`${prefixCls}__content`}>
            {renderPanels(resolvedItems, currentKey, prefixCls, animated, isHorizontal, destroyInactiveTabPane, baseId)}
          </div>
        )}
        <div
          className={classNames(`${prefixCls}__nav`, {
            [`${prefixCls}__nav_overflow`]: showNav,
          })}
          style={tabBarStyle}
          role="tablist">
          {extraLeft && <div className={`${prefixCls}__nav-extra_left`}>{extraLeft}</div>}
          {showNav && (
            <button
              className={classNames(`${prefixCls}__nav-prev`, {
                [`${prefixCls}__nav-btn_disabled`]: prevDisabled,
              })}
              disabled={prevDisabled}
              onClick={scrollPrev}
              type="button"
              aria-label="Previous tabs">
              ‹
            </button>
          )}
          <div className={`${prefixCls}__nav-wrap`} ref={navWrapRef}>
            <div
              className={`${prefixCls}__nav-list`}
              ref={navListRef}
              style={showNav ? navScrollStyle : undefined}>
              {resolvedItems.map((item, idx) => {
                const isActive = item.key === currentKey;
                const tabCls = classNames(`${prefixCls}__tab`, {
                  [`${prefixCls}__tab_active`]: isActive,
                  [`${prefixCls}__tab_disabled`]: item.disabled,
                });
                const gutter = tabBarGutter !== undefined ? { marginRight: tabBarGutter } : undefined;
                return (
                  <div
                    key={item.key}
                    ref={(el) => {
                      if (el) tabRefs.current.set(item.key, el);
                      else tabRefs.current.delete(item.key);
                    }}
                    className={tabCls}
                    style={gutter}
                    role="tab"
                    id={`${baseId}-tab-${item.key}`}
                    aria-selected={isActive}
                    aria-disabled={item.disabled}
                    aria-controls={`${baseId}-panel-${item.key}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={(e) => handleTabClick(item.key, item.disabled, e)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}>
                    {item.icon && <span className={`${prefixCls}__tab-icon`}>{item.icon}</span>}
                    <span className={`${prefixCls}__tab-label`}>{item.label}</span>
                    {type === 'editable-card' && item.closable !== false && (
                      <span
                        className={`${prefixCls}__tab-remove`}
                        onClick={(e) => handleRemove(item.key, e)}
                        role="button"
                        aria-label="Remove tab">
                        ✕
                      </span>
                    )}
                  </div>
                );
              })}
              {type === 'line' && (
                <div className={`${prefixCls}__ink-bar`} style={inkStyle} />
              )}
            </div>
          </div>
          {showNav && (
            <button
              className={classNames(`${prefixCls}__nav-next`, {
                [`${prefixCls}__nav-btn_disabled`]: nextDisabled,
              })}
              disabled={nextDisabled}
              onClick={scrollNext}
              type="button"
              aria-label="Next tabs">
              ›
            </button>
          )}
          {type === 'editable-card' && !hideAdd && (
            <button
              className={`${prefixCls}__nav-add`}
              onClick={handleAdd}
              type="button"
              aria-label="Add tab">
              +
            </button>
          )}
          {extraRight && <div className={`${prefixCls}__nav-extra_right`}>{extraRight}</div>}
        </div>
        {tabPosition !== 'bottom' && (
          <div className={`${prefixCls}__content`}>
            {renderPanels(resolvedItems, currentKey, prefixCls, animated, isHorizontal, destroyInactiveTabPane, baseId)}
          </div>
        )}
      </div>
    );
  }
);

function resolveItemsFromChildren(children: React.ReactNode): TabItem[] {
  const items: TabItem[] = [];
  React.Children.forEach(children, (child, idx) => {
    if (!React.isValidElement<TabPanelProps>(child)) return;
    const { tab, tabKey, disabled, closable, forceRender, children: content } = child.props;
    items.push({
      key: tabKey ?? String(idx),
      label: tab,
      children: content,
      disabled,
      closable,
      forceRender,
    });
  });
  return items;
}

function renderPanels(
  items: TabItem[],
  currentKey: string,
  prefixCls: string,
  animated: boolean,
  isHorizontal: boolean,
  destroyInactive: boolean,
  baseId?: string
): React.ReactNode {
  const activeIdx = items.findIndex((item) => item.key === currentKey);
  const containerStyle: CSSProperties = animated && isHorizontal
    ? { transform: `translate3d(${-activeIdx * 100}%, 0, 0)` }
    : {};

  const containerCls = classNames(`${prefixCls}__content-inner`, {
    [`${prefixCls}__content-inner_animated`]: animated && isHorizontal,
  });

  return (
    <div className={containerCls} style={containerStyle}>
      {items.map((item) => {
        const isActive = item.key === currentKey;
        const panelCls = classNames(`${prefixCls}__panel`, {
          [`${prefixCls}__panel_active`]: isActive,
        });

        if (destroyInactive && !isActive && !item.forceRender) {
          return <div key={item.key} className={panelCls} role="tabpanel" id={baseId ? `${baseId}-panel-${item.key}` : undefined} aria-labelledby={baseId ? `${baseId}-tab-${item.key}` : undefined} />;
        }

        return (
          <div key={item.key} className={panelCls} role="tabpanel" id={baseId ? `${baseId}-panel-${item.key}` : undefined} aria-labelledby={baseId ? `${baseId}-tab-${item.key}` : undefined}>
            {item.children}
          </div>
        );
      })}
    </div>
  );
}

Tabs.displayName = 'Tabs';

export default Tabs;
