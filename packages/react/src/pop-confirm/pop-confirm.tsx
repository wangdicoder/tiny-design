import React, { useCallback, useContext, useState } from 'react';
import classNames from 'classnames';
import Popover from '../popover';
import Button from '../button';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useLocale } from '../_utils/use-locale';
import { WarningCircle } from '../_utils/components';
import { PopConfirmProps } from './types';

const PopConfirm = (props: PopConfirmProps): JSX.Element => {
  const locale = useLocale();
  const {
    placement = 'top',
    confirmText = locale.PopConfirm.okText,
    cancelText = locale.PopConfirm.cancelText,
    title,
    icon,
    onConfirm,
    onCancel,
    onVisibleChange,
    visible,
    defaultVisible = false,
    className,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pop-confirm', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const isControlled = visible !== undefined;
  const [uncontrolledVisible, setUncontrolledVisible] = useState(defaultVisible);
  const popupVisible = isControlled ? visible : uncontrolledVisible;

  const setPopupVisibleState = useCallback((nextVisible: boolean): void => {
    if (!isControlled) {
      setUncontrolledVisible(nextVisible);
    }
    onVisibleChange?.(nextVisible);
  }, [isControlled, onVisibleChange]);

  const cancelOnClick = (e: React.MouseEvent): void => {
    setPopupVisibleState(false);
    onCancel && onCancel(e);
  };

  const confirmOnClick = (e: React.MouseEvent): void => {
    setPopupVisibleState(false);
    onConfirm && onConfirm(e);
  };

  const overlay = (): React.ReactElement => {
    return (
      <div className={`${prefixCls}__overlay`}>
        <div className={`${prefixCls}__messages`}>
          {icon ? icon : <WarningCircle size={14} />}
          <span className={`${prefixCls}__title`}>{title}</span>
        </div>
        <div className={`${prefixCls}__buttons`}>
          <Button size="sm" onClick={cancelOnClick}>
            {cancelText}
          </Button>
          <Button size="sm" btnType="primary" onClick={confirmOnClick}>
            {confirmText}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Popover
      {...otherProps}
      className={cls}
      role="alertdialog"
      visible={popupVisible}
      onVisibleChange={setPopupVisibleState}
      content={overlay()}
      placement={placement}>
      {children}
    </Popover>
  );
};

PopConfirm.displayName = 'PopConfirm';

export default PopConfirm;
