import { Badge, Button, Card, Flex, List, Typography } from '@tiny-design/react';
import { IconComment, IconCheckCircle, IconTeam, IconStatistics } from '@tiny-design/icons';

const { Heading, Text } = Typography;

const notifications = [
  {
    id: 1,
    title: 'New comment on your pull request',
    description: 'Alice reviewed: "Looks great! Just one small suggestion on the auth handler."',
    time: '5 min ago',
    read: false,
    avatar: 'AJ',
    color: '#6366f1',
    icon: IconComment,
  },
  {
    id: 2,
    title: 'Deployment succeeded',
    description: 'tiny-design@2.1.0 deployed to production — all health checks passing.',
    time: '1 hour ago',
    read: false,
    avatar: 'CI',
    color: '#059669',
    icon: IconCheckCircle,
  },
  {
    id: 3,
    title: 'Bob Smith joined Engineering',
    description: 'New team member added to the engineering team. Say hello!',
    time: '3 hours ago',
    read: true,
    avatar: 'BS',
    color: '#0891b2',
    icon: IconTeam,
  },
  {
    id: 4,
    title: 'Weekly analytics report',
    description: 'Your weekly report is ready — downloads up 23% this week.',
    time: 'Yesterday',
    read: true,
    avatar: 'WR',
    color: '#e11d48',
    icon: IconStatistics,
  },
];

export default function NotificationList() {
  return (
    <Flex justify="center" style={{ padding: 24 }}>
      <Card variant="elevated" style={{ width: '100%', maxWidth: 480, borderRadius: 14 }}>
        <div style={{ padding: 16 }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
            <Flex align="center" gap="sm">
              <Heading level={5} style={{ margin: 0 }}>Notifications</Heading>
              <Badge count={2} />
            </Flex>
            <Button size="sm" btnType="link">Mark all read</Button>
          </Flex>
          <Text style={{ fontSize: 13, color: 'var(--ty-color-text-tertiary)', display: 'block', marginBottom: 12 }}>
            You have 2 unread notifications
          </Text>
        </div>

        <div style={{ padding: 16 }}>
          <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item style={{
              opacity: item.read ? 0.65 : 1,
              borderRadius: 10,
              padding: '12px 8px',
              transition: 'background 0.15s',
              cursor: 'pointer',
            }}>
              <Flex gap="md" align="start" style={{ width: '100%' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: item.color + '18',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <item.icon style={{ fontSize: 18, color: item.color }} />
                  </div>
                  {!item.read && (
                    <div style={{
                      position: 'absolute',
                      top: -2,
                      right: -2,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#6366f1',
                      border: '2px solid var(--ty-color-bg-container)',
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Flex justify="space-between" align="baseline">
                    <Text style={{ fontWeight: item.read ? 400 : 600, fontSize: 14 }}>{item.title}</Text>
                    <Text style={{ fontSize: 11, color: 'var(--ty-color-text-tertiary)', flexShrink: 0, marginLeft: 8 }}>
                      {item.time}
                    </Text>
                  </Flex>
                  <Text style={{ fontSize: 13, color: 'var(--ty-color-text-secondary)', display: 'block', marginTop: 2, lineHeight: 1.5 }}>
                    {item.description}
                  </Text>
                </div>
              </Flex>
            </List.Item>
          )}
          />
        </div>
      </Card>
    </Flex>
  );
}
