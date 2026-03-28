import { Avatar, Divider, Flex, Menu, Typography } from '@tiny-design/react';

const { Text } = Typography;

export default function SidebarWithGroups() {
  return (
    <div
      style={{
        width: 260,
        minHeight: 500,
        background: 'var(--ty-color-bg-container)',
        borderRight: '1px solid var(--ty-color-border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Flex align="center" gap="sm" style={{ padding: '16px 20px' }}>
        <Avatar size={32} style={{ backgroundColor: '#6e41bf' }}>A</Avatar>
        <div>
          <Text style={{ fontWeight: 600, fontSize: 14 }}>Acme Inc</Text>
          <br />
          <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Free plan</Text>
        </div>
      </Flex>
      <Divider style={{ margin: 0 }} />
      <div style={{ flex: 1, padding: '8px 0' }}>
        <div style={{ padding: '8px 20px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ty-color-text-tertiary)' }}>
          General
        </div>
        <Menu mode="vertical" defaultIndex="dashboard">
          <Menu.Item index="dashboard">Dashboard</Menu.Item>
          <Menu.Item index="projects">Projects</Menu.Item>
          <Menu.Item index="tasks">Tasks</Menu.Item>
        </Menu>
        <div style={{ padding: '16px 20px 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ty-color-text-tertiary)' }}>
          Settings
        </div>
        <Menu mode="vertical">
          <Menu.Item index="general">General</Menu.Item>
          <Menu.Item index="members">Members</Menu.Item>
          <Menu.Item index="billing">Billing</Menu.Item>
        </Menu>
      </div>
    </div>
  );
}
