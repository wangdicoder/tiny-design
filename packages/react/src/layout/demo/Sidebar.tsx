import React from 'react';
import { Layout } from '@tiny-design/react';

export default function SidebarDemo() {
  const { Sidebar, Header, Content } = Layout;
  const [collapsed, setCollapsed] = React.useState(false);

  const sidebarStyle = {
    background: 'rgba(110, 65, 191, 0.84)',
    color: '#fff',
    textAlign: 'center',
  };

  const headerStyle = {
    background: 'rgba(110, 65, 191, 0.7)',
    color: '#fff',
    height: '64px',
    lineHeight: '64px',
    textAlign: 'center',
  };

  const contentStyle = {
    background: 'rgba(110, 65, 191, 0.98)',
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