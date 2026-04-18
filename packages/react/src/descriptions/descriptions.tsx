import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import warning from '../_utils/warning';
import { resolveResponsiveValue } from '../grid/responsive';
import { useActiveBreakpoint } from '../grid/use-active-breakpoint';
import DescriptionsItem from './descriptions-item';
import {
  DescriptionsItemProps,
  DescriptionsItemType,
  DescriptionsProps,
  DescriptionsSemantic,
  DescriptionsSpan,
} from './types';

type NormalizedItem = DescriptionsItemType & {
  key: React.Key;
  content: React.ReactNode;
  span: DescriptionsSpan;
};

type LayoutItem = NormalizedItem & {
  computedSpan: number;
};

function normalizeColumns(columns: number | undefined): number {
  if (!Number.isFinite(columns) || (columns as number) <= 0) {
    warning(true, 'Descriptions `columns` should be a positive number. Falling back to 3.');
    return 3;
  }

  return Math.max(1, Math.floor(columns as number));
}

function getItemSpan(span: DescriptionsSpan | undefined, columns: number, remaining: number): number {
  if (span === 'fill') {
    return remaining;
  }

  const numericSpan = Math.max(1, Math.floor(span ?? 1));
  if (numericSpan > columns) {
    warning(true, `Descriptions item span ${numericSpan} exceeds columns ${columns}. Clamping to ${columns}.`);
  }

  return Math.min(numericSpan, columns);
}

