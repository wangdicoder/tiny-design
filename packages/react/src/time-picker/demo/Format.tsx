import React from 'react';
import { TimePicker, Space } from '@tiny-design/react';

export default function FormatDemo() {
  return (
    <Space direction="vertical">
      <TimePicker format="HH:mm:ss" placeholder="HH:mm:ss" />
      <TimePicker format="HH:mm" placeholder="HH:mm (no seconds)" />
    </Space>
  );
}