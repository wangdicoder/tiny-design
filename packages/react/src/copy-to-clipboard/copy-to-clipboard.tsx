import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { CopyToClipboardProps } from './types';
import { copyText } from './clipboard';

const CopyToClipboard = (props: CopyToClipboardProps): React.ReactElement => {
  const {
    prefixCls: customisedCls,
    text,
    className,
    children,
    onClick,
    onCopy,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('copy', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  const btnOnClick = async (e: React.MouseEvent<HTMLSpanElement>): Promise<void> => {
    const copied = await copyText(text);

    onCopy?.(copied, text);
    onClick && onClick(e);
  };

  return (
    <span {...otherProps} className={cls} onClick={btnOnClick}>
      {children}
    </span>
  );
};

CopyToClipboard.displayName = 'CopyToClipboard';

export default CopyToClipboard;
