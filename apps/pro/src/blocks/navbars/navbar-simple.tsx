import { Avatar, Badge, Button, Flex, Menu, Typography } from '@tiny-design/react';
import { IconFeedback, IconSetting } from '@tiny-design/icons';

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
          <Flex align="center" gap="sm">
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>A</Text>
            </div>
            <Text style={{ fontWeight: 700, fontSize: 17 }}>Acme Inc</Text>
          </Flex>
          <Menu mode="horizontal" defaultIndex="dashboard">
            <Menu.Item index="dashboard">Dashboard</Menu.Item>
            <Menu.Item index="projects">Projects</Menu.Item>
            <Menu.Item index="team">Team</Menu.Item>
            <Menu.Item index="reports">Reports</Menu.Item>
          </Menu>
        </Flex>
        <Flex align="center" gap="sm">
          <Button size="sm" btnType="ghost" style={{ borderRadius: 8 }}>
            <IconFeedback style={{ fontSize: 18 }} />
          </Button>
          <Button size="sm" btnType="ghost" style={{ borderRadius: 8 }}>
            <Badge dot>
              <IconSetting style={{ fontSize: 18 }} />
            </Badge>
          </Button>
          <div style={{ width: 1, height: 24, background: 'var(--ty-color-border)', margin: '0 4px' }} />
          <Flex align="center" gap="sm" style={{ cursor: 'pointer' }}>
            <Avatar size={32} presence="online" style={{ backgroundColor: '#6366f1', fontWeight: 600 }}>
              JD
            </Avatar>
            <div style={{ lineHeight: 1.3 }}>
              <Text style={{ fontWeight: 600, fontSize: 13, display: 'block' }}>Jane Doe</Text>
              <Text style={{ fontSize: 11, color: 'var(--ty-color-text-tertiary)', display: 'block' }}>Admin</Text>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
