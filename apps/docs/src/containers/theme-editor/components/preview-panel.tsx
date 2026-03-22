import React from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Input,
  InputNumber,
  Pagination,
  Progress,
  Radio,
  Select,
  Slider,
  Space,
  Steps,
  Switch,
  Tabs,
  Tag,
} from '@tiny-design/react';

export const PreviewPanel = (): React.ReactElement => {
  return (
    <div className="theme-editor__preview">
      <h3 className="theme-editor__preview-title">Live Preview</h3>

      {/* Buttons */}
      <section className="theme-editor__preview-section">
        <h4>Buttons</h4>
        <Space wrap>
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
        </Space>
        <Space style={{ marginTop: 8 }}>
          <Button size="sm" btnType="primary">Small</Button>
          <Button size="md" btnType="primary">Medium</Button>
          <Button size="lg" btnType="primary">Large</Button>
        </Space>
      </section>

      <Divider />

      {/* Form Inputs */}
      <section className="theme-editor__preview-section">
        <h4>Form Controls</h4>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="Input text..." />
          <Space>
            <InputNumber defaultValue={42} />
            <Select defaultValue="option1" style={{ width: 160 }}>
              <Select.Option value="option1">Option 1</Select.Option>
              <Select.Option value="option2">Option 2</Select.Option>
              <Select.Option value="option3">Option 3</Select.Option>
            </Select>
          </Space>
          <Space>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Radio.Group defaultValue="a">
              <Radio value="a">Radio A</Radio>
              <Radio value="b">Radio B</Radio>
            </Radio.Group>
            <Switch defaultChecked />
          </Space>
          <Slider defaultValue={40} />
        </Space>
      </section>

      <Divider />

      {/* Data Display */}
      <section className="theme-editor__preview-section">
        <h4>Data Display</h4>
        <Card title="Card Title" style={{ marginBottom: 16 }}>
          <p>Card content with some text to show how typography looks in a card component.</p>
        </Card>
        <Flex gap="sm" wrap="wrap">
          <Tag>Default</Tag>
          <Tag color="primary">Primary</Tag>
          <Tag color="success">Success</Tag>
          <Tag color="warning">Warning</Tag>
          <Tag color="danger">Danger</Tag>
          <Tag color="blue">Blue</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="orange">Orange</Tag>
        </Flex>
        <Space style={{ marginTop: 12 }}>
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
        </Space>
        <Progress.Bar percent={65} style={{ marginTop: 12 }} />
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
      </section>

      <Divider />

      {/* Navigation */}
      <section className="theme-editor__preview-section">
        <h4>Navigation</h4>
        <Tabs defaultActiveKey="1">
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
    </div>
  );
};
