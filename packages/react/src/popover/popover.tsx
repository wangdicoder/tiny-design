import React, { useContext } from 'react';
import classNames from 'classnames';
import Popup from '../popup';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { PopoverProps } from './types';

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
  const {
    theme = 'light',
    role = 'tooltip',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    prefixCls: customisedCls,
    title,
    content,
    className,
    children,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('popover', configContext.prefixCls, customisedCls);
  const cls = classNames(className, prefixCls, `${prefixCls}_${theme}`);

  const renderContent = (): React.ReactElement => (
    <div
      ref={ref}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      className={`${prefixCls}__inner`}>
      {title && <div className={`${prefixCls}__title`}>{title}</div>}
      {content && <div className={`${prefixCls}__content`}>{content}</div>}
    </div>
  );

  return (
    <Popup {...otherProps} className={cls} theme={theme} content={renderContent()}>
      {children}
    </Popup>
  );
});

Popover.displayName = 'Popover';

export default Popover;
