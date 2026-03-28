import React, { useState, useEffect, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useVirtualScroll } from '../_utils/use-virtual-scroll';
import Pagination from '../pagination';
import Checkbox from '../checkbox';
import Radio from '../radio';
import { TableProps, ColumnType, SortOrder } from './types';

const ROW_HEIGHT_MAP = { sm: 40, md: 48, lg: 56 } as const;

const getRowKey = <T,>(record: T, rowKey: string | ((record: T) => React.Key), index: number): React.Key => {
  if (typeof rowKey === 'function') return rowKey(record);
  const key = (record as any)[rowKey];
  return key !== undefined ? key : index;
};

const getValue = <T,>(record: T, dataIndex?: string): any => {
  return dataIndex ? (record as any)[dataIndex] : undefined;
};

const Table = React.forwardRef<HTMLDivElement, TableProps>((props, ref) => {
  const {
    columns,
    dataSource = [],
    rowKey = 'key',
    loading = false,
    bordered = false,
    size,
    scroll,
    virtual = false,
    height,
    itemHeight: itemHeightProp,
    rowSelection,
    pagination,
    onChange,
    emptyText = 'No Data',
    showHeader = true,
    rowClassName,
    onRow,
    prefixCls: customisedCls,
    className,
    style,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('table', configContext.prefixCls, customisedCls);
  const tableSize = size || configContext.componentSize || 'md';

  if (virtual && height == null) {
    console.warn('[tiny-design: Table] `height` is required when `virtual` is enabled.');
  }

  const isVirtual = virtual && height != null;

  // Sorting
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = pagination && pagination.pageSize ? pagination.pageSize : 10;

  // Selection
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(
    rowSelection?.selectedRowKeys ?? []
  );

  useEffect(() => {
    if (rowSelection?.selectedRowKeys) {
      setSelectedKeys(rowSelection.selectedRowKeys);
    }
  }, [rowSelection?.selectedRowKeys]);

  // Initialize default sort
  useEffect(() => {
    for (const col of columns) {
      if (col.defaultSortOrder) {
        setSortField(col.dataIndex);
        setSortOrder(col.defaultSortOrder);
        break;
      }
    }
  }, [columns]);

  const sortedData = useMemo(() => {
    if (!sortField || !sortOrder) return [...dataSource];
    const col = columns.find((c) => c.dataIndex === sortField);
    if (!col?.sorter) return [...dataSource];
    const sorted = [...dataSource];
    const sorterFn =
      typeof col.sorter === 'function'
        ? col.sorter
        : (a: any, b: any) => {
            const va = getValue(a, sortField);
            const vb = getValue(b, sortField);
            if (va < vb) return -1;
            if (va > vb) return 1;
            return 0;
          };
    sorted.sort((a, b) => {
      const result = sorterFn(a, b);
      return sortOrder === 'descend' ? -result : result;
    });
    return sorted;
  }, [dataSource, sortField, sortOrder, columns]);

  const rowHeight = itemHeightProp ?? ROW_HEIGHT_MAP[tableSize] ?? ROW_HEIGHT_MAP.md;
  const { visibleRange, totalHeight, offsetY, onScroll } = useVirtualScroll({
    itemCount: sortedData.length,
    itemHeight: rowHeight,
    containerHeight: height ?? 0,
  });

  const paginatedData = useMemo(() => {
    if (isVirtual) return sortedData;
    if (pagination === false) return sortedData;
    const page = pagination?.current ?? currentPage;
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize, isVirtual]);

  const paginationConfig = pagination && typeof pagination === 'object' ? pagination : undefined;
  const totalItems = paginationConfig?.total ?? dataSource.length;
  const activePage = paginationConfig?.current ?? currentPage;

  const handleSort = (col: ColumnType) => {
    if (!col.sorter) return;
    let newOrder: SortOrder;
    if (sortField !== col.dataIndex) {
      newOrder = 'ascend';
    } else if (sortOrder === 'ascend') {
      newOrder = 'descend';
    } else if (sortOrder === 'descend') {
      newOrder = null;
    } else {
      newOrder = 'ascend';
    }
    setSortField(newOrder ? col.dataIndex : undefined);
    setSortOrder(newOrder);
    onChange?.({ current: activePage, pageSize }, { field: col.dataIndex, order: newOrder });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    paginationConfig?.onChange?.(page, pageSize);
    onChange?.({ current: page, pageSize }, { field: sortField, order: sortOrder });
  };

  const handleSelectAll = () => {
    if (!rowSelection) return;
    const offset = (!isVirtual && pagination !== false) ? (activePage - 1) * pageSize : 0;
    const allKeys = paginatedData.map((record, i) => getRowKey(record, rowKey, offset + i));
    const allSelected = allKeys.every((k) => selectedKeys.includes(k));
    const newKeys = allSelected ? [] : allKeys;
    if (!rowSelection.selectedRowKeys) {
      setSelectedKeys(newKeys);
    }
    const newRows = allSelected ? [] : paginatedData;
    rowSelection.onChange?.(newKeys, newRows);
  };

  const handleSelectRow = (record: any, key: React.Key) => {
    if (!rowSelection) return;
    const isRadio = rowSelection.type === 'radio';
    let newKeys: React.Key[];
    if (isRadio) {
      newKeys = [key];
    } else {
      newKeys = selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key];
    }
    if (!rowSelection.selectedRowKeys) {
      setSelectedKeys(newKeys);
    }
    const newRows = sortedData.filter((r, i) => newKeys.includes(getRowKey(r, rowKey, i)));
    rowSelection.onChange?.(newKeys, newRows);
  };

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_bordered`]: bordered,
    [`${prefixCls}_${tableSize}`]: tableSize,
    [`${prefixCls}_loading`]: loading,
  });

  const tableStyle: React.CSSProperties = {};
  if (scroll?.x) tableStyle.minWidth = scroll.x;

  const wrapperStyle: React.CSSProperties = {};
  if (isVirtual) {
    wrapperStyle.height = height;
    wrapperStyle.overflowY = 'auto';
  } else if (scroll?.y) {
    wrapperStyle.maxHeight = scroll.y;
    wrapperStyle.overflowY = 'auto';
  }

  const pageOffset = (!isVirtual && pagination !== false) ? (activePage - 1) * pageSize : 0;
  const allPageKeys = paginatedData.map((r, i) => getRowKey(r, rowKey, pageOffset + i));
  const allSelected = allPageKeys.length > 0 && allPageKeys.every((k) => selectedKeys.includes(k));
  const someSelected = allPageKeys.some((k) => selectedKeys.includes(k));

  const colCount = columns.length + (rowSelection ? 1 : 0);

  const renderRow = (record: any, rowIndex: number) => {
    const key = getRowKey(record, rowKey, rowIndex);
    const isSelected = selectedKeys.includes(key);
    const rowCls = classNames(`${prefixCls}__row`, {
      [`${prefixCls}__row_selected`]: isSelected,
    }, typeof rowClassName === 'function' ? rowClassName(record, rowIndex) : rowClassName);
    const rowProps = onRow?.(record, rowIndex) ?? {};
    return (
      <tr key={key} className={rowCls} {...rowProps}>
        {rowSelection && (
          <td className={`${prefixCls}__cell ${prefixCls}__selection-col`}>
            {rowSelection.type === 'radio' ? (
              <Radio
                checked={isSelected}
                onChange={() => handleSelectRow(record, key)}
                aria-label={`Select row ${rowIndex + 1}`}
              />
            ) : (
              <Checkbox
                checked={isSelected}
                onChange={() => handleSelectRow(record, key)}
                aria-label={`Select row ${rowIndex + 1}`}
              />
            )}
          </td>
        )}
        {columns.map((col, colIndex) => {
          const colKey = col.key ?? col.dataIndex ?? colIndex;
          const value = getValue(record, col.dataIndex);
          const tdCls = classNames(`${prefixCls}__cell`, col.className, {
            [`${prefixCls}__cell_ellipsis`]: col.ellipsis,
            [`${prefixCls}__cell_align-${col.align}`]: col.align,
          });
          return (
            <td key={colKey} className={tdCls} style={{ width: col.width }}>
              {col.render ? col.render(value, record, rowIndex) : value}
            </td>
          );
        })}
      </tr>
    );
  };

  const renderTbody = () => {
    if (loading) {
      return (
        <tr>
          <td
            className={`${prefixCls}__cell ${prefixCls}__loading-cell`}
            colSpan={colCount}
          >
            Loading...
          </td>
        </tr>
      );
    }

    if (isVirtual) {
      if (sortedData.length === 0) {
        return (
          <tr>
            <td className={`${prefixCls}__cell ${prefixCls}__empty-cell`} colSpan={colCount}>
              {emptyText}
            </td>
          </tr>
        );
      }
      const [start, end] = visibleRange;
      const topHeight = offsetY;
      const bottomHeight = totalHeight - offsetY - (end - start + 1) * rowHeight;
      return (
        <>
          {topHeight > 0 && (
            <tr className={`${prefixCls}__row_spacer`}>
              <td colSpan={colCount} style={{ height: topHeight }} />
            </tr>
          )}
          {sortedData.slice(start, end + 1).map((record, i) => renderRow(record, start + i))}
          {bottomHeight > 0 && (
            <tr className={`${prefixCls}__row_spacer`}>
              <td colSpan={colCount} style={{ height: Math.max(0, bottomHeight) }} />
            </tr>
          )}
        </>
      );
    }

    if (paginatedData.length === 0) {
      return (
        <tr>
          <td
            className={`${prefixCls}__cell ${prefixCls}__empty-cell`}
            colSpan={colCount}
          >
            {emptyText}
          </td>
        </tr>
      );
    }

    return paginatedData.map((record, i) => renderRow(record, pageOffset + i));
  };

  const theadCls = classNames(`${prefixCls}__thead`, {
    [`${prefixCls}__thead_sticky`]: isVirtual,
  });

  const showPagination = pagination !== false && !isVirtual;

  return (
    <div {...otherProps} ref={ref} className={cls} style={style}>
      <div
        className={`${prefixCls}__wrapper`}
        style={wrapperStyle}
        onScroll={isVirtual ? onScroll : undefined}
      >
        <table className={`${prefixCls}__table`} style={tableStyle}>
          {showHeader && (
            <thead className={theadCls}>
              <tr>
                {rowSelection && (
                  <th className={`${prefixCls}__cell ${prefixCls}__selection-col`}>
                    {rowSelection.type !== 'radio' && (
                      <Checkbox
                        checked={allSelected}
                        indeterminate={someSelected && !allSelected}
                        onChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    )}
                  </th>
                )}
                {columns.map((col, i) => {
                  const key = col.key ?? col.dataIndex ?? i;
                  const thCls = classNames(`${prefixCls}__cell`, col.className, {
                    [`${prefixCls}__cell_sortable`]: !!col.sorter,
                    [`${prefixCls}__cell_align-${col.align}`]: col.align,
                  });
                  return (
                    <th
                      key={key}
                      className={thCls}
                      style={{ width: col.width }}
                      onClick={() => handleSort(col)}
                    >
                      <span className={`${prefixCls}__col-title`}>{col.title}</span>
                      {col.sorter && (
                        <span className={`${prefixCls}__sorter`}>
                          <span className={classNames(`${prefixCls}__sorter-icon`, {
                            [`${prefixCls}__sorter-icon_active`]: sortField === col.dataIndex && sortOrder === 'ascend',
                          })}>▲</span>
                          <span className={classNames(`${prefixCls}__sorter-icon`, {
                            [`${prefixCls}__sorter-icon_active`]: sortField === col.dataIndex && sortOrder === 'descend',
                          })}>▼</span>
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}
          <tbody className={`${prefixCls}__tbody`}>
            {renderTbody()}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <Pagination
          current={activePage}
          total={totalItems}
          pageSize={pageSize}
          align={paginationConfig?.align ?? 'right'}
          size={paginationConfig?.size}
          disabled={paginationConfig?.disabled}
          onChange={(page) => handlePageChange(page)}
          style={{ padding: '16px 0' }}
        />
      )}
    </div>
  );
});

Table.displayName = 'Table';
export default Table;
