import { Avatar, Badge, Card, Flex, List, Tag, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

const notifications = [
  {
    id: 1,
    title: 'New comment on your post',
    description: 'Alice commented: "Great article! Very insightful."',
    time: '5 min ago',
    read: false,
    avatar: 'AC',
  },
  {
    id: 2,
    title: 'Project deployment successful',
    description: 'Your project "tiny-design" was deployed to production.',
    time: '1 hour ago',
    read: false,
    avatar: 'CI',
  },
  {
    id: 3,
    title: 'New team member joined',
    description: 'Bob Smith has joined the engineering team.',
    time: '3 hours ago',
    read: true,
    avatar: 'BS',
  },
  {
    id: 4,
    title: 'Weekly report ready',
    description: 'Your weekly analytics report is ready to view.',
    time: 'Yesterday',
    read: true,
    avatar: 'WR',
  },
];

export default function NotificationList() {
  return (
    <Flex justify="center" style={{ padding: 24 }}>
      <Card variant="elevated" style={{ width: '100%', maxWidth: 480 }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
          <Heading level={5} style={{ margin: 0 }}>Notifications</Heading>
          <Tag variant="soft" color="blue">2 new</Tag>
        </Flex>
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item style={{ opacity: item.read ? 0.7 : 1 }}>
              <Flex gap="md" align="start" style={{ width: '100%' }}>
                <Badge dot={!item.read}>
                  <Avatar size={36} style={{ backgroundColor: '#6e41bf' }}>{item.avatar}</Avatar>
                </Badge>
                <div style={{ flex: 1 }}>
                  <Text style={{ fontWeight: item.read ? 400 : 500 }}>{item.title}</Text>
                  <br />
                  <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>
                    {item.description}
                  </Text>
                  <br />
                  <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>
                    {item.time}
                  </Text>
                </div>
              </Flex>
            </List.Item>
          )}
        />
      </Card>
    </Flex>
  );
}
