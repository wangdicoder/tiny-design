import React from 'react';
import { Table, Tag } from '@tiny-design/react';

export default function CustomRenderDemo() {
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === 'Active' ? '#52c41a' : status === 'Inactive' ? '#f44336' : '#ff9800';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      render: (val: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 6, background: '#eee', borderRadius: 3 }}>
            <div style={{ width: val + '%', height: '100%', background: '#6e41bf', borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 12 }}>{val}%</span>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <a onClick={() => alert('View ' + record.name)}>View</a>
      ),
    },
  ];

  const data = [
    { key: '1', name: 'Project Alpha', status: 'Active', progress: 75 },
    { key: '2', name: 'Project Beta', status: 'Pending', progress: 30 },
    { key: '3', name: 'Project Gamma', status: 'Active', progress: 100 },
    { key: '4', name: 'Project Delta', status: 'Inactive', progress: 0 },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
}