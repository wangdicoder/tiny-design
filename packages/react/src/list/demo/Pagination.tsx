import React from 'react';
import { List } from '@tiny-design/react';

export default function PaginationDemo() {
  const data = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`);

  return (
    <List
      bordered
      header="Paginated List"
      dataSource={data}
      pagination={{ pageSize: 5 }}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  );
}