import React from 'react';
import { Select } from '@tiny-design/react';

export default function MultipleDemo() {
  const [value, setValue] = React.useState(['apple', 'cherry']);

  return (
    <div style={{ width: 360 }}>
      <Select
        mode="multiple"
        showSearch
        placeholder="Select fruits"
        value={value}
        onChange={(val) => setValue(val)}
        allowClear
      >
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="cherry">Cherry</Select.Option>
        <Select.Option value="dragonfruit">Dragon Fruit</Select.Option>
        <Select.Option value="elderberry">Elderberry</Select.Option>
      </Select>
    </div>
  );
}