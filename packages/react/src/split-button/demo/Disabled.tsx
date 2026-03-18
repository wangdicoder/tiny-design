import React from 'react';
import { SplitButton, Menu, Message } from '@tiny-design/react';

export default function DisabledDemo() {
  return (
    <SplitButton
      disabled
      onClick={() => Message.info('you clicked the button.')}
      overlay={(
        <Menu onSelect={(key: number) => Message.info(`you clicked the menu ${key}.`)}>
          <Menu.Item>1st menu item</Menu.Item>
          <Menu.Item>2nd menu item</Menu.Item>
          <Menu.Item>3rd menu item</Menu.Item>
        </Menu>
      )}
    >
      Click Me
    </SplitButton>
  );
}