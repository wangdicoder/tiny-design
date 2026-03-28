import { Avatar, Button, Flex, Menu, Typography } from '@tiny-design/react';

const { Text } = Typography;

export default function NavbarSimple() {
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
          <Text style={{ fontWeight: 700, fontSize: 18 }}>Acme Inc</Text>
          <Menu mode="horizontal" defaultIndex="dashboard">
            <Menu.Item index="dashboard">Dashboard</Menu.Item>
            <Menu.Item index="projects">Projects</Menu.Item>
            <Menu.Item index="team">Team</Menu.Item>
            <Menu.Item index="settings">Settings</Menu.Item>
          </Menu>
        </Flex>
        <Flex align="center" gap="sm">
          <Button size="sm" btnType="outline">Feedback</Button>
          <Avatar size={32} style={{ backgroundColor: '#6e41bf', cursor: 'pointer' }}>
            U
          </Avatar>
        </Flex>
      </Flex>
    </div>
  );
}
