import React, { useCallback, useContext, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { DropdownProps } from './types';
import { MenuProps } from '../menu/types';
import Popup from '../popup';

const Dropdown = (props: DropdownProps): JSX.Element => {
  const {
    trigger = 'hover',
    placement = 'bottom-start',
    disabled = false,
    arrow = false,
    onVisibleChange,
    overlay,
    className,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('dropdown', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const isControlled = 'visible' in props;
  const [uncontrolledVisible, setUncontrolledVisible] = useState(false);
  const popupVisible = isControlled ? Boolean(props.visible) : uncontrolledVisible;

  const setPopupVisibleState = useCallback((nextVisible: boolean): void => {
    if (!isControlled) {
      setUncontrolledVisible(nextVisible);
    }
    onVisibleChange?.(nextVisible);
  }, [isControlled, onVisibleChange]);

  const renderOverlay = (): React.ReactNode => {
    if (!overlay) {
      return null;
    }

    const originalOnSelect = overlay.props.onSelect;
    const isMenuOverlay = (overlay.type as React.ElementType & { displayName?: string }).displayName === 'Menu';

    if (!isMenuOverlay) {
      return overlay;
    }

    const overlayProps: Partial<MenuProps> = {
      overlayClassName: cls,
      mode: 'vertical',
      theme: 'light',
      onSelect: (selectedIndex) => {
        originalOnSelect?.(selectedIndex);
        setPopupVisibleState(false);
      },
    };
    return React.cloneElement(overlay, overlayProps);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    children.props.onKeyDown?.(e);

    if (e.key === 'Escape' && popupVisible) {
      setPopupVisibleState(false);
    }
  };

  const childrenProps = {
    onKeyDown: handleKeyDown,
    'aria-expanded': popupVisible,
    'aria-haspopup': true as const,
  };

  React.Children.only(children);
  return (
    <Popup
      {...otherProps}
      biZoom={false}
      arrow={arrow}
      disabled={disabled}
      placement={placement}
      flip={!('placement' in props)}
      trigger={trigger}
      className={cls}
      visible={popupVisible}
      onVisibleChange={setPopupVisibleState}
      content={renderOverlay()}>
      {React.cloneElement(children, childrenProps)}
    </Popup>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
