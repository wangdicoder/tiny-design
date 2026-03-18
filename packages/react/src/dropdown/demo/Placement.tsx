import React from 'react';
import { Dropdown, Menu, Message, Button, Flex } from '@tiny-design/react';

export default function PlacementDemo() {
  const renderOverlay = () => (
    <Menu onSelect={(key) => Message.info(`Click on item ${key}`)}>
      <Menu.Item>1st menu item</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
      <Menu.Item>3rd menu item</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Flex gap="sm">
        <Dropdown overlay={renderOverlay()} placement="top-start">
          <Button>topLeft</Button>
        </Dropdown>
        <Dropdown overlay={renderOverlay()} placement="top">
          <Button>topCenter</Button>
        </Dropdown>
        <Dropdown overlay={renderOverlay()} placement="top-end">
          <Button>topRight</Button>
        </Dropdown>
      </Flex>
      <br />
      <Flex gap="sm">
        <Dropdown overlay={renderOverlay()} placement="bottom-start">
          <Button>bottomLeft</Button>
        </Dropdown>
        <Dropdown overlay={renderOverlay()} placement="bottom">
          <Button>bottomCenter</Button>
        </Dropdown>
        <Dropdown overlay={renderOverlay()} placement="bottom-end">
          <Button>bottomRight</Button>
        </Dropdown>
      </Flex>
    </>
  );
}