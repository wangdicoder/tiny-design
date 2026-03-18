import React from 'react';
import { DatePicker, Space } from '@tiny-design/react';

export default function PickerDemo() {
  return (
    <Space direction="vertical">
      <DatePicker placeholder="Select date" />
      <DatePicker picker="month" placeholder="Select month" />
      <DatePicker picker="year" placeholder="Select year" />
    </Space>
  );
}