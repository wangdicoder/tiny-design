import { Avatar, Divider, Flex, Menu, Progress, Tag, Typography } from '@tiny-design/react';

const { Text } = Typography;

export default function SidebarWithGroups() {
  return (
    <div
      style={{
        width: 260,
        minHeight: 540,
        background: 'var(--ty-color-bg-container)',
        borderRight: '1px solid var(--ty-color-border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Organization header */}
      <Flex align="center" gap="sm" style={{ padding: '16px 20px' }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Text style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>A</Text>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontWeight: 700, fontSize: 14, display: 'block' }}>Acme Inc</Text>
          <Tag variant="soft" color="purple" style={{ borderRadius: 20, fontSize: 10, fontWeight: 600, marginTop: 2 }}>
            Pro Plan
          </Tag>
        </div>
      </Flex>

      <Divider style={{ margin: 0 }} />

      {/* Navigation groups */}
      <div style={{ flex: 1, padding: '12px 12px 8px', overflow: 'auto' }}>
        <div style={{ padding: '4px 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ty-color-text-tertiary)', marginBottom: 4 }}>
          General
        </div>
        <Menu mode="vertical" defaultIndex="dashboard">
          <Menu.Item index="dashboard">Dashboard</Menu.Item>
          <Menu.Item index="projects">Projects</Menu.Item>
          <Menu.Item index="tasks">Tasks</Menu.Item>
          <Menu.Item index="analytics">Analytics</Menu.Item>
        </Menu>

        <div style={{ padding: '16px 8px 4px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ty-color-text-tertiary)', marginBottom: 4 }}>
          Settings
        </div>
        <Menu mode="vertical">
          <Menu.Item index="general">General</Menu.Item>
          <Menu.Item index="members">Members</Menu.Item>
          <Menu.Item index="billing">Billing</Menu.Item>
        </Menu>
      </div>

      {/* Usage footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--ty-color-border)' }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 6 }}>
          <Text style={{ fontSize: 12, fontWeight: 500, color: 'var(--ty-color-text-secondary)' }}>Storage used</Text>
          <Text style={{ fontSize: 12, fontWeight: 600, color: 'var(--ty-color-text-secondary)' }}>7.2 / 10 GB</Text>
        </Flex>
        <Progress.Bar percent={72} showInfo={false} style={{ height: 6 }} />
      </div>

      {/* User footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--ty-color-border)' }}>
        <Flex align="center" gap="sm">
          <Avatar size={32} presence="online" style={{ backgroundColor: '#6366f1', fontWeight: 600, fontSize: 12 }}>JD</Avatar>
          <div style={{ flex: 1, lineHeight: 1.3 }}>
            <Text style={{ fontWeight: 600, fontSize: 13, display: 'block' }}>Jane Doe</Text>
            <Text style={{ fontSize: 11, color: 'var(--ty-color-text-tertiary)', display: 'block' }}>jane@acme.co</Text>
          </div>
        </Flex>
      </div>
    </div>
  );
}
