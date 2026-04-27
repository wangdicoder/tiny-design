import React, { useEffect, useId, useState } from 'react';
import classNames from 'classnames';
import { ArrowDown } from '../_utils/components';
import CollapseTransition from '../collapse-transition';
import { CollapseCollapsible, CollapseExpandIconRender, CollapseItem, CollapseRenderState } from './types';

type CollapsePanelProps = {
  prefixCls: string;
  item: CollapseItem;
  active: boolean;
  disabled?: boolean;
  collapsible?: CollapseCollapsible;
  showArrow: boolean;
  expandIcon?: React.ReactNode | CollapseExpandIconRender;
  expandIconPosition: 'start' | 'end';
  forceRender?: boolean;
  destroyOnHidden?: boolean;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  headerClassName?: string;
  bodyClassName?: string;
  onItemClick?: (key: string, event: React.MouseEvent) => void;
  onToggle: (key: string, event: React.MouseEvent) => void;
};

const renderContent = (
  content: React.ReactNode | ((args: CollapseRenderState) => React.ReactNode),
  state: CollapseRenderState
): React.ReactNode => {
  return typeof content === 'function' ? content(state) : content;
};

const CollapsePanel = ({
  prefixCls,
  item,
  active,
  disabled = false,
  collapsible = 'header',
  showArrow,
  expandIcon,
  expandIconPosition,
  forceRender = false,
  destroyOnHidden = false,
  itemClassName,
  itemStyle,
  headerClassName,
  bodyClassName,
  onItemClick,
  onToggle,
}: CollapsePanelProps): React.ReactElement => {
  const [bodyMounted, setBodyMounted] = useState(active || forceRender);
  const panelId = useId();
  const headerId = useId();

  useEffect(() => {
    if (active || forceRender) {
      setBodyMounted(true);
    }
  }, [active, forceRender]);

  const requestedCollapsible = showArrow || collapsible !== 'icon' ? collapsible : 'header';
  const itemDisabled = disabled || item.disabled || requestedCollapsible === 'disabled';
  const layoutCollapsible: CollapseCollapsible =
    requestedCollapsible === 'icon' ? 'icon' : 'header';
  const renderState: CollapseRenderState = {
    active,
    disabled: itemDisabled,
    panelKey: item.key,
  };

  const itemCls = classNames(`${prefixCls}-item`, itemClassName, item.className, {
    [`${prefixCls}-item_active`]: active,
    [`${prefixCls}-item_disabled`]: itemDisabled,
    [`${prefixCls}-item_icon-only`]: layoutCollapsible === 'icon',
  });

  const iconCls = classNames(`${prefixCls}-item__arrow`, {
    [`${prefixCls}-item__arrow_active`]: active,
  });

  const triggerToggle = (event: React.MouseEvent) => {
    if (itemDisabled) return;
    onItemClick?.(item.key, event);
    onToggle(item.key, event);
  };

  const renderExpandIcon = () => {
    if (!showArrow) return null;

    const iconNode =
      typeof expandIcon === 'function'
        ? expandIcon(renderState)
        : expandIcon ?? <ArrowDown size={10} className={iconCls} />;

    const iconButtonCls = classNames(`${prefixCls}-item__icon-button`, {
      [`${prefixCls}-item__icon-button_disabled`]: itemDisabled,
    });

    if (layoutCollapsible === 'icon') {
      return (
        <button
          type="button"
          className={iconButtonCls}
          onClick={triggerToggle}
          disabled={itemDisabled}
          aria-expanded={active}
          aria-controls={panelId}
          aria-labelledby={headerId}
        >
          {iconNode}
        </button>
      );
    }

    return <span className={`${prefixCls}-item__icon-slot`}>{iconNode}</span>;
  };

  const headerContent = renderContent(item.label, renderState);
  const extraContent = item.extra ? renderContent(item.extra, renderState) : null;
  const shouldRenderBody = bodyMounted || active || forceRender;

  return (
    <div className={itemCls} style={{ ...itemStyle, ...item.style }}>
      <div className={classNames(`${prefixCls}-item__header`, headerClassName)}>
        {layoutCollapsible === 'header' ? (
          <button
            type="button"
            id={headerId}
            className={`${prefixCls}-item__toggle`}
            onClick={triggerToggle}
            disabled={itemDisabled}
            aria-expanded={active}
            aria-controls={panelId}
          >
            {expandIconPosition === 'start' && renderExpandIcon()}
            <span className={`${prefixCls}-item__label`}>{headerContent}</span>
            {expandIconPosition === 'end' && renderExpandIcon()}
          </button>
        ) : (
          <>
            {expandIconPosition === 'start' && renderExpandIcon()}
            <div id={headerId} className={`${prefixCls}-item__label ${prefixCls}-item__label_static`}>
              {headerContent}
            </div>
            {expandIconPosition === 'end' && renderExpandIcon()}
          </>
        )}

        {extraContent && <div className={`${prefixCls}-item__extra`}>{extraContent}</div>}
      </div>

      <CollapseTransition
        open={active}
        className={`${prefixCls}-item__body-wrapper`}
        onHidden={destroyOnHidden && !forceRender ? () => setBodyMounted(false) : undefined}
      >
        {shouldRenderBody ? (
          <div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            className={classNames(`${prefixCls}-item__body`, bodyClassName)}
          >
            {item.children}
          </div>
        ) : null}
      </CollapseTransition>
    </div>
  );
};

CollapsePanel.displayName = 'CollapsePanel';

export default CollapsePanel;
