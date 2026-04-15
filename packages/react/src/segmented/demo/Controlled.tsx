import React from 'react';
import { Segmented, Text } from '@tiny-design/react';

const options = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Timeline', value: 'timeline' },
];

export default function ControlledDemo() {
  const [value, setValue] = React.useState('list');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented
        options={options}
        value={value}
        onChange={(nextValue) => setValue(String(nextValue))}
      />
      <Text type="secondary">Current value: {value}</Text>
    </div>
  );
}
