import React from 'react';
import { Descriptions } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="UserName">React</Descriptions.Item>
      <Descriptions.Item label="Telephone">0200004567</Descriptions.Item>
      <Descriptions.Item label="Live">Sydney, Australia</Descriptions.Item>
      <Descriptions.Item label="Remark">Great</Descriptions.Item>
      <Descriptions.Item label="Address">456P+HW Camperdown, New South Wales</Descriptions.Item>
    </Descriptions>
  );
}