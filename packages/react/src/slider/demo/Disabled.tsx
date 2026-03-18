import React from 'react';
import { Slider, Flex } from '@tiny-design/react';

export default function DisabledDemo() {
  return (
    <Flex vertical gap="md">
      <Slider disabled defaultValue={50} />
      <Slider disabled defaultValue={[20, 45]} />
    </Flex>
  );
}