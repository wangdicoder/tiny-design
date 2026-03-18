import React from 'react';
import { Table } from '@tiny-design/react';

export default function VirtualDemo() {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a: any, b: any) => a.age - b.age },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];

  const data = Array.from({ length: 5000 }, (_, i) => ({
    key: i,
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 50),
    address: `Street ${i + 1}, City ${(i % 100) + 1}`,
  }));

  return (
    <Table
      virtual
      height={500}
      columns={columns}
      dataSource={data}
      bordered
    />
  );
}