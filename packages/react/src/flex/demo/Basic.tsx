import React from 'react';
import { Flex, Radio } from '@tiny-design/react';

export default function BasicDemo() {
  const [vertical, setVertical] = React.useState(false);

  const baseStyle = {
    width: '25%',
    height: 54,
    borderRadius: 6,
  };

  return (
    <Flex gap="md" vertical>
      <Radio.Group value={vertical ? 'vertical' : 'horizontal'} onChange={(val) => setVertical(val === 'vertical')}>
        <Radio value="horizontal">horizontal</Radio>
        <Radio value="vertical">vertical</Radio>
      </Radio.Group>
      <Flex vertical={vertical}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              ...baseStyle,
              backgroundColor: i % 2
                ? 'var(--ty-color-primary)'
                : 'color-mix(in srgb, var(--ty-color-primary) 75%, transparent)',
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
}
