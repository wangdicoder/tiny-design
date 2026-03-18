import React from 'react';
import { Rate, Flex } from '@tiny-design/react';

export default function ClearableDemo() {
  return (
    <Flex vertical gap="sm">
      <div>
        <Rate defaultValue={3} /> clearable: true
      </div>
      <div>
        <Rate clearable={false} defaultValue={3} /> clearable: false
      </div>
    </Flex>
  );
}