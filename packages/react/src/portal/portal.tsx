import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ConfigContext } from '../config-provider/config-context';
import { resolvePopupContainer } from '../config-provider/container-utils';

export interface PortalProps {
  container?: HTMLElement | null;
  children?: React.ReactNode;
}

const Portal = (props: PortalProps): React.ReactPortal | null => {
  const configContext = useContext(ConfigContext);
  const { container, children } = props;
  const target = container ?? (typeof document !== 'undefined' ? resolvePopupContainer(configContext) : null);
  if (!target) return null;
  return ReactDOM.createPortal(children, target);
};

export default Portal;
