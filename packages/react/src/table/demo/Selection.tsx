import React from 'react';
import { Table } from '@tiny-design/react';

export default function SelectionDemo() {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[]>([]);

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Address', dataIndex: 'address' },
  ];

  const data = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1' },
    { key: '3', name: 'Joe Black', age: 28, address: 'Sydney No. 1' },
    { key: '4', name: 'Jane White', age: 35, address: 'Tokyo No. 1' },
  ];

  return (
    <div>
      <p style={{ marginBottom: 8 }}>Selected: {selectedRowKeys.join(', ') || 'none'}</p>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: any) => setSelectedRowKeys(keys),
        }}
        pagination={false}
      />
    </div>
  );
}