import React from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  Dropdown,
  Flex,
  Input,
  InputNumber,
  Link,
  Menu,
  Pagination,
  Popover,
  Progress,
  Radio,
  Rate,
  Segmented,
  Select,
  Skeleton,
  Slider,
  Space,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  Timeline,
  Tooltip,
  Typography,
} from '@tiny-design/react';

const tableColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Role', dataIndex: 'role', key: 'role' },
];

const tableData = [
  { key: '1', name: 'Alice', age: 28, role: 'Designer' },
  { key: '2', name: 'Bob', age: 32, role: 'Developer' },
  { key: '3', name: 'Carol', age: 25, role: 'Manager' },
];

const dropdownMenu = (
  <Menu>
    <Menu.Item index="1">Action 1</Menu.Item>
    <Menu.Item index="2">Action 2</Menu.Item>
    <Menu.Item index="3">Action 3</Menu.Item>
  </Menu>
);

export const PreviewPanel = (): React.ReactElement => {
  return (
    <div className="theme-editor__preview">
      <h3 className="theme-editor__preview-title">Live Preview</h3>

      {/* Buttons */}
      <section className="theme-editor__preview-section">
        <h4>Buttons</h4>
        <Flex gap="sm" wrap="wrap">
          <Button btnType="primary">Primary</Button>
          <Button>Default</Button>
          <Button btnType="outline">Outline</Button>
          <Button btnType="ghost">Ghost</Button>
          <Button btnType="link">Link</Button>
          <Button btnType="danger">Danger</Button>
          <Button btnType="primary" loading>
            Loading
          </Button>
          <Button disabled>Disabled</Button>
        </Flex>
        <Flex gap="sm" align="center" style={{ marginTop: 8 }}>
          <Button size="sm" btnType="primary">Small</Button>
          <Button size="md" btnType="primary">Medium</Button>
          <Button size="lg" btnType="primary">Large</Button>
          <Dropdown overlay={dropdownMenu}>
            <Button btnType="outline">Dropdown</Button>
          </Dropdown>
        </Flex>
      </section>

      <Divider />

      {/* Form Controls */}
      <section className="theme-editor__preview-section">
        <h4>Form Controls</h4>
        <Flex gap="sm" wrap="wrap">
          <Input placeholder="Input text..." style={{ width: 200 }} />
          <InputNumber defaultValue={42} style={{ width: 120 }} />
          <Select defaultValue="option1" style={{ width: 160 }}>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select>
        </Flex>
        <Flex gap="sm" align="center" style={{ marginTop: 12 }}>
          <Checkbox defaultChecked>Checkbox</Checkbox>
          <Radio.Group defaultValue="a">
            <Radio value="a">Radio A</Radio>
            <Radio value="b">Radio B</Radio>
          </Radio.Group>
          <Switch defaultChecked />
          <Rate defaultValue={3} />
        </Flex>
        <Slider defaultValue={40} style={{ marginTop: 12 }} />
        <Textarea rows={2} defaultValue="" style={{ marginTop: 12 }} />
      </section>

      <Divider />

      {/* Data Display */}
      <section className="theme-editor__preview-section">
        <h4>Data Display</h4>
        <Flex gap="md" wrap="wrap" style={{ marginBottom: 16 }}>
          <Statistic title="Users" value={1128} />
          <Statistic title="Revenue" value={9280} prefix="$" />
          <Statistic title="Growth" value={12.5} suffix="%" precision={1} />
        </Flex>
        <Table columns={tableColumns} dataSource={tableData} pagination={false} bordered />
        <Card title="Card Title" style={{ marginTop: 16 }}>
          <Card.Content>
            <p>Card content with some text to show how typography looks in a card component.</p>
            <p>Card content with some text to show how typography looks in a card component.</p>
          </Card.Content>
        </Card>
        <Flex gap="sm" wrap="wrap" style={{ marginTop: 16 }}>
          <Tag>Default</Tag>
          <Tag color="success">Success</Tag>
          <Tag color="warning">Warning</Tag>
          <Tag color="danger">Danger</Tag>
          <Tag color="blue">Blue</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="orange">Orange</Tag>
        </Flex>
        <Flex gap="sm" align="center" style={{ marginTop: 12 }}>
          <Badge count={5}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 'var(--ty-border-radius)',
                background: 'var(--ty-color-bg-spotlight)',
              }}
            />
          </Badge>
          <Badge dot>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 'var(--ty-border-radius)',
                background: 'var(--ty-color-bg-spotlight)',
              }}
            />
          </Badge>
          <Avatar size={42}>A</Avatar>
          <Avatar size={42} shape="square">B</Avatar>
          <Avatar size={42} presence="online">C</Avatar>
        </Flex>
        <Flex gap="lg" style={{ marginTop: 16 }}>
          <Progress.Circle percent={75} width={80} />
          <Progress.Circle percent={50} width={80} strokeColor="green" />
          <Progress.Circle percent={90} width={80} strokeColor="yellow" />
        </Flex>
        <Progress.Bar percent={65} style={{ marginTop: 12 }} />
      </section>

      <Divider />

      {/* Typography & Overlay */}
      <section className="theme-editor__preview-section">
        <h4>Typography & Overlay</h4>
        <Typography>
          <Typography.Heading level={4}>Heading</Typography.Heading>
          <Typography.Paragraph>
            This is a paragraph with <Typography.Text strong>bold</Typography.Text>,{' '}
            <Typography.Text italic>italic</Typography.Text>,{' '}
            <Typography.Text code>code</Typography.Text>, and{' '}
            <Typography.Text mark>marked</Typography.Text> text.{' '}
            <Link href="#">Learn more</Link>
          </Typography.Paragraph>
        </Typography>
        <Flex gap="sm" style={{ marginTop: 12 }}>
          <Tooltip title="Tooltip text">
            <Button>Tooltip</Button>
          </Tooltip>
          <Popover title="Popover Title" content="Popover content goes here.">
            <Button>Popover</Button>
          </Popover>
        </Flex>
      </section>

      <Divider />

      {/* Feedback */}
      <section className="theme-editor__preview-section">
        <h4>Feedback</h4>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert type="success" title="Success alert message" />
          <Alert type="info" title="Info alert message" />
          <Alert type="warning" title="Warning alert message" />
          <Alert type="error" title="Error alert message" />
        </Space>
        <Skeleton active style={{ marginTop: 16 }} />
      </section>

      <Divider />

      {/* Navigation */}
      <section className="theme-editor__preview-section">
        <h4>Navigation</h4>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Theme</Breadcrumb.Item>
          <Breadcrumb.Item>Editor</Breadcrumb.Item>
        </Breadcrumb>
        <Segmented
          options={['Daily', 'Weekly', 'Monthly', 'Yearly']}
          style={{ marginTop: 12 }}
        />
        <Tabs defaultActiveKey="1" style={{ marginTop: 12 }}>
          <Tabs.Panel tab="Tab 1" tabKey="1">
            Tab content 1
          </Tabs.Panel>
          <Tabs.Panel tab="Tab 2" tabKey="2">
            Tab content 2
          </Tabs.Panel>
          <Tabs.Panel tab="Tab 3" tabKey="3">
            Tab content 3
          </Tabs.Panel>
        </Tabs>
        <Steps current={1} style={{ marginTop: 16 }}>
          <Steps.Step title="Finished" />
          <Steps.Step title="In Progress" />
          <Steps.Step title="Waiting" />
        </Steps>
        <Pagination total={100} defaultCurrent={1} style={{ marginTop: 16 }} />
      </section>

      <Divider />

      {/* Expandable */}
      <section className="theme-editor__preview-section">
        <h4>Expandable & Timeline</h4>
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel itemKey="1" header="Panel 1">
            Content for the first collapsible panel.
          </Collapse.Panel>
          <Collapse.Panel itemKey="2" header="Panel 2">
            Content for the second collapsible panel.
          </Collapse.Panel>
          <Collapse.Panel itemKey="3" header="Panel 3" disabled>
            This panel is disabled.
          </Collapse.Panel>
        </Collapse>
        <Timeline style={{ marginTop: 16 }}>
          <Timeline.Item>Design review completed</Timeline.Item>
          <Timeline.Item>Development in progress</Timeline.Item>
          <Timeline.Item>Testing pending</Timeline.Item>
        </Timeline>
      </section>
    </div>
  );
};
