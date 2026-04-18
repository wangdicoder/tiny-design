import React from 'react';
import { BaseProps } from '../_utils/props';

export type TreeData = {
  key?: string;
  title?: React.ReactNode;
  disableCheckbox?: boolean;
  disabled?: boolean;
  icon?: (isExpanded: boolean) => React.ReactNode;
  children?: TreeData[];
};

export interface TreeProps
  extends BaseProps,
    Omit<React.ComponentProps<'ul'>, 'onSelect'> {
  data?: TreeData[];
  indent?: number;
  checkable?: boolean;
  blockNode?: boolean;
  disabled?: boolean;
  defaultCheckedKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultExpandAll?: boolean;
  icon?: (isExpanded: boolean) => React.ReactNode;
  onCheck?: (checkedKeys: string[], e: React.ChangeEvent) => void;
  onExpand?: (expandedKeys: string[], e: React.MouseEvent) => void;
}
