import { Avatar, Button, Card, Divider, Flex, Tag, Typography } from '@tiny-design/react';
import { IconBriefcase } from '@tiny-design/icons';

const { Heading, Text } = Typography;

export default function ProfileCard() {
  return (
    <Flex justify="center" style={{ padding: 32, background: '#f8fafc' }}>
      <Card
        variant="elevated"
        style={{
          width: 392,
          borderRadius: 20,
          overflow: 'hidden',
          padding: 0,
          border: '1px solid #dbe3ef',
          boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08)',
        }}
      >
        <div style={{
          height: 108,
          background: '#e8eef8',
          position: 'relative',
          borderBottom: '1px solid #dbe3ef',
        }} />

        <div style={{ padding: '0 24px 24px', marginTop: -44 }}>
          <Flex vertical align="center" gap="sm">
            <Avatar
              size={88}
              style={{
                backgroundColor: '#0f172a',
                fontSize: 32,
                fontWeight: 700,
                border: '4px solid var(--ty-color-bg-container)',
                boxShadow: '0 8px 18px rgba(15, 23, 42, 0.14)',
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
              <Tag variant="soft" color="blue" style={{ borderRadius: 20 }}>React</Tag>
              <Tag variant="soft" color="cyan" style={{ borderRadius: 20 }}>TypeScript</Tag>
              <Tag variant="soft" color="default" style={{ borderRadius: 20 }}>Design Systems</Tag>
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
              borderRadius: 12,
              height: 42,
              fontWeight: 600,
              background: '#0f172a',
              border: '1px solid #0f172a',
            }}>
              Follow
            </Button>
            <Button block btnType="outline" style={{ borderRadius: 12, height: 42, fontWeight: 600 }}>
              Message
            </Button>
          </Flex>
        </div>
      </Card>
    </Flex>
  );
}
