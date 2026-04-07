import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import Col from './col';
import { ColProps, RowProps } from './types';

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const {
    gutter = 0,
    gutterSide = false,
    prefixCls: customisedCls,
    align,
    justify,
    className,
    style,
    children,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('row', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_align-${align}`]: align,
    [`${prefixCls}_justify-${justify}`]: justify,
  });

  const getGutter = (): [number, number] => {
    return Array.isArray(gutter) ? gutter : [gutter, gutter];
  };

  const normalisedGutter = getGutter();

  const rowGutterStyle = gutter
    ? {
        marginLeft: gutterSide ? 0 : -normalisedGutter[0] / 2,
        marginRight: gutterSide ? 0 : -normalisedGutter[0] / 2,
        rowGap: normalisedGutter[1] || undefined,
      }
    : {};

  return (
    <div {...otherProps} ref={ref} className={cls} style={{ ...style, ...rowGutterStyle }}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<ColProps>(child)) {
          return child;
        }

        const childElement = child;

        if (childElement.type === Col) {
          const gutterStyle = gutter
            ? {
                paddingLeft: normalisedGutter[0] / 2,
                paddingRight: normalisedGutter[0] / 2,
              }
            : {};
          const childProps: Partial<ColProps> = {
            style: {
              ...childElement.props.style,
              ...gutterStyle,
            },
          };
          return React.cloneElement(childElement, childProps);
        }
        return childElement;
      })}
    </div>
  );
});

Row.displayName = 'Row';

export default Row;
