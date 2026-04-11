import React from 'react';
import { Table, Segmented } from '@tiny-design/react';
import type { SegmentedValue } from '@tiny-design/react';

type DemoSize = 'sm' | 'md' | 'lg';

export default function SizesDemo() {
  const [size, setSize] = React.useState<DemoSize>('md');

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Address', dataIndex: 'address' },
  ];

  const data = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London' },
    { key: '3', name: 'Joe Black', age: 28, address: 'Sydney' },
  ];

  return (
    <div>
      <Segmented
        options={['sm', 'md', 'lg']}
        value={size}
        onChange={(val: SegmentedValue) => setSize(String(val) as DemoSize)}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={data}
        size={size}
        bordered
        pagination={false}
      />
    </div>
  );
}
