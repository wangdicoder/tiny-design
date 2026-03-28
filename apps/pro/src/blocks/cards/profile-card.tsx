import { Avatar, Button, Card, Divider, Flex, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

export default function ProfileCard() {
  return (
    <Flex justify="center" style={{ padding: 24 }}>
      <Card variant="elevated" style={{ width: 340, textAlign: 'center' }}>
        <Flex vertical align="center" gap="sm">
          <Avatar size={80} style={{ backgroundColor: '#6e41bf', fontSize: 32 }}>
            DW
          </Avatar>
          <div>
            <Heading level={4} style={{ margin: 0 }}>Di Wang</Heading>
            <Text style={{ color: 'var(--ty-color-text-secondary)' }}>Software Engineer</Text>
          </div>
          <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13 }}>
            Building beautiful UIs with Tiny Design. Open-source enthusiast.
          </Text>
        </Flex>
        <Divider />
        <Flex justify="space-around">
          <Flex vertical align="center">
            <Text style={{ fontWeight: 600, fontSize: 18 }}>128</Text>
            <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Projects</Text>
          </Flex>
          <Flex vertical align="center">
            <Text style={{ fontWeight: 600, fontSize: 18 }}>1.2k</Text>
            <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Followers</Text>
          </Flex>
          <Flex vertical align="center">
            <Text style={{ fontWeight: 600, fontSize: 18 }}>384</Text>
            <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Following</Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex gap="sm">
          <Button block btnType="primary">Follow</Button>
          <Button block btnType="outline">Message</Button>
        </Flex>
      </Card>
    </Flex>
  );
}
