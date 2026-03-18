import React from 'react';
import { Menu } from '@tiny-design/react';

export default function VerticalDemo() {
  return (
    <Menu mode="vertical" style={{ maxWidth: 256 }}>
      <Menu.Item>Navigation One</Menu.Item>
      <Menu.Item>Navigation Two</Menu.Item>
      <Menu.Item disabled>Navigation Three</Menu.Item>
      <Menu.SubMenu title="Simple SubMenu">
        <Menu.Item>Menu Item 1</Menu.Item>
        <Menu.Item disabled>Menu Item 2</Menu.Item>
        <Menu.Item>Menu Item 3</Menu.Item>
        <Menu.Item>Menu Item 4</Menu.Item>
        <Menu.SubMenu title="Second Simple SubMenu">
          <Menu.Item>Menu Item 5</Menu.Item>
          <Menu.Item>Menu Item 6</Menu.Item>
          <Menu.Item>Menu Item 7</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.SubMenu title="Submenu with ItemGroup">
        <Menu.ItemGroup title="Group 1">
          <Menu.Item>Item group 1 item 1</Menu.Item>
          <Menu.Item>Item group 1 item 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Group 2">
          <Menu.Item>Item group 2 item 1</Menu.Item>
          <Menu.Item disabled>Item group 2 item 2</Menu.Item>
          <Menu.Item>Item group 2 item 3</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  );
}