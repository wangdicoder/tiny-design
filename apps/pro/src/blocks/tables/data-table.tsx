import { Avatar, Button, Flex, Table, Tag, Typography } from '@tiny-design/react';

const { Text } = Typography;

const data = [
  { key: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
  { key: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', lastLogin: '1 day ago' },
  { key: '3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2 weeks ago' },
  { key: '4', name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active', lastLogin: '5 hours ago' },
  { key: '5', name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'Active', lastLogin: '30 min ago' },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_: unknown, record: (typeof data)[0]) => (
      <Flex align="center" gap="sm">
        <Avatar size={32} style={{ backgroundColor: '#6e41bf' }}>
          {record.name.split(' ').map((n) => n[0]).join('')}
        </Avatar>
        <div>
          <Text style={{ fontWeight: 500 }}>{record.name}</Text>
          <br />
          <Text style={{ fontSize: 12, color: 'var(--ty-color-text-secondary)' }}>{record.email}</Text>
        </div>
      </Flex>
    ),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role: string) => <Tag variant="soft">{role}</Tag>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'Active' ? 'green' : 'default'} variant="soft">{status}</Tag>
    ),
  },
  {
    title: 'Last Login',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Flex gap="sm">
        <Button size="sm" btnType="link">Edit</Button>
        <Button size="sm" btnType="link">Delete</Button>
      </Flex>
    ),
  },
];

export default function DataTable() {
  return (
    <div style={{ padding: 24 }}>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
