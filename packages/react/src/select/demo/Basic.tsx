import React from 'react';
import { Select } from '@tiny-design/react';

export default function BasicDemo() {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ width: 240 }}>
      <Select
        placeholder="Select a fruit"
        value={value}
        onChange={(val) => setValue(val)}
      >
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="cherry">Cherry</Select.Option>
        <Select.Option value="grape" disabled>Grape (disabled)</Select.Option>
      </Select>
    </div>
  );
}