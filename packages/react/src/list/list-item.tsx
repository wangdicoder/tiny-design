import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ListItemProps } from './types';

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const {
    extra,
    actions,
    prefixCls: customisedCls,
    className,
    style,
    children,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('list-item', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  return (
    <li {...otherProps} ref={ref} className={cls} style={style}>
      <div className={`${prefixCls}__main`}>
        <div className={`${prefixCls}__content`}>{children}</div>
        {actions && actions.length > 0 && (
          <ul className={`${prefixCls}__actions`} aria-label="Actions">
            {actions.map((action, i) => (
              <li key={i} className={`${prefixCls}__action`}>
                {action}
              </li>
            ))}
          </ul>
        )}
      </div>
      {extra && <div className={`${prefixCls}__extra`}>{extra}</div>}
    </li>
  );
});

ListItem.displayName = 'ListItem';
export default ListItem;
