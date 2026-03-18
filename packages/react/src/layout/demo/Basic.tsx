import React from 'react';
import { Layout } from '@tiny-design/react';

export default function BasicDemo() {
  const layoutStyle = {
    marginBottom: '50px',
  };

  const headerStyle = {
    background: 'rgba(110, 65, 191, 0.7)',
    color: '#fff',
    textAlign: 'center',
    height: '64px',
    lineHeight: '64px',
  };

  const footerStyle = {
    background: 'rgba(110, 65, 191, 0.7)',
    color: '#fff',
    textAlign: 'center',
  };

  const contentStyle = {
    background: 'rgba(110, 65, 191, 0.98)',
    color: '#fff',
    minHeight: '120px',
    lineHeight: '120px',
    textAlign: 'center',
  };

  const sidebarStyle = {
    background: 'rgba(110, 65, 191, 0.84)',
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