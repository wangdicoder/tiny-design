import { Avatar, Button, Flex, Input, Keyboard, Menu, Tag, Typography } from '@tiny-design/react';
import { IconSearch, IconBroadcast } from '@tiny-design/icons';

const { Text } = Typography;

export default function NavbarWithSearch() {
  return (
    <div
      style={{
        borderBottom: '1px solid #dbe3ef',
        padding: '0 24px',
        background: '#fff',
      }}
    >
      <Flex align="center" justify="space-between" style={{ height: 60 }}>
        <Flex align="center" gap="lg">
          <Flex align="center" gap="sm">
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>W</Text>
            </div>
            <Text style={{ fontWeight: 700, fontSize: 17 }}>Workspace</Text>
            <Tag variant="soft" color="default" style={{ borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
            style={{ width: 220, borderRadius: 12, background: '#fbfcfe' }}
          />
          <Button size="sm" btnType="primary" style={{
            borderRadius: 12,
            fontWeight: 600,
            background: '#0f172a',
            border: '1px solid #0f172a',
          }}>
            <Flex align="center" gap="sm">
              <IconBroadcast style={{ fontSize: 14 }} />
              <span>Upgrade</span>
            </Flex>
          </Button>
          <Avatar size={32} presence="online" style={{ backgroundColor: '#334155', fontWeight: 600, cursor: 'pointer' }}>
            U
          </Avatar>
        </Flex>
      </Flex>
    </div>
  );
}
