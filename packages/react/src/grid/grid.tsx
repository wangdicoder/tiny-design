import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { SizeType } from '../_utils/props';
import { GridContext } from './context';
import GridItem from './grid-item';
import { resolveResponsiveValue } from './responsive';
import { GridProps } from './types';
import { useActiveBreakpoint } from './use-active-breakpoint';

const gapSizes: Record<SizeType, number> = {
  sm: 8,
  md: 16,
  lg: 24,
};

function normalizeGap(value?: SizeType | React.CSSProperties['gap']): React.CSSProperties['gap'] {
  if (typeof value === 'string' && value in gapSizes) {
    return gapSizes[value as SizeType];
  }
  return value;
}

function normalizeMinColumnWidth(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}

function normalizeAreas(value?: string | string[]): string | undefined {
  if (!value) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.map((row) => `"${row}"`).join(' ');
  }
  return value;
}

type GridComponent = React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLElement>> & {
  Item: typeof GridItem;
};

const Grid = React.forwardRef<HTMLElement, GridProps>(
  (props: GridProps, ref): JSX.Element => {
    const {
      columns,
      rows,
      spacing,
      gap,
      columnSpacing,
      columnGap,
      rowSpacing,
      rowGap,
      minColumnWidth,
      autoFlow,
      autoFit = true,
      justify,
      align,
      justifyContent,
      alignContent,
      placeItems,
      placeContent,
      areas,
      component: Component = 'div',
      className,
      style,
      children,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const breakpoint = useActiveBreakpoint();
    const prefixCls = getPrefixCls('grid', configContext.prefixCls, customisedCls);

    const resolvedColumns = resolveResponsiveValue(columns, breakpoint);
    const resolvedRows = resolveResponsiveValue(rows, breakpoint);
    const resolvedGap = resolveResponsiveValue(gap ?? spacing, breakpoint);
    const resolvedColumnGap = resolveResponsiveValue(columnGap ?? columnSpacing, breakpoint);
    const resolvedRowGap = resolveResponsiveValue(rowGap ?? rowSpacing, breakpoint);
    const resolvedMinColumnWidth = resolveResponsiveValue(minColumnWidth, breakpoint);
    const resolvedAutoFlow = resolveResponsiveValue(autoFlow, breakpoint);
    const resolvedJustify = resolveResponsiveValue(justify, breakpoint);
    const resolvedAlign = resolveResponsiveValue(align, breakpoint);
    const resolvedJustifyContent = resolveResponsiveValue(justifyContent, breakpoint);
    const resolvedAlignContent = resolveResponsiveValue(alignContent, breakpoint);
    const resolvedPlaceItems = resolveResponsiveValue(placeItems, breakpoint);
    const resolvedPlaceContent = resolveResponsiveValue(placeContent, breakpoint);
    const resolvedAreas = resolveResponsiveValue(areas, breakpoint);

    const templateColumns = resolvedMinColumnWidth
      ? `repeat(${autoFit ? 'auto-fit' : 'auto-fill'}, minmax(${normalizeMinColumnWidth(resolvedMinColumnWidth)}, 1fr))`
      : typeof resolvedColumns === 'number'
        ? `repeat(${resolvedColumns}, minmax(0, 1fr))`
        : resolvedColumns;

    const mergedStyle: React.CSSProperties = {
      gridTemplateColumns: templateColumns,
      gridTemplateRows: resolvedRows,
      gridTemplateAreas: normalizeAreas(resolvedAreas),
      gap: normalizeGap(resolvedGap),
      columnGap: normalizeGap(resolvedColumnGap),
      rowGap: normalizeGap(resolvedRowGap),
      gridAutoFlow: resolvedAutoFlow,
      justifyItems: resolvedJustify,
      alignItems: resolvedAlign,
      justifyContent: resolvedJustifyContent,
      alignContent: resolvedAlignContent,
      placeItems: resolvedPlaceItems,
      placeContent: resolvedPlaceContent,
      ...style,
    };

    return (
      <GridContext.Provider value={{ breakpoint, columns: typeof resolvedColumns === 'number' ? resolvedColumns : undefined }}>
        <Component {...otherProps} ref={ref} className={classNames(prefixCls, className)} style={mergedStyle}>
          {children}
        </Component>
      </GridContext.Provider>
    );
  }
) as GridComponent;

Grid.displayName = 'Grid';
Grid.Item = GridItem;

export default Grid;
