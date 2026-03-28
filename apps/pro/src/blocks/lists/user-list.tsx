import { Avatar, Button, Flex, List, Tag, Typography } from '@tiny-design/react';

const { Text } = Typography;

const users = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', avatar: 'AJ' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', avatar: 'BS' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', avatar: 'CW' },
  { name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active', avatar: 'DB' },
  { name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'Active', avatar: 'EM' },
];

export default function UserList() {
  return (
    <div style={{ padding: 24 }}>
      <List
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Button key="edit" size="sm" btnType="outline">Edit</Button>,
              <Button key="remove" size="sm" btnType="ghost">Remove</Button>,
            ]}
          >
            <Flex align="center" gap="md">
              <Avatar style={{ backgroundColor: '#6e41bf' }}>{user.avatar}</Avatar>
              <div>
                <Text style={{ fontWeight: 500 }}>{user.name}</Text>
                <br />
                <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>{user.email}</Text>
              </div>
              <Tag variant="soft" style={{ marginLeft: 8 }}>{user.role}</Tag>
              <Tag color={user.status === 'Active' ? 'green' : 'default'} variant="soft">
                {user.status}
              </Tag>
            </Flex>
          </List.Item>
        )}
      />
    </div>
  );
}
