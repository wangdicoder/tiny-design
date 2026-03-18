import React from 'react';
import { Select } from '@tiny-design/react';

export default function SearchDemo() {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ width: 240 }}>
      <Select
        showSearch
        placeholder="Search and select"
        value={value}
        onChange={(val) => setValue(val)}
      >
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="cherry">Cherry</Select.Option>
        <Select.Option value="dragonfruit">Dragon Fruit</Select.Option>
        <Select.Option value="elderberry">Elderberry</Select.Option>
        <Select.Option value="fig">Fig</Select.Option>
      </Select>
    </div>
  );
}