import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function DisabledDemo() {
  const style = {
    marginBottom: 12,
  };

  return (
    <>
      <Flex gap="sm">
        <Button style={style}>Default</Button>
        <Button disabled style={style}>Default (disabled)</Button>
      </Flex>
      <Flex gap="sm">
        <Button btnType="primary" style={style}>Primary</Button>
        <Button disabled btnType="primary" style={style}>Primary (disabled)</Button>
      </Flex>
      <Flex gap="sm">
        <Button btnType="outline" style={style}>Outline</Button>
        <Button disabled btnType="outline" style={style}>Outline (disabled)</Button>
      </Flex>
      <Flex gap="sm">
        <Button btnType="ghost" style={style}>Ghost</Button>
        <Button disabled btnType="ghost" style={style}>Ghost (disabled)</Button>
      </Flex>
      <Flex gap="sm">
        <Button btnType="success" style={style}>Success</Button>
        <Button disabled btnType="success" style={style}>Success (disabled)</Button>
      </Flex>
      <Flex gap="sm">
        <Button btnType="info" style={style}>Info</Button>
        <Button disabled btnType="info" style={style}>Info (disabled)</Button>
      </Flex>
      <Flex gap="sm">
        <Button btnType="warning" style={style}>Warning</Button>
        <Button disabled btnType="warning" style={style}>Warning (disabled)</Button>
      </Flex>
      <Flex gap="sm">
        <Button btnType="danger" style={style}>Danger</Button>
        <Button disabled btnType="danger" style={style}>Danger (disabled)</Button>
      </Flex>
      <Flex gap="sm">
        <Button btnType="link" style={style}>Link</Button>
        <Button disabled btnType="link" style={style}>Link (disabled)</Button>
      </Flex>
    </>
  );
}
