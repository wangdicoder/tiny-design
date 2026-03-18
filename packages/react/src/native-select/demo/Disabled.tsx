import React from 'react';
import { NativeSelect } from '@tiny-design/react';

export default function DisabledDemo() {
  const { Option } = NativeSelect;

  return (
    <NativeSelect disabled value="oliver">
      <Option value="tom">Tom</Option>
      <Option value="oliver">Oliver</Option>
      <Option value="jack">Jack</Option>
    </NativeSelect>
  );
}