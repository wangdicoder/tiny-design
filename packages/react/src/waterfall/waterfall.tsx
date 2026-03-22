import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Transition from '../transition';
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
  const prevLayoutRef = useRef<string>('');

  useEffect(() => {
    if (!onLayoutChange || !items || items.length === 0) return;

    const allPositioned = items.every((item) => itemPositions.has(item.key));
    if (!allPositioned) return;

    const sortInfo = items.map((item) => ({
      key: item.key,
      column: itemPositions.get(item.key)!.column,
    }));

    const layoutKey = sortInfo.map((s) => `${s.key}:${s.column}`).join(',');
    if (layoutKey === prevLayoutRef.current) return;
    prevLayoutRef.current = layoutKey;

    onLayoutChange(sortInfo);
  }, [itemPositions, items, onLayoutChange]);

  // ============== Exiting items (replaces TransitionGroup) ==============
  const prevItemsRef = useRef<WaterfallItem[]>(items || []);
  const [exitingItems, setExitingItems] = useState<Map<React.Key, WaterfallItem>>(new Map());

  useEffect(() => {
    const currentKeys = new Set((items || []).map((item, i) => item.key ?? i));
    const removed = new Map<React.Key, WaterfallItem>();

    prevItemsRef.current.forEach((item, index) => {
      const key = item.key ?? index;
      if (!currentKeys.has(key)) {
        removed.set(key, item);
      }
    });

    if (removed.size > 0) {
      setExitingItems((prev) => {
        const next = new Map(prev);
        removed.forEach((item, key) => next.set(key, item));
        return next;
      });
    }

    prevItemsRef.current = items || [];
  }, [items]);

  const handleExited = useCallback((key: React.Key) => {
    itemRefsMap.current.delete(key);
    setExitingItems((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
    collectItemSizes();
  }, [collectItemSizes]);

  // ==================== Render ====================
  const cls = classNames(prefixCls, className);

  const containerStyle: React.CSSProperties = {
    ...style,
    position: 'relative',
    height: totalHeight || undefined,
  };

  const mergedItems = items || [];

  const renderItem = (item: WaterfallItem, index: number, isExiting: boolean) => {
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
      <Transition
        key={key}
        in={!isExiting}
        timeout={300}
        appear={false}
        unmountOnExit={true}
        classNames={`${prefixCls}__item-fade`}
        onExited={() => handleExited(key)}
      >
        <div
          ref={(el) => setItemRef(key, el)}
          className={`${prefixCls}__item`}
          style={itemStyle}
        >
          {content}
        </div>
      </Transition>
    );
  };

  return (
    <div
      ref={ref}
      {...otherProps}
      className={cls}
      style={containerStyle}
      onLoad={collectItemSizes}
      onError={collectItemSizes}
    >
      {mergedItems.map((item, index) => renderItem(item, index, false))}
      {Array.from(exitingItems.entries()).map(([key, item]) =>
        renderItem(item, Number(key), true)
      )}
    </div>
  );
});

Waterfall.displayName = 'Waterfall';

export default Waterfall;
