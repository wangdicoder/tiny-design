import React from 'react';
import { Slider, Flex } from '@tiny-design/react';

export default function VerticalDemo() {
  const style = {
    display: 'inline-block',
    height: 300,
    marginLeft: 70,
  };

  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: { color: '#f30' },
      label: <strong>100°C</strong>,
    },
  };

  return (
    <Flex gap="lg">
      <div style={style}>
        <Slider direction="vertical" defaultValue={30} />
      </div>
      <div style={style}>
        <Slider direction="vertical" step={10} defaultValue={[20, 50]} />
      </div>
      <div style={style}>
        <Slider direction="vertical" marks={marks} defaultValue={[26, 37]} />
      </div>
    </Flex>
  );
}