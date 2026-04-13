import React from 'react';
import { Descriptions, Radio } from '@tiny-design/react';

type DemoSize = 'sm' | 'md' | 'lg';

export default function SizeDemo() {
  const [size, setSize] = React.useState<DemoSize>('md');

  return (
    <div>
      <Radio.Group onChange={(val) => setSize(val as DemoSize)} value={size}>
        <Radio value="sm">Small</Radio>
        <Radio value="md">Medium</Radio>
        <Radio value="lg">Large</Radio>
      </Radio.Group>
      <br />
      <br />
      <Descriptions bordered title="Customised Size" size={size}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Descriptions title="Customised Size" size={size}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
      </Descriptions>
    </div>
  );
}
