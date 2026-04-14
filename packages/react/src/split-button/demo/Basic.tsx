import React from 'react';
import { SplitButton, Menu, Message, Flex } from '@tiny-design/react';

export default function BasicDemo() {
  const menu = (
    <Menu onSelect={(key: string) => Message.info(`you clicked the menu ${key}.`)}>
      <Menu.Item>1st menu item</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
      <Menu.Item>3rd menu item</Menu.Item>
    </Menu>
  );

  return (
    <Flex gap="sm">
      <SplitButton onClick={() => Message.info('you clicked the button.')} overlay={menu}>
        Click Me
      </SplitButton>
      <SplitButton
        variant="solid"
        color="primary"
        onClick={() => Message.info('you clicked the button.')}
        overlay={menu}>
        Click Me
      </SplitButton>
    </Flex>
  );
}
