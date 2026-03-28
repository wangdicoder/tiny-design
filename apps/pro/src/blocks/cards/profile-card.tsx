import { Avatar, Button, Card, Divider, Flex, Tag, Typography } from '@tiny-design/react';
import { IconBriefcase } from '@tiny-design/icons';

const { Heading, Text } = Typography;

export default function ProfileCard() {
  return (
    <Flex justify="center" style={{ padding: 24 }}>
      <Card variant="elevated" style={{ width: 380, borderRadius: 16, overflow: 'hidden', padding: 0 }}>
        {/* Gradient header */}
        <div style={{
          height: 100,
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          position: 'relative',
        }} />

        {/* Avatar overlapping header */}
        <div style={{ padding: '0 24px 24px', marginTop: -44 }}>
          <Flex vertical align="center" gap="sm">
            <Avatar
              size={88}
              style={{
                backgroundColor: '#1e1b4b',
                fontSize: 32,
                fontWeight: 700,
                border: '4px solid var(--ty-color-bg-container)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              JD
            </Avatar>
            <div style={{ textAlign: 'center' }}>
              <Heading level={4} style={{ margin: 0 }}>Jane Doe</Heading>
              <Flex align="center" justify="center" gap="sm" style={{ marginTop: 2 }}>
                <IconBriefcase style={{ fontSize: 13, color: 'var(--ty-color-text-tertiary)' }} />
                <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13 }}>Software Engineer</Text>
              </Flex>
            </div>
            <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13, textAlign: 'center', lineHeight: 1.6 }}>
              Building beautiful UIs with Tiny Design. Open-source enthusiast and design systems advocate.
            </Text>
            <Flex gap="sm" wrap="wrap" justify="center">
              <Tag variant="soft" color="purple" style={{ borderRadius: 20 }}>React</Tag>
              <Tag variant="soft" color="blue" style={{ borderRadius: 20 }}>TypeScript</Tag>
              <Tag variant="soft" color="cyan" style={{ borderRadius: 20 }}>Design Systems</Tag>
            </Flex>
          </Flex>

          <Divider />

          <Flex justify="space-around" style={{ marginBottom: 16 }}>
            <Flex vertical align="center">
              <Text style={{ fontWeight: 700, fontSize: 20 }}>128</Text>
              <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Projects</Text>
            </Flex>
            <Flex vertical align="center">
              <Text style={{ fontWeight: 700, fontSize: 20 }}>1.2k</Text>
              <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Followers</Text>
            </Flex>
            <Flex vertical align="center">
              <Text style={{ fontWeight: 700, fontSize: 20 }}>384</Text>
              <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Following</Text>
            </Flex>
          </Flex>

          <Flex gap="sm">
            <Button block btnType="primary" style={{
              borderRadius: 10,
              height: 40,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
            }}>
              Follow
            </Button>
            <Button block btnType="outline" style={{ borderRadius: 10, height: 40, fontWeight: 600 }}>
              Message
            </Button>
          </Flex>
        </div>
      </Card>
    </Flex>
  );
}
