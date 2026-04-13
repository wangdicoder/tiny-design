import React, { useState } from 'react';
import { Button, Space, Divider, Radio, Slider } from '@tiny-design/react';
import type { SliderValue, SpaceSize } from '@tiny-design/react';

export default function SizeDemo() {
  const [size, setSize] = useState<SpaceSize>('sm');
  const [numSize, setNumSize] = useState(10);

  return (
    <>
      <Divider titlePlacement="start">Use Preset</Divider>
      <Radio.Group value={size} onChange={(val) => setSize(val as SpaceSize)}>
        <Radio value="sm">Small</Radio>
        <Radio value="md">Medium</Radio>
        <Radio value="lg">Large</Radio>
      </Radio.Group>
      <br />
      <br />
      <Space size={size}>
        <Button btnType="primary">Primary</Button>
        <Button>Default</Button>
        <Button btnType="outline">Outline</Button>
        <Button btnType="link">Link</Button>
      </Space>

      <br />
      <br />
      <Divider titlePlacement="start">Use Number</Divider>
      <Slider
        value={numSize}
        onChange={(val: SliderValue) => {
          if (typeof val === 'number') {
            setNumSize(val);
          }
        }}
      />
      <Space size={numSize}>
        <Button btnType="primary">Primary</Button>
        <Button>Default</Button>
        <Button btnType="outline">Outline</Button>
        <Button btnType="link">Link</Button>
      </Space>
    </>
  );
}
