import React from 'react';
import { Select } from '@tiny-design/react';
import type { SelectValue } from '../types';

export default function GroupsDemo() {
  const [value, setValue] = React.useState<SelectValue>('');

  return (
    <div style={{ width: 240 }}>
      <Select
        placeholder="Select a food"
        value={value}
        onChange={setValue}
      >
        <Select.OptGroup label="Fruits">
          <Select.Option value="apple">Apple</Select.Option>
          <Select.Option value="banana">Banana</Select.Option>
          <Select.Option value="cherry">Cherry</Select.Option>
        </Select.OptGroup>
        <Select.OptGroup label="Vegetables">
          <Select.Option value="broccoli">Broccoli</Select.Option>
          <Select.Option value="carrot">Carrot</Select.Option>
          <Select.Option value="spinach">Spinach</Select.Option>
        </Select.OptGroup>
      </Select>
    </div>
  );
}
