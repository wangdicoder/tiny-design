import React from 'react';
import { Slider, Flex } from '@tiny-design/react';

export default function DotsDemo() {
  return (
    <Flex vertical gap="md">
      <Slider dots step={10} defaultValue={30} />
      <Slider dots min={0} max={2} step={0.5} defaultValue={0.5} />
      <Slider dots step={10} defaultValue={[20, 80]} />
    </Flex>
  );
}