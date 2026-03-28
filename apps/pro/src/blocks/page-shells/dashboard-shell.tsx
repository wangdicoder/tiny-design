import { Avatar, Button, Card, Flex, Layout, Menu, Statistic, Typography } from '@tiny-design/react';

const { Heading } = Typography;
const { Header, Sidebar, Content } = Layout;

export default function DashboardShell() {
  return (
    <Layout style={{ minHeight: 500, border: '1px solid var(--ty-color-border)', borderRadius: 8, overflow: 'hidden' }}>
      <Sidebar width={220} style={{ background: 'var(--ty-color-bg-container)', borderRight: '1px solid var(--ty-color-border)' }}>
        <div style={{ padding: '16px 20px', fontWeight: 700, fontSize: 16 }}>Dashboard</div>
        <Menu mode="vertical" defaultIndex="overview">
          <Menu.Item index="overview">Overview</Menu.Item>
          <Menu.Item index="analytics">Analytics</Menu.Item>
          <Menu.Item index="reports">Reports</Menu.Item>
          <Menu.Item index="users">Users</Menu.Item>
          <Menu.Item index="settings">Settings</Menu.Item>
        </Menu>
      </Sidebar>
      <Layout>
        <Header style={{ background: 'var(--ty-color-bg-container)', borderBottom: '1px solid var(--ty-color-border)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Heading level={5} style={{ margin: 0 }}>Overview</Heading>
          <Flex align="center" gap="sm">
            <Button size="sm" btnType="primary">Create Report</Button>
            <Avatar size={32} style={{ backgroundColor: '#6e41bf' }}>U</Avatar>
          </Flex>
        </Header>
        <Content style={{ padding: 24 }}>
          <Flex gap="md" wrap="wrap">
            <Card style={{ flex: '1 1 200px' }}>
              <Statistic title="Total Users" value={12834} />
            </Card>
            <Card style={{ flex: '1 1 200px' }}>
              <Statistic title="Revenue" value={45231} prefix="$" />
            </Card>
            <Card style={{ flex: '1 1 200px' }}>
              <Statistic title="Orders" value={1283} />
            </Card>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}
