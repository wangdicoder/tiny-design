import { Avatar, Button, Card, Flex, Input, List, Tag, Typography } from '@tiny-design/react';
import { IconSearch, IconAddUser } from '@tiny-design/icons';

const { Heading, Text } = Typography;

const users = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', avatar: 'AJ', color: '#6366f1' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', avatar: 'BS', color: '#0891b2' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', avatar: 'CW', color: '#64748b' },
  { name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active', avatar: 'DB', color: '#059669' },
  { name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'Active', avatar: 'EM', color: '#e11d48' },
];

const roleColors: Record<string, string> = { Admin: 'purple', Editor: 'blue', Viewer: 'default' };

export default function UserList() {
  return (
    <div style={{ padding: 24 }}>
      <Card variant="elevated" style={{ borderRadius: 14 }}>
        <div style={{ padding: 16 }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
            <div>
              <Heading level={5} style={{ margin: 0 }}>Team Members</Heading>
              <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>
                Manage your team and their permissions
              </Text>
            </div>
            <Flex gap="sm">
              <Input
                placeholder="Search members..."
                prefix={<IconSearch style={{ color: 'var(--ty-color-text-tertiary)' }} />}
                size="sm"
                style={{ width: 200, borderRadius: 8 }}
              />
              <Button size="sm" btnType="primary" style={{ borderRadius: 8 }}>
                <Flex align="center" gap="sm">
                  <IconAddUser style={{ fontSize: 14 }} />
                  <span>Invite</span>
                </Flex>
              </Button>
            </Flex>
          </Flex>

          <List
            dataSource={users}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Button key="edit" size="sm" btnType="outline" style={{ borderRadius: 8 }}>Edit</Button>,
                  <Button key="remove" size="sm" btnType="ghost" style={{ borderRadius: 8 }}>Remove</Button>,
                ]}
              >
                <Flex align="center" gap="md">
                  <Avatar size={40} presence={user.status === 'Active' ? 'online' : 'offline'} style={{ backgroundColor: user.color, fontWeight: 600 }}>
                    {user.avatar}
                  </Avatar>
                  <div>
                    <Text style={{ fontWeight: 600 }}>{user.name}</Text>
                    <br />
                    <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>{user.email}</Text>
                  </div>
                  <Tag variant="soft" color={roleColors[user.role]} style={{ borderRadius: 20, marginLeft: 4 }}>
                    {user.role}
                  </Tag>
                </Flex>
              </List.Item>
            )}
          />

          <Flex justify="space-between" align="center" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--ty-color-border)' }}>
            <Text style={{ fontSize: 13, color: 'var(--ty-color-text-tertiary)' }}>
              Showing 5 of 5 members
            </Text>
            <Text style={{ fontSize: 13, color: 'var(--ty-color-text-tertiary)' }}>
              3 Admin · 2 Editor · 1 Viewer
            </Text>
          </Flex>
        </div>
      </Card>
    </div>
  );
}
