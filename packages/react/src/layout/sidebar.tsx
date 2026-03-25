import React from 'react';
import { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { IconLeft } from '@tiny-design/icons';
import { SidebarContext } from './sidebar-context';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { SidebarProps } from './types';

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (props: SidebarProps, ref): JSX.Element => {
    const {
      defaultCollapsed = false,
      width = 200,
      collapsedWidth = 70,
      theme = 'light',
      trigger = null,
      collapsible = false,
      onCollapse,
      className,
      style,
      children,
      collapsed: _collapsed,
      prefixCls: customisedCls,
      ...otherProps
    } = props;

    const [sideCollapsed, setSideCollapsed] = useState(
      'collapsed' in props ? props.collapsed : defaultCollapsed
    );
    const sidebarContext = useContext(SidebarContext);
    const sidebarWidth = sideCollapsed ? collapsedWidth : width;

    const outerStyle = {
      ...style,
      width: sidebarWidth,
      maxWidth: sidebarWidth,
      minWidth: sidebarWidth,
    };

    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('layout-sidebar', configContext.prefixCls, customisedCls);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}_light`]: theme === 'light',
    });

    const _collapseBtnOnClick = () => {
      const collapsedVal = !sideCollapsed;
      if (!('collapsed' in props)) {
        setSideCollapsed(collapsedVal);
      }
      onCollapse && onCollapse(collapsedVal);
    };

    const renderTrigger = () => {
      if (!collapsible) {
        return null;
      }

      if (trigger) {
        return trigger;
      }

      return (
        <button type="button" className={`${prefixCls}__trigger`} onClick={_collapseBtnOnClick} aria-label="Toggle sidebar">
          <IconLeft className={`${prefixCls}__trigger-icon`} />
        </button>
      );
    };

    useEffect(() => {
      'collapsed' in props && setSideCollapsed(props.collapsed);
      sidebarContext.addSidebar();

      return () => {
        sidebarContext.removeSidebar();
      };
    }, [props, sidebarContext]);

    return (
      <div {...otherProps} ref={ref} className={cls} style={outerStyle}>
        <div className={`${prefixCls}__children`}>{children}</div>
        {renderTrigger()}
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
