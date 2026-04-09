import React from 'react';
import { Select } from '@tiny-design/react';
import type { SelectValue } from '../types';

export default function MultipleDemo() {
  const [value, setValue] = React.useState<SelectValue>(['apple', 'cherry']);

  return (
    <div style={{ width: 360 }}>
      <Select
        mode="multiple"
        showSearch
        placeholder="Select fruits"
        value={value}
        onChange={setValue}
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
