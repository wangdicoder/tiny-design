import { Avatar, Button, Card, Flex, Tag, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

const users = [
  { name: 'Alice Johnson', role: 'Engineering Lead', avatar: 'AJ', tags: ['React', 'TypeScript'] },
  { name: 'Bob Smith', role: 'Product Designer', avatar: 'BS', tags: ['Figma', 'UI/UX'] },
  { name: 'Carol White', role: 'Backend Engineer', avatar: 'CW', tags: ['Go', 'PostgreSQL'] },
];

export default function UserCardSimple() {
  return (
    <Flex gap="md" wrap="wrap" style={{ padding: 24 }}>
      {users.map((user) => (
        <Card key={user.name} style={{ width: 280 }}>
          <Flex vertical align="center" gap="sm" style={{ textAlign: 'center' }}>
            <Avatar size={64} style={{ backgroundColor: '#6e41bf', fontSize: 24 }}>
              {user.avatar}
            </Avatar>
            <div>
              <Heading level={5} style={{ margin: 0 }}>{user.name}</Heading>
              <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13 }}>{user.role}</Text>
            </div>
            <Flex gap="sm" wrap="wrap" justify="center">
              {user.tags.map((tag) => (
                <Tag key={tag} variant="soft">{tag}</Tag>
              ))}
            </Flex>
            <Flex gap="sm" style={{ marginTop: 8 }}>
              <Button size="sm" btnType="primary">Connect</Button>
              <Button size="sm" btnType="outline">Message</Button>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
