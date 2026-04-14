import React from 'react';
import { Flex, Radio, Slider, Button } from '@tiny-design/react';
import type { SliderValue } from '@tiny-design/react';

export default function GapDemo() {
  const [gapSize, setGapSize] = React.useState('sm');
  const [customGapSize, setCustomGapSize] = React.useState(0);

  return (
    <Flex gap="md" vertical>
      <Radio.Group value={gapSize} onChange={(val) => setGapSize(String(val))}>
        <Radio value="sm">small</Radio>
        <Radio value="md">medium</Radio>
        <Radio value="lg">large</Radio>
        <Radio value="custom">custom</Radio>
      </Radio.Group>
      {gapSize === 'custom' && (
        <Slider
          value={customGapSize}
          onChange={(val: SliderValue) => {
            if (typeof val === 'number') {
              setCustomGapSize(val);
            }
          }}
        />
      )}
      <Flex gap={gapSize !== 'custom' ? gapSize : customGapSize}>
        <Button variant="solid" color="primary">
          Primary
        </Button>
        <Button>Default</Button>
        <Button variant="outline" color="primary">
          Outline
        </Button>
        <Button variant="link" color="primary">
          Link
        </Button>
      </Flex>
    </Flex>
  );
}
