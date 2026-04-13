import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { DividerProps } from './types';

const Divider = React.memo(React.forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const {
    orientation = 'horizontal',
    variant = 'solid',
    titlePlacement = 'center',
    plain = false,
    titleGap,
    prefixCls: customisedCls,
    className,
    children,
    style,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('divider', configContext.prefixCls, customisedCls);
  const hasChildren = children !== null && children !== undefined;
  const hasInnerText = orientation === 'horizontal' && hasChildren;
  const cls = classNames(
    prefixCls,
    className,
    `${prefixCls}_${orientation}`,
    `${prefixCls}_${variant}`,
    hasInnerText && `${prefixCls}_${titlePlacement}`,
    {
      [`${prefixCls}_text`]: hasInnerText,
      [`${prefixCls}_plain`]: plain,
    },
  );
  const mergedStyle = hasInnerText && titleGap !== undefined
    ? {
        ...style,
        ['--ty-divider-title-gap' as string]:
          typeof titleGap === 'number' ? `${titleGap}px` : titleGap,
      }
    : style;

  return (
    <div
      {...otherProps}
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cls}
      style={mergedStyle}
    >
      {hasInnerText && <span className={`${prefixCls}_inner-text`}>{children}</span>}
    </div>
  );
}));

Divider.displayName = 'Divider';

export default Divider;
