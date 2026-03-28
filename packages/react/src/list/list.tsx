import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useVirtualScroll } from '../_utils/use-virtual-scroll';
import Pagination from '../pagination';
import { ListProps } from './types';

const ITEM_HEIGHT_MAP = { sm: 41, md: 49, lg: 57 } as const;

const List = React.forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  const {
    dataSource = [],
    renderItem,
    header,
    footer,
    loading = false,
    bordered = false,
    split = true,
    size,
    grid,
    locale,
    virtual = false,
    height,
    itemHeight: itemHeightProp,
    pagination,
    prefixCls: customisedCls,
    className,
    style,
    children,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('list', configContext.prefixCls, customisedCls);
  const listSize = size || configContext.componentSize || 'md';

  if (virtual && height == null) {
    console.warn('[tiny-design: List] `height` is required when `virtual` is enabled.');
  }
  if (virtual && grid) {
    console.warn('[tiny-design: List] `virtual` is not supported with `grid` mode. Falling back to normal rendering.');
  }

  const isVirtual = virtual && height != null && !grid;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = pagination && pagination.pageSize ? pagination.pageSize : 10;

  const itemHeight = itemHeightProp ?? ITEM_HEIGHT_MAP[listSize] ?? ITEM_HEIGHT_MAP.md;
  const { visibleRange, totalHeight, offsetY, onScroll } = useVirtualScroll({
    itemCount: dataSource.length,
    itemHeight,
    containerHeight: height ?? 0,
    enabled: isVirtual,
  });

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${listSize}`]: listSize,
    [`${prefixCls}_bordered`]: bordered,
    [`${prefixCls}_split`]: split,
    [`${prefixCls}_loading`]: loading,
    [`${prefixCls}_grid`]: grid,
  });

  const paginatedData = () => {
    if (!pagination) return dataSource;
    const page = pagination.current ?? currentPage;
    const start = (page - 1) * pageSize;
    return dataSource.slice(start, start + pageSize);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pagination && pagination.onChange?.(page, pageSize);
  };

  const renderItems = () => {
    if (isVirtual) {
      if (dataSource.length === 0) {
        return (
          <div className={`${prefixCls}__empty`} role="status">
            {locale?.emptyText ?? 'No Data'}
          </div>
        );
      }
      if (renderItem) {
        const [start, end] = visibleRange;
        const visibleItems = dataSource.slice(start, end + 1).map((item, i) => (
          <React.Fragment key={start + i}>{renderItem(item, start + i)}</React.Fragment>
        ));
        return (
          <div
            style={{ height: totalHeight, position: 'relative' }}
            aria-rowcount={dataSource.length}
          >
            <ul
              className={`${prefixCls}__items`}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, transform: `translateY(${offsetY}px)` }}
            >
              {visibleItems}
            </ul>
          </div>
        );
      }
      return children;
    }

    const items = paginatedData();
    if (items.length === 0 && !children) {
      return (
        <div className={`${prefixCls}__empty`} role="status">
          {locale?.emptyText ?? 'No Data'}
        </div>
      );
    }
    if (renderItem) {
      const page = pagination ? (pagination.current ?? currentPage) : 1;
      const startIndex = pagination ? (page - 1) * pageSize : 0;
      const rendered = items.map((item, index) => (
        <React.Fragment key={startIndex + index}>
          {renderItem(item, startIndex + index)}
        </React.Fragment>
      ));
      if (grid) {
        return (
          <ul
            className={`${prefixCls}__grid`}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${grid.column || 3}, 1fr)`,
              gap: grid.gutter ? `${grid.gutter}px` : undefined,
            }}
          >
            {rendered}
          </ul>
        );
      }
      return <ul className={`${prefixCls}__items`}>{rendered}</ul>;
    }
    return children;
  };

  const showPagination = pagination && !isVirtual;
  const paginationConfig = pagination && typeof pagination === 'object' ? pagination : undefined;
  const totalItems = paginationConfig?.total ?? dataSource.length;
  const activePage = paginationConfig?.current ?? currentPage;

  const bodyCls = classNames(`${prefixCls}__body`, {
    [`${prefixCls}__body_virtual`]: isVirtual,
  });

  const bodyStyle: React.CSSProperties | undefined = isVirtual
    ? { height, overflowY: 'auto' }
    : undefined;

  return (
    <div {...otherProps} ref={ref} aria-busy={loading} className={cls} style={style}>
      {header && <div className={`${prefixCls}__header`}>{header}</div>}
      <div className={bodyCls} style={bodyStyle} onScroll={isVirtual ? onScroll : undefined}>
        {loading ? (
          <div className={`${prefixCls}__loading`} role="status" aria-live="polite">Loading...</div>
        ) : (
          renderItems()
        )}
      </div>
      {footer && <div className={`${prefixCls}__footer`}>{footer}</div>}
      {showPagination && (
        <Pagination
          current={activePage}
          total={totalItems}
          pageSize={pageSize}
          align={paginationConfig?.align ?? 'right'}
          size={paginationConfig?.size}
          disabled={paginationConfig?.disabled}
          onChange={(page) => handlePageChange(page)}
          style={{ padding: 16 }}
        />
      )}
    </div>
  );
});

List.displayName = 'List';
export default List as <T = any>(
  props: ListProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement | null;
