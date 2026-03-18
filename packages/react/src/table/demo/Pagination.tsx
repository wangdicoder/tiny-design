import React from 'react';
import { Table } from '@tiny-design/react';

export default function PaginationDemo() {
  const columns = [
    { title: '#', dataIndex: 'id', width: 60 },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Author', dataIndex: 'author' },
  ];

  const data = Array.from({ length: 25 }, (_, i) => ({
    key: String(i + 1),
    id: i + 1,
    title: `Article ${i + 1}`,
    author: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'][i % 5],
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
    />
  );
}