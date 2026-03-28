import { Button, Card, Flex, Form, Input, NativeSelect, Textarea, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

export default function ContactForm() {
  return (
    <Flex justify="center" style={{ padding: 24 }}>
      <Card variant="elevated" style={{ width: '100%', maxWidth: 560 }}>
        <Heading level={4} style={{ marginBottom: 4 }}>Contact Us</Heading>
        <Text style={{ color: 'var(--ty-color-text-secondary)', display: 'block', marginBottom: 24 }}>
          Fill out the form below and we'll get back to you within 24 hours.
        </Text>
        <Form layout="vertical">
          <Flex gap="sm">
            <Form.Item label="First name" style={{ flex: 1 }}>
              <Input placeholder="John" />
            </Form.Item>
            <Form.Item label="Last name" style={{ flex: 1 }}>
              <Input placeholder="Doe" />
            </Form.Item>
          </Flex>
          <Form.Item label="Email">
            <Input placeholder="john@example.com" />
          </Form.Item>
          <Form.Item label="Subject">
            <NativeSelect>
              <NativeSelect.Option value="">Select a subject</NativeSelect.Option>
              <NativeSelect.Option value="general">General Inquiry</NativeSelect.Option>
              <NativeSelect.Option value="support">Technical Support</NativeSelect.Option>
              <NativeSelect.Option value="billing">Billing</NativeSelect.Option>
              <NativeSelect.Option value="feedback">Feedback</NativeSelect.Option>
            </NativeSelect>
          </Form.Item>
          <Form.Item label="Message">
            <Textarea defaultValue="" rows={4} />
          </Form.Item>
          <Flex justify="end" gap="sm">
            <Button btnType="outline">Cancel</Button>
            <Button btnType="primary">Send Message</Button>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
}
