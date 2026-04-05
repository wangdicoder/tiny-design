import { Avatar, Button, Card, Flex, Input, Table, Tag, Typography } from '@tiny-design/react';
import { IconSearch, IconPlus, IconDownload } from '@tiny-design/icons';

const { Heading, Text } = Typography;

const data = [
  { key: '1', name: 'Alice Johnson', email: 'alice@acme.co', role: 'Admin', status: 'Active', lastLogin: '2 hours ago', color: '#6366f1' },
  { key: '2', name: 'Bob Smith', email: 'bob@acme.co', role: 'Engineer', status: 'Active', lastLogin: '1 day ago', color: '#0891b2' },
  { key: '3', name: 'Carol White', email: 'carol@acme.co', role: 'Designer', status: 'Inactive', lastLogin: '2 weeks ago', color: '#64748b' },
  { key: '4', name: 'David Brown', email: 'david@acme.co', role: 'Engineer', status: 'Active', lastLogin: '5 hours ago', color: '#059669' },
  { key: '5', name: 'Eva Martinez', email: 'eva@acme.co', role: 'Admin', status: 'Active', lastLogin: '30 min ago', color: '#e11d48' },
];

const roleColors: Record<string, string> = { Admin: 'purple', Engineer: 'blue', Designer: 'cyan', Viewer: 'default' };

const columns = [
  {
    title: 'Member',
    dataIndex: 'name',
    key: 'name',
    render: (_: unknown, record: (typeof data)[0]) => (
      <Flex align="center" gap="sm">
        <Avatar
          size={36}
          presence={record.status === 'Active' ? 'online' : 'offline'}
          style={{ backgroundColor: record.color, fontWeight: 600, fontSize: 13 }}
        >
          {record.name.split(' ').map((n) => n[0]).join('')}
        </Avatar>
        <div>
          <Text style={{ fontWeight: 600, fontSize: 14 }}>{record.name}</Text>
          <br />
          <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>{record.email}</Text>
        </div>
      </Flex>
    ),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role: string) => (
      <Tag variant="soft" color={roleColors[role]} style={{ borderRadius: 20 }}>{role}</Tag>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Flex align="center" gap="sm">
        <div style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: status === 'Active' ? '#22c55e' : '#94a3b8',
        }} />
        <Text style={{ fontSize: 13 }}>{status}</Text>
      </Flex>
    ),
  },
  {
    title: 'Last Active',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
    render: (val: string) => (
      <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>{val}</Text>
    ),
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <Flex gap="sm" justify="end">
        <Button size="sm" btnType="outline" style={{ borderRadius: 12 }}>Edit</Button>
        <Button size="sm" btnType="ghost" style={{ borderRadius: 12 }}>Remove</Button>
      </Flex>
    ),
  },
];

export default function DataTable() {
  return (
    <div style={{ padding: 24, background: '#f8fafc' }}>
      <Card variant="elevated" style={{ borderRadius: 16, border: '1px solid #dbe3ef', boxShadow: '0 16px 36px rgba(15, 23, 42, 0.06)' }}>
        <div style={{ padding: 16 }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
          <div>
            <Heading level={5} style={{ margin: 0 }}>Team Members</Heading>
            <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>
              Manage and review all team members
            </Text>
          </div>
          <Flex gap="sm">
            <Input
              placeholder="Search..."
              prefix={<IconSearch style={{ color: 'var(--ty-color-text-tertiary)', fontSize: 14 }} />}
              size="sm"
              style={{ width: 180, borderRadius: 12, background: '#fbfcfe' }}
            />
            <Button size="sm" btnType="outline" style={{ borderRadius: 12 }}>
              <Flex align="center" gap="sm">
                <IconDownload style={{ fontSize: 14 }} />
                <span>Export</span>
              </Flex>
            </Button>
            <Button size="sm" btnType="primary" style={{ borderRadius: 12, fontWeight: 600, background: '#0f172a', border: '1px solid #0f172a' }}>
              <Flex align="center" gap="sm">
                <IconPlus style={{ fontSize: 14 }} />
                <span>Add Member</span>
              </Flex>
            </Button>
          </Flex>
        </Flex>
        <Table columns={columns} dataSource={data} />
        <Flex justify="space-between" align="center" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
          <Text style={{ fontSize: 13, color: 'var(--ty-color-text-tertiary)' }}>
            Showing 5 results
          </Text>
          <Flex gap="sm">
            <Tag variant="soft" color="default">2 Admin</Tag>
            <Tag variant="soft" color="blue">2 Engineer</Tag>
            <Tag variant="soft" color="cyan">1 Designer</Tag>
          </Flex>
          </Flex>
        </div>
      </Card>
    </div>
  );
}
