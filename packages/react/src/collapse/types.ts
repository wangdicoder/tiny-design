import React, { CSSProperties, ReactNode } from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export type CollapseValue = string[];
export type CollapseCollapsible = 'header' | 'icon' | 'disabled';

export type CollapseRenderState = {
  active: boolean;
  disabled: boolean;
  panelKey: string;
};

export type CollapseExpandIconRender = (args: CollapseRenderState) => ReactNode;
export type CollapseHeaderRender = (args: CollapseRenderState) => ReactNode;
export type CollapseExtraRender = (args: CollapseRenderState) => ReactNode;

export interface CollapseItem {
  key: string;
  label: ReactNode | CollapseHeaderRender;
  children: ReactNode;
  extra?: ReactNode | CollapseExtraRender;
  disabled?: boolean;
  collapsible?: CollapseCollapsible;
  forceRender?: boolean;
  destroyOnHidden?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface CollapseProps
  extends BaseProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'defaultValue'> {
  items: CollapseItem[];
  value?: CollapseValue;
  defaultValue?: CollapseValue;
  onValueChange?: (value: CollapseValue) => void;
  multiple?: boolean;
  bordered?: boolean;
  size?: SizeType;
  expandIcon?: ReactNode | CollapseExpandIconRender;
  expandIconPosition?: 'start' | 'end';
  showArrow?: boolean;
  disabled?: boolean;
  collapsible?: CollapseCollapsible;
  destroyOnHidden?: boolean;
  forceRender?: boolean;
  itemClassName?: string;
  itemStyle?: CSSProperties;
  headerClassName?: string;
  bodyClassName?: string;
  onItemClick?: (key: string, event: React.MouseEvent) => void;
}
