import React, { useContext, useId, useRef } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { CollapsePanelProps } from './types';
import { ArrowDown } from '../_utils/components';
import CollapseTransition from '../collapse-transition';
import { CollapseContext } from './collapse-context';

/**
 * Allow to parse active status to a node
 * @param node
 * @param isActive
 */
const richNode = (node: React.ReactNode | ((isActive: boolean) => React.ReactNode), isActive: boolean) => {
  return typeof node === 'function' ? node(isActive) : node;
};

const CollapsePanel = (props: CollapsePanelProps): React.ReactElement => {
  const {
    showArrow = true,
    itemKey,
    header,
    disabled,
    extra,
    deletable,
    onHeaderOnClick,
    className,
    style,
    children,
    prefixCls: customisedCls,
  } = props;
  const itemRef = useRef<HTMLDivElement | null>(null);
  const panelId = useId();
  const headerId = useId();
  const configContext = useContext(ConfigContext);
  const { activeKeys, onItemClick } = useContext(CollapseContext);
  const prefixCls = getPrefixCls('collapse-item', configContext.prefixCls, customisedCls);
  const active = activeKeys.includes(itemKey);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_active`]: active,
  });

  const headerOnClick = (e: React.MouseEvent) => {
    if (!disabled) {
      onHeaderOnClick && onHeaderOnClick(e);
      onItemClick && onItemClick(itemKey);
    }
  };

  /**
   * Remove a item from collapse only the header is enabled
   * @param e
   * @private
   */
  const removeItem = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (!disabled) {
      const node = itemRef.current;
      node && node.parentNode?.removeChild(node);
    }
  };

  const renderHeader = () => {
    const headerCls = classNames(`${prefixCls}__header`, {
      [`${prefixCls}__header_disabled`]: disabled,
    });
    const arrowCls = classNames(`${prefixCls}__arrow`, {
      [`${prefixCls}__arrow_active`]: active,
    });

    const hasExtra = deletable || extra;

    return (
      <div className={headerCls}>
        <button
          type="button"
          id={headerId}
          className={`${prefixCls}__toggle`}
          onClick={headerOnClick}
          aria-expanded={active}
          aria-controls={panelId}
          aria-disabled={disabled || undefined}>
          {showArrow && <ArrowDown size={10} className={arrowCls} />}
          <div className={`${prefixCls}__title`}>{richNode(header, active)}</div>
        </button>
        {hasExtra && (
          <div className={`${prefixCls}__extra`}>
            {deletable ? <span onClick={removeItem}>✕</span> : richNode(extra, active)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cls} style={style} ref={itemRef}>
      {renderHeader()}
      <CollapseTransition isShow={active}>
        <div className={`${prefixCls}__content`} id={panelId} role="region" aria-labelledby={headerId}>{richNode(children, active)}</div>
      </CollapseTransition>
    </div>
  );
};

CollapsePanel.displayName = 'CollapsePanel';

export default CollapsePanel;
