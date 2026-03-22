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
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${color}`]: color && PresetColors.includes(color),
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

  const tagStyle: React.CSSProperties = {
    backgroundColor: color ? (PresetColors.includes(color) ? undefined : color) : undefined,
    borderColor: color ? (PresetColors.includes(color) ? undefined : color) : undefined,
    color: color ? (PresetColors.includes(color) ? undefined : '#fff') : undefined,
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
