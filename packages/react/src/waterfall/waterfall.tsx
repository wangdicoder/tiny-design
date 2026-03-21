import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { Breakpoint, WaterfallItem, WaterfallProps } from './types';
import useBreakpoint, { responsiveArray } from './hooks/use-breakpoint';
import usePositions, { ItemHeightData } from './hooks/use-positions';

const Waterfall = React.forwardRef<HTMLDivElement, WaterfallProps>((props, ref) => {
  const {
    prefixCls: customisedCls,
    className,
    style,
    columns = 3,
    gutter = 0,
    items,
    itemRender,
    onLayoutChange,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('waterfall', configContext.prefixCls, customisedCls);

  // ===================== Breakpoint =====================
  const screens = useBreakpoint();

  const columnCount = React.useMemo<number>(() => {
    if (typeof columns === 'number') {
      return columns;
    }

    const matchingBreakpoint = responsiveArray.find(
      (bp: Breakpoint) => screens[bp] && columns[bp] !== undefined,
    );

    if (matchingBreakpoint) {
      return columns[matchingBreakpoint] as number;
    }

    return columns.xs ?? 1;
  }, [columns, screens]);

  // ====================== Gutter ======================
  const [horizontalGutter, verticalGutter] = Array.isArray(gutter)
    ? gutter
    : [gutter, gutter];

  // =================== Item Refs ===================
  const itemRefsMap = useRef<Map<React.Key, HTMLDivElement | null>>(new Map());

  const setItemRef = useCallback((key: React.Key, el: HTMLDivElement | null) => {
    itemRefsMap.current.set(key, el);
  }, []);

  // ================= Item Heights ==================
  const [itemHeights, setItemHeights] = useState<ItemHeightData[]>([]);

  const collectItemSizes = useCallback(() => {
    if (!items || items.length === 0) {
      setItemHeights([]);
      return;
    }

    const nextHeights = items.map<ItemHeightData>((item, index) => {
      const key = item.key ?? index;
      const el = itemRefsMap.current.get(key);
      const height = el ? el.getBoundingClientRect().height : 0;
      return [key, height, item.column];
    });

    setItemHeights((prev) => {
      const isSame =
        prev.length === nextHeights.length &&
        prev.every((p, i) => p[0] === nextHeights[i][0] && p[1] === nextHeights[i][1]);
      return isSame ? prev : nextHeights;
    });
  }, [items]);

  // ================= Positions ==================
  const [itemPositions, totalHeight] = usePositions(itemHeights, columnCount, verticalGutter);

  // Collect sizes on items/columns change
  useEffect(() => {
    collectItemSizes();
  }, [items, columnCount, collectItemSizes]);

  // ResizeObserver for dynamic content
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      collectItemSizes();
    });

    for (const [, el] of itemRefsMap.current) {
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items, collectItemSizes]);

  // ================ onLayoutChange ================
  useEffect(() => {
    if (!onLayoutChange || !items || items.length === 0) return;

    const allPositioned = items.every((item) => itemPositions.has(item.key));
    if (!allPositioned) return;

    const sortInfo = items.map((item) => ({
      key: item.key,
      column: itemPositions.get(item.key)!.column,
    }));
    onLayoutChange(sortInfo);
  }, [itemPositions, items, onLayoutChange]);

  // ==================== Render ====================
  const cls = classNames(prefixCls, className);

  const containerStyle: React.CSSProperties = {
    ...style,
    position: 'relative',
    height: totalHeight || undefined,
  };

  const mergedItems = items || [];

  return (
    <div
      ref={ref}
      {...otherProps}
      className={cls}
      style={containerStyle}
      onLoad={collectItemSizes}
      onError={collectItemSizes}
    >
      <TransitionGroup component={null}>
        {mergedItems.map((item, index) => {
          const key = item.key ?? index;
          const position = itemPositions.get(key);
          const hasPosition = !!position;
          const columnIndex = position?.column ?? 0;

          const itemStyle: React.CSSProperties = {
            position: 'absolute',
            width: `calc((100% - ${horizontalGutter * (columnCount - 1)}px) / ${columnCount})`,
            left: `calc((100% - ${horizontalGutter * (columnCount - 1)}px) / ${columnCount} * ${columnIndex} + ${horizontalGutter * columnIndex}px)`,
            top: position?.top ?? 0,
            // Only transition position changes after initial placement
            transition: hasPosition ? 'top 0.3s ease, left 0.3s ease, opacity 0.3s ease' : 'none',
            // Hide until position is computed so items don't flash at (0,0)
            opacity: hasPosition ? 1 : 0,
          };

          const content = item.children ?? itemRender?.({ ...item, index, column: columnIndex });

          return (
            <CSSTransition
              key={key}
              timeout={300}
              classNames={`${prefixCls}__item-fade`}
              onExited={() => {
                itemRefsMap.current.delete(key);
                collectItemSizes();
              }}
            >
              <div
                ref={(el) => setItemRef(key, el)}
                className={`${prefixCls}__item`}
                style={itemStyle}
              >
                {content}
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
});

Waterfall.displayName = 'Waterfall';

export default Waterfall;
