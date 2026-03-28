import { Breadcrumb, Button, Divider, Flex, Tag, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

export default function PageHeaderWithBreadcrumb() {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Tiny Design</Breadcrumb.Item>
      </Breadcrumb>
      <Flex justify="space-between" align="start" style={{ marginTop: 12 }}>
        <div>
          <Flex align="center" gap="sm">
            <Heading level={3} style={{ margin: 0 }}>Tiny Design</Heading>
            <Tag color="green" variant="soft">Active</Tag>
          </Flex>
          <Text style={{ color: 'var(--ty-color-text-secondary)', marginTop: 4, display: 'block' }}>
            A friendly UI component set for React
          </Text>
        </div>
        <Flex gap="sm">
          <Button btnType="outline">Settings</Button>
          <Button btnType="primary">Deploy</Button>
        </Flex>
      </Flex>
      <Divider style={{ marginTop: 16, marginBottom: 0 }} />
    </div>
  );
}
