import { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Portal from '../portal';
import Transition from '../transition';
import { ConfigContext } from '../config-provider/config-context';
import { resolveTargetContainer } from '../config-provider/container-utils';
import { acquireScrollLock } from '../config-provider/scroll-lock';
import { getPrefixCls } from '../_utils/general';
import { OverlayProps } from './types';

const Overlay = (props: OverlayProps): JSX.Element => {
  const {
    isShow = false,
    blurred = false,
    unmountOnExit = true,
    zIndex = 1000,
    type = 'default',
    clickCallback,
    onEnter,
    onEntered,
    onExit,
    onExited,
    children,
    style,
    prefixCls: customisedCls,
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('overlay', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, `${prefixCls}_${type}`, { [`${prefixCls}_blurred`]: blurred });
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isShow) {
      return undefined;
    }

    return acquireScrollLock(resolveTargetContainer(configContext));
  }, [configContext, isShow]);

  return (
    <Portal>
      <Transition
        appear={true}
        nodeRef={nodeRef}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
        in={isShow}
        mountOnEnter={true}
        unmountOnExit={unmountOnExit}
        classNames={`${prefixCls}_fade`}
        timeout={{ exit: 300, enter: 0 }}>
        <div ref={nodeRef} tabIndex={-1} className={cls} onClick={clickCallback} style={{ zIndex, ...style }}>
          {children}
        </div>
      </Transition>
    </Portal>
  );
};

Overlay.displayName = 'Overlay';

export default Overlay;
