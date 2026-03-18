import React from 'react';
import { NativeSelect } from '@tiny-design/react';

export default function BasicDemo() {
  const { Option } = NativeSelect;

  return (
    <NativeSelect>
      <Option value="tom">Tom</Option>
      <Option value="oliver">Oliver</Option>
      <Option value="jack">Jack</Option>
    </NativeSelect>
  );
}