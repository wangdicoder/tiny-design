import { Avatar, Button, Card, Divider, Flex, Layout, Menu, Statistic, Tag, Typography } from '@tiny-design/react';
import { IconTeam, IconSearch, IconWallet, IconBullish } from '@tiny-design/icons';

const { Heading, Text } = Typography;
const { Header, Sidebar, Content } = Layout;

export default function DashboardShell() {
  return (
    <Layout
      style={{
        minHeight: 580,
        border: '1px solid #dbe3ef',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 18px 36px rgba(15, 23, 42, 0.08)',
      }}
    >
      <Sidebar width={240} style={{ background: '#f8fafc', borderRight: '1px solid #dbe3ef' }}>
        <Flex align="center" gap="sm" style={{ padding: '16px 20px' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>A</Text>
          </div>
          <div style={{ lineHeight: 1.3 }}>
            <Text style={{ fontWeight: 700, fontSize: 14, display: 'block' }}>Acme Inc</Text>
            <Text style={{ fontSize: 11, color: 'var(--ty-color-text-tertiary)', display: 'block' }}>Enterprise</Text>
          </div>
        </Flex>
        <Divider style={{ margin: 0 }} />
        <div style={{ padding: '12px 12px 8px' }}>
          <div style={{ padding: '4px 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ty-color-text-tertiary)', marginBottom: 4 }}>
            Main
          </div>
          <Menu mode="vertical" defaultIndex="overview">
            <Menu.Item index="overview">Overview</Menu.Item>
            <Menu.Item index="analytics">Analytics</Menu.Item>
            <Menu.Item index="reports">Reports</Menu.Item>
          </Menu>
          <div style={{ padding: '12px 8px 4px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ty-color-text-tertiary)', marginBottom: 4 }}>
            Manage
          </div>
          <Menu mode="vertical">
            <Menu.Item index="users">Users</Menu.Item>
            <Menu.Item index="settings">Settings</Menu.Item>
          </Menu>
        </div>
        <div style={{ marginTop: 'auto', padding: '12px 16px', borderTop: '1px solid #dbe3ef' }}>
          <Flex align="center" gap="sm">
            <Avatar size={32} presence="online" style={{ backgroundColor: '#0f172a', fontWeight: 600, fontSize: 12 }}>JD</Avatar>
            <div style={{ lineHeight: 1.3 }}>
              <Text style={{ fontWeight: 600, fontSize: 13, display: 'block' }}>Jane Doe</Text>
              <Text style={{ fontSize: 11, color: 'var(--ty-color-text-tertiary)', display: 'block' }}>Admin</Text>
            </div>
          </Flex>
        </div>
      </Sidebar>
      <Layout>
        <Header style={{
          background: '#fff',
          borderBottom: '1px solid #dbe3ef',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Heading level={5} style={{ margin: 0 }}>Overview</Heading>
          <Flex align="center" gap="sm">
            <Button size="sm" btnType="ghost" style={{ borderRadius: 12 }}>
              <IconSearch style={{ fontSize: 16 }} />
            </Button>
            <Button size="sm" btnType="primary" style={{ borderRadius: 12, fontWeight: 600, background: '#0f172a', border: '1px solid #0f172a' }}>
              Create Report
            </Button>
          </Flex>
        </Header>
        <Content style={{ padding: 24, background: '#f3f6fa' }}>
          <Flex gap="md" wrap="wrap">
            {[
              { title: 'Total Users', value: 12834, icon: IconTeam, color: '#1d4ed8', bg: '#eff6ff', change: '+12%' },
              { title: 'Revenue', value: 45231, prefix: '$', icon: IconWallet, color: '#15803d', bg: '#f0fdf4', change: '+8.2%' },
              { title: 'Growth', value: 23.5, suffix: '%', icon: IconBullish, color: '#0f766e', bg: '#ecfeff', change: '+4.1%' },
            ].map((s) => (
              <Card key={s.title} style={{ flex: '1 1 180px', borderRadius: 14, border: '1px solid #dbe3ef' }}>
                <div style={{ padding: 16 }}>
                  <Flex justify="space-between" align="start">
                    <div>
                      <Text style={{ fontSize: 12, color: 'var(--ty-color-text-secondary)', fontWeight: 500, display: 'block', marginBottom: 6 }}>{s.title}</Text>
                      <Statistic value={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, border: '1px solid rgba(148, 163, 184, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <s.icon style={{ fontSize: 18, color: s.color }} />
                    </div>
                  </Flex>
                  <Tag color="green" variant="soft" style={{ marginTop: 8, fontSize: 11, fontWeight: 600 }}>{s.change}</Tag>
                </div>
              </Card>
            ))}
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}
