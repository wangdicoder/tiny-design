import { Avatar, Button, Flex, Input, Keyboard, Menu, Tag, Typography } from '@tiny-design/react';
import { IconSearch, IconBroadcast } from '@tiny-design/icons';

const { Text } = Typography;

export default function NavbarWithSearch() {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--ty-color-border)',
        padding: '0 24px',
        background: 'var(--ty-color-bg-container)',
      }}
    >
      <Flex align="center" justify="space-between" style={{ height: 60 }}>
        <Flex align="center" gap="lg">
          <Flex align="center" gap="sm">
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>W</Text>
            </div>
            <Text style={{ fontWeight: 700, fontSize: 17 }}>Workspace</Text>
            <Tag variant="soft" color="cyan" style={{ borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pro
            </Tag>
          </Flex>
          <Menu mode="horizontal" defaultIndex="home">
            <Menu.Item index="home">Home</Menu.Item>
            <Menu.Item index="docs">Docs</Menu.Item>
            <Menu.Item index="api">API</Menu.Item>
            <Menu.Item index="changelog">Changelog</Menu.Item>
          </Menu>
        </Flex>
        <Flex align="center" gap="sm">
          <Input
            placeholder="Search..."
            prefix={<IconSearch style={{ color: 'var(--ty-color-text-tertiary)', fontSize: 14 }} />}
            suffix={<Keyboard>/</Keyboard>}
            size="sm"
            style={{ width: 220, borderRadius: 8 }}
          />
          <Button size="sm" btnType="primary" style={{
            borderRadius: 8,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
            border: 'none',
          }}>
            <Flex align="center" gap="sm">
              <IconBroadcast style={{ fontSize: 14 }} />
              <span>Upgrade</span>
            </Flex>
          </Button>
          <Avatar size={32} presence="online" style={{ backgroundColor: '#0891b2', fontWeight: 600, cursor: 'pointer' }}>
            U
          </Avatar>
        </Flex>
      </Flex>
    </div>
  );
}
