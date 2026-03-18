import React from 'react';
import { Dropdown, Menu, IconDown } from '@tiny-design/react';

export default function CascadeDemo() {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.ItemGroup title="Group title">
            <Menu.Item>1st menu item</Menu.Item>
            <Menu.Item>2nd menu item</Menu.Item>
          </Menu.ItemGroup>
          <Menu.SubMenu title="sub menu">
            <Menu.Item>3rd menu item</Menu.Item>
            <Menu.Item>4th menu item</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="disabled sub menu" disabled>
            <Menu.Item>5th menu item</Menu.Item>
            <Menu.Item>6th menu item</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      }
    >
      <a onClick={(e) => e.preventDefault()}>
        Cascade dropdowm <IconDown size={12} />
      </a>
    </Dropdown>
  );
}