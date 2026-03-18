import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <Flex gap="sm">
      <Button btnType="primary" size="lg">Large Size</Button>
      <Button btnType="primary">Default Size</Button>
      <Button btnType="primary" size="sm">Small Size</Button>
    </Flex>
  );
}
