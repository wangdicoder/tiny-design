import React, { ReactNode } from 'react';
import { BaseProps } from '../_utils/props';

export type TransferItem = {
  key: string;
  label: string;
  disabled: boolean;
};

export interface TransferProps
  extends BaseProps,
    Omit<React.ComponentProps<'div'>, 'onChange'> {
  dataSource?: TransferItem[];
  value?: string[];
  defaultValue?: string[];
  disabled?: boolean;
  showSearch?: boolean;
  titles?: [ReactNode, ReactNode];
  placeholders?: [string, string];
  buttonTexts?: [ReactNode, ReactNode];
  onChange?: (targetKeys: string[], direction: string, moveKeys: string[]) => void;
  renderItem?: (item: TransferItem) => ReactNode;
  filterOption?: (input: string, item: TransferItem) => boolean;
}