function layoutItems(items: NormalizedItem[], columns: number): LayoutItem[][] {
  const rows: LayoutItem[][] = [];
  let currentRow: LayoutItem[] = [];
  let remaining = columns;

  items.forEach((item) => {
    let computedSpan = getItemSpan(item.span, columns, remaining);

    if (computedSpan > remaining && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [];
      remaining = columns;
      computedSpan = getItemSpan(item.span, columns, remaining);
    }

    currentRow.push({ ...item, computedSpan });
    remaining -= computedSpan;

    if (remaining === 0) {
      rows.push(currentRow);
      currentRow = [];
      remaining = columns;
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}

function isDescriptionsItemElement(
  child: React.ReactNode,
): child is React.ReactElement<DescriptionsItemProps, typeof DescriptionsItem> {
  return React.isValidElement(child) && child.type === DescriptionsItem;
}

function renderValue(value: React.ReactNode, empty: React.ReactNode): React.ReactNode {
  return value === null || value === undefined || value === '' ? empty : value;
}

const Descriptions = (props: DescriptionsProps): React.ReactElement => {
  const {
    size = 'md',
    bordered = false,
    columns: responsiveColumns = 3,
    layout = 'horizontal',
    title,
    extra,
    footer,
    className,
    children,
    items,
    empty = '-',
    semantic = 'auto',
    labelAlign = 'start',
    contentAlign = 'start',
    labelRender,
    contentRender,
    separator,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('descriptions', configContext.prefixCls, customisedCls);
  const breakpoint = useActiveBreakpoint();
  const columns = normalizeColumns(resolveResponsiveValue(responsiveColumns, breakpoint) ?? 3);
  const displayColon = 'colon' in props ? (props.colon as boolean) : !bordered;
  const resolvedSemantic: DescriptionsSemantic = semantic === 'auto' ? (bordered ? 'table' : 'list') : semantic;

  const normalizedItems = useMemo<NormalizedItem[]>(() => {
    if (items && items.length > 0) {
      if (process.env.NODE_ENV !== 'production' && React.Children.count(children) > 0) {
        warning(true, 'Descriptions `items` takes priority over `children`.');
      }

      return items
        .filter((item) => !item.hidden)
        .map((item, index) => ({
          ...item,
          key: item.key ?? index,
          content: item.content,
          span: item.span ?? 1,
        }));
    }

    const childItems: NormalizedItem[] = [];
    React.Children.forEach(children, (child, index) => {
      if (!child) {
        return;
      }

      if (!isDescriptionsItemElement(child)) {
        warning(true, 'Descriptions only accepts `Descriptions.Item` as children.');
        return;
      }

      if (child.props.hidden) {
        return;
      }

      childItems.push({
        key: child.key ?? index,
        label: child.props.label,
        content: child.props.children,
        span: child.props.span ?? 1,
        extra: child.props.extra,
        className: child.props.className,
        style: child.props.style,
      });
    });

    return childItems;
  }, [children, items]);

  const rows = useMemo(() => layoutItems(normalizedItems, columns), [columns, normalizedItems]);

  const cls = classNames(
    prefixCls,
    className,
    `${prefixCls}_${size}`,
    `${prefixCls}_${layout}`,
    `${prefixCls}_${resolvedSemantic}`,
    {
      [`${prefixCls}_bordered`]: bordered,
      [`${prefixCls}_label-${labelAlign}`]: labelAlign,
      [`${prefixCls}_content-${contentAlign}`]: contentAlign,
    }
  );

  const separatorNode = separator ?? (displayColon ? ':' : null);

  const renderLabel = (item: DescriptionsItemType, index: number) => {
    const labelContent = labelRender ? labelRender(item, index) : item.label;
    return (
      <div className={`${prefixCls}__label-inner`}>
        <span className={`${prefixCls}__label-text`}>{labelContent}</span>
        {separatorNode ? <span className={`${prefixCls}__separator`}>{separatorNode}</span> : null}
        {item.extra ? <span className={`${prefixCls}__label-extra`}>{item.extra}</span> : null}
      </div>
    );
  };

  const renderContent = (item: DescriptionsItemType, index: number) => {
    const content = contentRender ? contentRender(item, index) : item.content;
    return renderValue(content, empty);
  };

  const renderTable = () => (
    <div className={`${prefixCls}__body`}>
      <table>
        <tbody>
          {rows.map((row, rowIndex) =>
            layout === 'vertical' ? (
              <React.Fragment key={rowIndex}>
                <tr className={`${prefixCls}__row`}>
                  {row.map((item, index) => (
                    <th
                      key={`${item.key}-label`}
                      className={classNames(`${prefixCls}__cell`, `${prefixCls}__item-label`, item.className)}
                      colSpan={item.computedSpan}
                      style={item.style}>
                      {renderLabel(item, index)}
                    </th>
                  ))}
                </tr>
                <tr className={`${prefixCls}__row`}>
                  {row.map((item, index) => (
                    <td
                      key={`${item.key}-content`}
                      className={classNames(`${prefixCls}__cell`, `${prefixCls}__item-content`, item.className)}
                      colSpan={item.computedSpan}
                      style={item.style}>
                      {renderContent(item, index)}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ) : (
              <tr className={`${prefixCls}__row`} key={rowIndex}>
                {row.map((item, index) => (
                  <React.Fragment key={item.key}>
                    <th className={classNames(`${prefixCls}__cell`, `${prefixCls}__item-label`, item.className)} style={item.style}>
                      {renderLabel(item, index)}
                    </th>
                    <td
                      className={classNames(`${prefixCls}__cell`, `${prefixCls}__item-content`, item.className)}
                      colSpan={item.computedSpan * 2 - 1}
                      style={item.style}>
                      {renderContent(item, index)}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );

  const renderList = () => (
    <div className={`${prefixCls}__body`}>
      <dl
        className={`${prefixCls}__list`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {rows.flat().map((item, index) => (
          <div
            key={item.key}
            className={classNames(`${prefixCls}__list-item`, item.className)}
            style={{
              ...item.style,
              gridColumn: `span ${item.computedSpan}`,
            }}>
            <dt className={`${prefixCls}__item-label`}>{renderLabel(item, index)}</dt>
            <dd className={`${prefixCls}__item-content`}>{renderContent(item, index)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <div {...otherProps} className={cls}>
      {(title || extra) && (
        <div className={`${prefixCls}__header`}>
          {title ? <div className={`${prefixCls}__title`}>{title}</div> : <div />}
          {extra ? <div className={`${prefixCls}__extra`}>{extra}</div> : null}
        </div>
      )}
      {resolvedSemantic === 'table' ? renderTable() : renderList()}
      {footer ? <div className={`${prefixCls}__footer`}>{footer}</div> : null}
    </div>
  );
};

Descriptions.displayName = 'Descriptions';

export default Descriptions;
