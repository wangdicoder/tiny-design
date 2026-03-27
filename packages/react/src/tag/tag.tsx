import React, { useState, useEffect, MouseEvent, useContext, forwardRef } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { PresetColors, TagProps } from './types';

const Tag = React.memo(forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const {
    closable = false,
    visible: visibleProp,
    defaultVisible = true,
    prefixCls: customisedCls,
    color,
    variant = 'filled',
    onClose,
    onClick,
    className,
    style,
    children,
    ...otherProps
  } = props;
  const [visible, setVisible] = useState<boolean>(
    visibleProp !== undefined ? visibleProp : defaultVisible
  );
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tag', configContext.prefixCls, customisedCls);
  const isPresetColor = color && PresetColors.includes(color);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${color}`]: isPresetColor && variant === 'filled',
    [`${prefixCls}_${color}-soft`]: isPresetColor && variant === 'soft',
    [`${prefixCls}_${color}-solid`]: isPresetColor && variant === 'solid',
    [`${prefixCls}_${color}-outlined`]: isPresetColor && variant === 'outlined',
    [`${prefixCls}_visible`]: visible,
    [`${prefixCls}_closeable`]: closable,
  });

  /**
   * Callback when the close button is clicked.
   * @param e
   */
  const closeBtnOnClick = (e: MouseEvent<HTMLSpanElement>): void => {
    onClose && onClose(e);
    if (e.defaultPrevented) {
      return;
    }
    visibleProp === undefined && setVisible(false);
  };

  const getCustomColorStyle = (): React.CSSProperties => {
    if (!color || isPresetColor) return {};

    switch (variant) {
      case 'soft':
        return { backgroundColor: color, borderColor: 'transparent', color: '#fff' };
      case 'solid':
        return { backgroundColor: color, borderColor: color, color: '#fff' };
      case 'outlined':
        return { backgroundColor: 'transparent', borderColor: color, color: color };
      case 'filled':
      default:
        return { backgroundColor: color, borderColor: color, color: '#fff' };
    }
  };

  const tagStyle: React.CSSProperties = {
    ...getCustomColorStyle(),
    ...style,
  };

  useEffect(() => {
    if (visibleProp !== undefined) setVisible(visibleProp);
  }, [visibleProp]);

  return (
    <div {...otherProps} ref={ref} className={cls} style={tagStyle} onClick={onClick}>
      {children}
      {closable && (
        <button type="button" className={`${prefixCls}__close-btn`} onClick={closeBtnOnClick} aria-label="Remove">
          ✕
        </button>
      )}
    </div>
  );
}));

Tag.displayName = 'Tag';

export default Tag;
