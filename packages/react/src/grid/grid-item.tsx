import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { GridContext } from './context';
import { resolveResponsiveValue } from './responsive';
import { GridItemProps } from './types';
import { useActiveBreakpoint } from './use-active-breakpoint';

function normalizeSpan(value: number | 'full' | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (value === 'full') {
    return '1 / -1';
  }
  return `span ${value}`;
}

const GridItem = React.forwardRef<HTMLElement, GridItemProps>((props, ref): JSX.Element => {
  const {
    size,
    offset,
    column,
    row,
    colSpan,
    rowSpan,
    area,
    justifySelf,
    alignSelf,
    component: Component = 'div',
    className,
    style,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const inheritedContext = useContext(GridContext);
  const fallbackBreakpoint = useActiveBreakpoint();
  const breakpoint = inheritedContext?.breakpoint ?? fallbackBreakpoint;
  const availableColumns = inheritedContext?.columns;
  const prefixCls = getPrefixCls('grid-item', configContext.prefixCls, customisedCls);

  const resolvedSize = resolveResponsiveValue(size, breakpoint);
  const resolvedOffset = resolveResponsiveValue(offset, breakpoint);
  const resolvedColumn = resolveResponsiveValue(column, breakpoint);
  const resolvedRow = resolveResponsiveValue(row, breakpoint);
  const resolvedColSpan = resolveResponsiveValue(colSpan, breakpoint);
  const resolvedRowSpan = resolveResponsiveValue(rowSpan, breakpoint);
  const resolvedArea = resolveResponsiveValue(area, breakpoint);
  const resolvedJustifySelf = resolveResponsiveValue(justifySelf, breakpoint);
  const resolvedAlignSelf = resolveResponsiveValue(alignSelf, breakpoint);

  const derivedColumn = (() => {
    if (resolvedColumn) {
      return resolvedColumn;
    }

    const spanSource = resolvedColSpan ?? resolvedSize;
    const numericSpan = typeof spanSource === 'number' ? spanSource : undefined;

    if (resolvedOffset === 'auto' && numericSpan && availableColumns && availableColumns >= numericSpan) {
      const start = availableColumns - numericSpan + 1;
      return `${start} / span ${numericSpan}`;
    }

    if (spanSource === 'grow') {
      return resolvedOffset && resolvedOffset !== 'auto'
        ? `${resolvedOffset + 1} / -1`
        : 'auto / -1';
    }

    if (spanSource === 'auto') {
      return resolvedOffset && resolvedOffset !== 'auto'
        ? `${resolvedOffset + 1}`
        : undefined;
    }

    const span = normalizeSpan(spanSource);
    if (resolvedOffset === 'auto') {
      return span;
    }

    if (resolvedOffset !== undefined && span) {
      return `${resolvedOffset + 1} / ${span}`;
    }

    if (span) {
      return span;
    }

    return undefined;
  })();

  const derivedRow = resolvedRow ?? normalizeSpan(resolvedRowSpan);

  const mergedStyle: React.CSSProperties = {
    gridArea: resolvedArea,
    gridColumn: derivedColumn,
    gridRow: derivedRow,
    justifySelf: resolvedJustifySelf,
    alignSelf: resolvedAlignSelf,
    marginInlineStart: resolvedOffset === 'auto' && !derivedColumn ? 'auto' : undefined,
    minWidth: 0,
    ...style,
  };

  return (
    <Component
      {...otherProps}
      ref={ref}
      className={classNames(prefixCls, className)}
      style={mergedStyle}>
      {children}
    </Component>
  );
});

GridItem.displayName = 'GridItem';

export default GridItem;
