import React from 'react';
import { Flex, Radio, Slider, Button } from '@tiny-design/react';

export default function GapDemo() {
  const [gapSize, setGapSize] = React.useState('sm');
  const [customGapSize, setCustomGapSize] = React.useState(0);

  return (
    <Flex gap="md" vertical>
      <Radio.Group value={gapSize} onChange={(val) => setGapSize(val)}>
        <Radio value="sm">small</Radio>
        <Radio value="md">medium</Radio>
        <Radio value="lg">large</Radio>
        <Radio value="custom">custom</Radio>
      </Radio.Group>
      {gapSize === 'custom' && <Slider value={customGapSize} onChange={(val) => setCustomGapSize(val)} />}
      <Flex gap={gapSize !== 'custom' ? gapSize : customGapSize}>
        <Button btnType="primary">Primary</Button>
        <Button>Default</Button>
        <Button btnType="outline">Outline</Button>
        <Button btnType="link">Link</Button>
      </Flex>
    </Flex>
  );
}