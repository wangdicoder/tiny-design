import Menu from './menu';
import MenuItem from './menu-item';
import SubMenu from './sub-menu';
import MenuItemGroup from './menu-item-group';
import MenuDivider from './menu-divider';

type IMenu = typeof Menu & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  ItemGroup: typeof MenuItemGroup;
  Divider: typeof MenuDivider;
};

const DefaultMenu = Menu as IMenu;
DefaultMenu.Item = MenuItem;
DefaultMenu.SubMenu = SubMenu;
DefaultMenu.ItemGroup = MenuItemGroup;
DefaultMenu.Divider = MenuDivider;

export default DefaultMenu;
export type * from './types';
