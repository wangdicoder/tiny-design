import React from 'react';
import { Dropdown, Menu, Message } from '@tiny-design/react';
import { IconDown } from '@tiny-design/icons';

export default function TriggerDemo() {
  return (
    <Dropdown
      trigger="click"
      overlay={
        <Menu onSelect={(key) => Message.info(`Click on item ${key}`)}>
          <Menu.Item>1st menu item</Menu.Item>
          <Menu.Item>2nd menu item</Menu.Item>
          <Menu.Item>3rd menu item</Menu.Item>
        </Menu>
      }
    >
      <a onClick={(e) => e.preventDefault()}>
        Click me <IconDown size={12} />
      </a>
    </Dropdown>
  );
}