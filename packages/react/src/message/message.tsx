import React, { useEffect, useRef, useState, useContext } from 'react';
import classNames from 'classnames';
import Transition from '../transition';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import {
  CheckCircle,
  CloseCircle,
  InfoCircle,
  LoadingCircle,
  WarningCircle,
} from '../_utils/components';
import { MessageProps } from './types';

const Message = (props: MessageProps): JSX.Element => {
  const {
    type,
    icon,
    content,
    duration,
    willUnmount,
    extra,
    className,
    style,
    prefixCls: customisedCls,
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('message', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  const renderIcon = (): React.ReactNode => {
    if (React.isValidElement(icon)) {
      return icon;
    } else if (typeof type === 'string') {
      switch (type) {
        case 'success':
          return <CheckCircle size={16} className={`${prefixCls}__icon`} />;
        case 'info':
          return <InfoCircle size={16} className={`${prefixCls}__icon`} />;
        case 'warning':
          return <WarningCircle size={16} className={`${prefixCls}__icon`} />;
        case 'error':
          return <CloseCircle size={16} className={`${prefixCls}__icon`} />;
        case 'loading':
          return (
            <LoadingCircle
              size={16}
              className={classNames(`${prefixCls}__icon`, {
                [`${prefixCls}__icon_loading`]: type === 'loading',
              })}
            />
          );
      }
    }

    return null;
  };

  useEffect(() => {
    const node = ref.current;
    const height = (node && node.offsetHeight) || 0;
    const timer = window.setTimeout(() => {
      setVisible(false);
      willUnmount(height);
    }, duration);

    return (): void => {
      window.clearTimeout(timer);
    };
  }, [duration, willUnmount]);

  return (
    <Transition nodeRef={ref} in={visible} appear={true} timeout={0} unmountOnExit={false} classNames={`${prefixCls}_fade-slide`}>
      <div role="alert" className={cls} style={style} ref={ref}>
        {renderIcon()}
        <span className={`${prefixCls}__content`}>{content}</span>
        {extra && <div className={`${prefixCls}__extra`}>{extra}</div>}
      </div>
    </Transition>
  );
};

Message.displayName = 'Message';

export default Message;
