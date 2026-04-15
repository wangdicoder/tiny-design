import React from 'react';
import { Flex, Segmented, Button } from '@tiny-design/react';
import type { SegmentedValue } from '@tiny-design/react';

export default function AlignDemo() {
  const justifyOptions = [
    { label: 'flex-start', value: 'flex-start' },
    { label: 'center', value: 'center' },
    { label: 'flex-end', value: 'flex-end' },
    { label: 'space-between', value: 'space-between' },
    { label: 'space-around', value: 'space-around' },
    { label: 'space-evenly', value: 'space-evenly' },
  ];
  const alignOptions = [
    { label: 'flex-start', value: 'flex-start' },
    { label: 'center', value: 'center' },
    { label: 'flex-end', value: 'flex-end' },
  ];

  const [justify, setJustify] = React.useState('flex-start');
  const [align, setAlign] = React.useState('flex-start');

  const boxStyle = {
    width: '100%',
    height: 120,
    borderRadius: 6,
    border: '1px solid var(--ty-color-primary)',
  };

  return (
    <Flex gap="md" align="flex-start" vertical>
      <span>Select justify:</span>
      <Segmented
        options={justifyOptions}
        value={justify}
        onChange={(val: SegmentedValue) => setJustify(String(val))}
      />
      <span>Select align:</span>
      <Segmented
        options={alignOptions}
        value={align}
        onChange={(val: SegmentedValue) => setAlign(String(val))}
      />
      <Flex style={boxStyle} justify={justify} align={align}>
        <Button variant="solid" color="primary">
          Primary
        </Button>
        <Button variant="solid" color="primary">
          Primary
        </Button>
        <Button variant="solid" color="primary">
          Primary
        </Button>
        <Button variant="solid" color="primary">
          Primary
        </Button>
      </Flex>
    </Flex>
  );
}
