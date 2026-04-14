import React from 'react';
import { Button, Flex } from '@tiny-design/react';
import { IconLoader3quarter } from '@tiny-design/icons';

export default function LoadingIconDemo() {
  return (
    <Flex gap="sm">
      <Button loading>Default Loading</Button>
      <Button
        loading
        variant="solid" color="primary"
        loadingIcon={<IconLoader3quarter className="ty-icon-spin" />}>
        Custom Loading
      </Button>
    </Flex>
  );
}
