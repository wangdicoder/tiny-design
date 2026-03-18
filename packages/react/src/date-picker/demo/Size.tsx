import React from 'react';
import { DatePicker, Space } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <Space direction="vertical" align="start">
      <DatePicker size="sm" placeholder="Small" />
      <DatePicker placeholder="Default" />
      <DatePicker size="lg" placeholder="Large" />
    </Space>
  );
}