import { Avatar, Button, Card, Flex, Tag, Typography } from '@tiny-design/react';
import { IconLink, IconComment } from '@tiny-design/icons';

const { Heading, Text } = Typography;

const users = [
  {
    name: 'Alice Johnson',
    role: 'Engineering Lead',
    avatar: 'AJ',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    tags: ['React', 'TypeScript', 'Node.js'],
    projects: 42,
    contributions: '1.2k',
  },
  {
    name: 'Bob Smith',
    role: 'Product Designer',
    avatar: 'BS',
    color: '#0891b2',
    gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    tags: ['Figma', 'UI/UX', 'Motion'],
    projects: 38,
    contributions: '890',
  },
  {
    name: 'Carol White',
    role: 'Backend Engineer',
    avatar: 'CW',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    tags: ['Go', 'PostgreSQL', 'K8s'],
    projects: 56,
    contributions: '2.1k',
  },
];

export default function UserCardSimple() {
  return (
    <Flex gap="md" wrap="wrap" style={{ padding: 24 }}>
      {users.map((user) => (
        <Card key={user.name} hoverable style={{ width: 280, borderRadius: 14, overflow: 'hidden', padding: 0 }}>
          <div style={{ height: 64, background: user.gradient, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 24,
              height: 24,
              borderRadius: 6,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}>
              <IconLink style={{ fontSize: 12, color: '#fff' }} />
            </div>
          </div>
          <div style={{ padding: '0 20px 20px', marginTop: -28 }}>
            <Avatar
              size={56}
              style={{
                backgroundColor: user.color,
                fontSize: 20,
                fontWeight: 700,
                border: '3px solid var(--ty-color-bg-container)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
            >
              {user.avatar}
            </Avatar>
            <div style={{ marginTop: 8 }}>
              <Heading level={5} style={{ margin: 0, fontSize: 16 }}>{user.name}</Heading>
              <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13 }}>{user.role}</Text>
            </div>
            <Flex gap="sm" wrap="wrap" style={{ marginTop: 12 }}>
              {user.tags.map((tag) => (
                <Tag key={tag} variant="soft" style={{ borderRadius: 20, fontSize: 12 }}>{tag}</Tag>
              ))}
            </Flex>
            <Flex justify="space-around" style={{ marginTop: 16, padding: '12px 0', borderTop: '1px solid var(--ty-color-border)', borderBottom: '1px solid var(--ty-color-border)' }}>
              <Flex vertical align="center">
                <Text style={{ fontWeight: 700, fontSize: 16 }}>{user.projects}</Text>
                <Text style={{ fontSize: 11, color: 'var(--ty-color-text-tertiary)' }}>Projects</Text>
              </Flex>
              <Flex vertical align="center">
                <Text style={{ fontWeight: 700, fontSize: 16 }}>{user.contributions}</Text>
                <Text style={{ fontSize: 11, color: 'var(--ty-color-text-tertiary)' }}>Commits</Text>
              </Flex>
            </Flex>
            <Flex gap="sm" style={{ marginTop: 14 }}>
              <Button block size="sm" btnType="primary" style={{
                borderRadius: 8,
                fontWeight: 600,
                background: user.gradient,
                border: 'none',
              }}>
                Connect
              </Button>
              <Button block size="sm" btnType="outline" style={{ borderRadius: 8 }}>
                <Flex align="center" justify="center" gap="sm">
                  <IconComment style={{ fontSize: 14 }} />
                  <span>Message</span>
                </Flex>
              </Button>
            </Flex>
          </div>
        </Card>
      ))}
    </Flex>
  );
}
