import React from 'react';
import { TimePicker, Space } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <Space direction="vertical" align="start">
      <TimePicker size="sm" placeholder="Small" />
      <TimePicker placeholder="Default" />
      <TimePicker size="lg" placeholder="Large" />
    </Space>
  );
}