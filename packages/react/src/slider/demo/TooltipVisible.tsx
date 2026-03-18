import React, { useState } from 'react';
import { Slider, Flex, Switch } from '@tiny-design/react';

export default function TooltipVisibleDemo() {
  const [show, setShow] = useState(true);

  return (
    <Flex vertical gap="md">
      <Slider tooltipVisible={show} defaultValue={50} />
      <Flex gap="sm" align="center">
        <span>Tooltip visible:</span>
        <Switch checked={show} onChange={(checked) => setShow(checked)} />
      </Flex>
    </Flex>
  );
}