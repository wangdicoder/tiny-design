import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function TypeDemo() {
  return (
    <Flex gap="sm">
      <Button>Default</Button>
      <Button btnType="primary">Primary</Button>
      <Button btnType="outline">Outline</Button>
      <Button btnType="ghost">Ghost</Button>
      <Button btnType="link">Link</Button>
    </Flex>
  );
}
