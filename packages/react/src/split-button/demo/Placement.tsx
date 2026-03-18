import React from 'react';
import { SplitButton, Menu, Message, Flex, Box } from '@tiny-design/react';

export default function PlacementDemo() {
  const menu = (
    <Menu onSelect={(key: number) => Message.info(`you clicked the menu ${key}.`)}>
      <Menu.Item>1st menu item</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
      <Menu.Item>3rd menu item</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Flex gap="sm" style={{ marginBottom: 8 }}>
        <SplitButton
          dropdownPlacement="top-start"
          onClick={() => Message.info('you clicked the button.')}
          overlay={menu}
        >
          TopLeft
        </SplitButton>
        <SplitButton
          dropdownPlacement="top"
          onClick={() => Message.info('you clicked the button.')}
          overlay={menu}
        >
          Top
        </SplitButton>
        <SplitButton
          dropdownPlacement="top-end"
          onClick={() => Message.info('you clicked the button.')}
          overlay={menu}
        >
          TopRight
        </SplitButton>
      </Flex>
      <Flex gap="sm">
        <SplitButton
          dropdownPlacement="bottom-start"
          onClick={() => Message.info('you clicked the button.')}
          overlay={menu}
        >
          BottomLeft
        </SplitButton>
        <SplitButton
          dropdownPlacement="bottom"
          onClick={() => Message.info('you clicked the button.')}
          overlay={menu}
        >
          Bottom
        </SplitButton>
        <SplitButton
          dropdownPlacement="bottom-end"
          onClick={() => Message.info('you clicked the button.')}
          overlay={menu}
        >
          BottomRight
        </SplitButton>
      </Flex>
    </>
  );
}