import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function LoadingDemo() {
  return (
    <Flex gap="sm">
      <Button loading>Default Button</Button>
      <Button loading btnType="primary">Primary Button</Button>
      <Button loading btnType="link">Link</Button>
    </Flex>
  );
}
