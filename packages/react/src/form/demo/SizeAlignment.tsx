import React, { useState } from 'react';
import {
  Input,
  AutoComplete,
  Select,
  NativeSelect,
  DatePicker,
  TimePicker,
  Cascader,
  InputNumber,
  Radio,
} from '@tiny-design/react';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const cascaderOptions = [
  {
    value: 'fruits',
    label: 'Fruits',
    children: fruitOptions,
  },
];

const sizeOptions = ['sm', 'md', 'lg'] as const;

export default function SizeAlignmentDemo() {
  const [size, setSize] = useState<(typeof sizeOptions)[number]>('md');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Radio.Group value={size} onChange={(value) => setSize(value as (typeof sizeOptions)[number])}>
        <Radio value="sm">Small</Radio>
        <Radio value="md">Medium</Radio>
        <Radio value="lg">Large</Radio>
      </Radio.Group>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <Input size={size} placeholder="Input" />
        <AutoComplete size={size} options={fruitOptions} placeholder="AutoComplete" />
        <Select size={size} placeholder="Select" options={fruitOptions} />
        <NativeSelect size={size} defaultValue="banana">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
        </NativeSelect>
        <DatePicker size={size} placeholder="DatePicker" />
        <TimePicker size={size} placeholder="TimePicker" />
        <Cascader size={size} options={cascaderOptions} placeholder="Cascader" />
        <InputNumber size={size} defaultValue={10} />
      </div>
    </div>
  );
}
