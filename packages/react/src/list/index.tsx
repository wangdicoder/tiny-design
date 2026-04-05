import React from 'react';
import List from './list';
import ListItem from './list-item';
import ListItemMeta from './list-item-meta';
import { ListProps } from './types';

type IList = (<T = any>(
  props: ListProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement | null) & {
  Item: typeof ListItem;
  ItemMeta: typeof ListItemMeta;
  displayName?: string;
};

const DefaultList = List as IList;
DefaultList.Item = ListItem;
DefaultList.ItemMeta = ListItemMeta;

export default DefaultList;
export type * from './types';
