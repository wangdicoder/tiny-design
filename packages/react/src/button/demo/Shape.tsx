import React from 'react';
import { Button, Flex } from '@tiny-design/react';
import { IconSearch } from '@tiny-design/icons';

export default function ShapeDemo() {
  return (
    <Flex gap="sm">
      <Button>Default</Button>
      <Button shape="round" variant="solid" color="primary">
        Round
      </Button>
      <Button shape="circle" icon={<IconSearch />} aria-label="Search" />
    </Flex>
  );
}
