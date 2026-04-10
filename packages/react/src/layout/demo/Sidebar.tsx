import React from 'react';
import { Layout } from '@tiny-design/react';

export default function SidebarDemo() {
  const { Sidebar, Header, Content } = Layout;
  const [collapsed, setCollapsed] = React.useState(false);

  const sidebarStyle = {
    background: 'color-mix(in srgb, var(--ty-color-primary) 84%, transparent)',
    color: '#fff',
    textAlign: 'center',
  };

  const headerStyle = {
    background: 'color-mix(in srgb, var(--ty-color-primary) 70%, transparent)',
    color: '#fff',
    height: '64px',
    lineHeight: '64px',
    textAlign: 'center',
  };

  const contentStyle = {
    background: 'color-mix(in srgb, var(--ty-color-primary) 98%, transparent)',
    color: '#fff',
    minHeight: '200px',
    lineHeight: '200px',
    textAlign: 'center',
  };

  return (
    <Layout>
      <Sidebar
        style={sidebarStyle}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        collapsedWidth={60}
      >
        <div style={{ padding: '16px 0' }}>
          {collapsed ? '☰' : 'Sidebar'}
        </div>
      </Sidebar>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>Content</Content>
      </Layout>
    </Layout>
  );
}
