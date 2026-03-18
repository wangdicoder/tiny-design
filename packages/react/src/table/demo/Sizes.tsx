import React from 'react';
import { Table, Segmented } from '@tiny-design/react';

export default function SizesDemo() {
  const [size, setSize] = React.useState<string>('md');

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
        onChange={(val: any) => setSize(val)}
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