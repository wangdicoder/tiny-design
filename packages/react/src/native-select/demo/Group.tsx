import React from 'react';
import { NativeSelect } from '@tiny-design/react';

export default function GroupDemo() {
  const { Option, OptGroup } = NativeSelect;

  return (
    <NativeSelect>
      <OptGroup label="China">
        <Option>Beijing</Option>
        <Option>Shanghai</Option>
      </OptGroup>
      <OptGroup label="Australia">
        <Option>Melbourne</Option>
        <Option>Sydney</Option>
        <Option>Perth</Option>
      </OptGroup>
    </NativeSelect>
  );
}