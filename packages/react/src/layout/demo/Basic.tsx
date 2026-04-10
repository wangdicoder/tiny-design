import React from 'react';
import { Layout } from '@tiny-design/react';

export default function BasicDemo() {
  const layoutStyle = {
    marginBottom: '50px',
  };

  const headerStyle = {
    background: 'color-mix(in srgb, var(--ty-color-primary) 70%, transparent)',
    color: '#fff',
    textAlign: 'center',
    height: '64px',
    lineHeight: '64px',
  };

  const footerStyle = {
    background: 'color-mix(in srgb, var(--ty-color-primary) 70%, transparent)',
    color: '#fff',
    textAlign: 'center',
  };

  const contentStyle = {
    background: 'color-mix(in srgb, var(--ty-color-primary) 98%, transparent)',
    color: '#fff',
    minHeight: '120px',
    lineHeight: '120px',
    textAlign: 'center',
  };

  const sidebarStyle = {
    background: 'color-mix(in srgb, var(--ty-color-primary) 84%, transparent)',
    color: '#fff',
    textAlign: 'center',
    paddingTop: '30px',
  };

  const { Sidebar, Header, Footer, Content } = Layout;

  return (
    <div>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>Content</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>

      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Sidebar style={sidebarStyle}>Sidebar</Sidebar>
          <Content style={contentStyle}>Content</Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>

      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Content style={contentStyle}>Content</Content>
          <Sidebar style={sidebarStyle}>Sidebar</Sidebar>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>

      <Layout>
        <Sidebar style={sidebarStyle}>Sidebar</Sidebar>
        <Layout>
          <Header style={headerStyle}>Header</Header>
          <Content style={contentStyle}>Content</Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}
