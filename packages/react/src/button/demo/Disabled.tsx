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
        <Button disabled style={style}>
          Default (disabled)
        </Button>
      </Flex>
      <Flex gap="sm">
        <Button variant="solid" color="primary" style={style}>
          Primary
        </Button>
        <Button disabled variant="solid" color="primary" style={style}>
          Primary (disabled)
        </Button>
      </Flex>
      <Flex gap="sm">
        <Button variant="outline" color="primary" style={style}>
          Outline
        </Button>
        <Button disabled variant="outline" color="primary" style={style}>
          Outline (disabled)
        </Button>
      </Flex>
      <Flex gap="sm">
        <Button variant="ghost" color="primary" style={style}>
          Ghost
        </Button>
        <Button disabled variant="ghost" color="primary" style={style}>
          Ghost (disabled)
        </Button>
      </Flex>
      <Flex gap="sm">
        <Button variant="solid" color="success" style={style}>
          Success
        </Button>
        <Button disabled variant="solid" color="success" style={style}>
          Success (disabled)
        </Button>
      </Flex>
      <Flex gap="sm">
        <Button variant="solid" color="info" style={style}>
          Info
        </Button>
        <Button disabled variant="solid" color="info" style={style}>
          Info (disabled)
        </Button>
      </Flex>
      <Flex gap="sm">
        <Button variant="solid" color="warning" style={style}>
          Warning
        </Button>
        <Button disabled variant="solid" color="warning" style={style}>
          Warning (disabled)
        </Button>
      </Flex>
      <Flex gap="sm">
        <Button variant="solid" color="danger" style={style}>
          Danger
        </Button>
        <Button disabled variant="solid" color="danger" style={style}>
          Danger (disabled)
        </Button>
      </Flex>
      <Flex gap="sm">
        <Button variant="link" color="primary" style={style}>
          Link
        </Button>
        <Button disabled variant="link" color="primary" style={style}>
          Link (disabled)
        </Button>
      </Flex>
    </>
  );
}
