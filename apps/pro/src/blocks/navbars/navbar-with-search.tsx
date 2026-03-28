import { Avatar, Button, Flex, Input, Menu, Typography } from '@tiny-design/react';

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
          <Text style={{ fontWeight: 700, fontSize: 18 }}>Workspace</Text>
          <Menu mode="horizontal" defaultIndex="home">
            <Menu.Item index="home">Home</Menu.Item>
            <Menu.Item index="docs">Docs</Menu.Item>
            <Menu.Item index="api">API</Menu.Item>
          </Menu>
        </Flex>
        <Flex align="center" gap="sm">
          <Input placeholder="Search..." size="sm" style={{ width: 200 }} />
          <Button size="sm" btnType="primary">Upgrade</Button>
          <Avatar size={32} style={{ backgroundColor: '#6e41bf', cursor: 'pointer' }}>U</Avatar>
        </Flex>
      </Flex>
    </div>
  );
}
