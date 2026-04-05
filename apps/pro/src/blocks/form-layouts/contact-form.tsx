import { Button, Card, Flex, Form, Input, NativeSelect, Textarea, Typography } from '@tiny-design/react';
import { IconComment, IconCustomerSupport } from '@tiny-design/icons';

const { Heading, Text } = Typography;

export default function ContactForm() {
  return (
    <div style={{
      padding: 48,
      background: 'linear-gradient(180deg, var(--ty-color-bg-container) 0%, var(--ty-color-bg-layout) 100%)',
      minHeight: 600,
    }}>
      <Flex justify="center">
        <div style={{ width: '100%', maxWidth: 600 }}>
          <Flex vertical align="center" style={{ marginBottom: 32, textAlign: 'center' }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
            }}>
              <IconCustomerSupport style={{ fontSize: 24, color: '#fff' }} />
            </div>
            <Heading level={3} style={{ margin: 0 }}>Get in touch</Heading>
            <Text style={{ color: 'var(--ty-color-text-secondary)', marginTop: 4, maxWidth: 400 }}>
              Have a question or need help? Fill out the form below and our team will get back to you within 24 hours.
            </Text>
          </Flex>

          <Card variant="elevated" style={{ borderRadius: 16 }}>
            <div style={{ padding: 16 }}>
            <Form layout="vertical">
              <Flex gap="sm">
                <Form.Item label="First name" style={{ flex: 1 }}>
                  <Input placeholder="John" style={{ height: 42, borderRadius: 12 }} />
                </Form.Item>
                <Form.Item label="Last name" style={{ flex: 1 }}>
                  <Input placeholder="Doe" style={{ height: 42, borderRadius: 12 }} />
                </Form.Item>
              </Flex>
              <Form.Item label="Email">
                <Input placeholder="john@example.com" style={{ height: 42, borderRadius: 12 }} />
              </Form.Item>
              <Form.Item label="Subject">
                <NativeSelect style={{ height: 42, borderRadius: 12 }}>
                  <NativeSelect.Option value="">Select a topic...</NativeSelect.Option>
                  <NativeSelect.Option value="general">General Inquiry</NativeSelect.Option>
                  <NativeSelect.Option value="support">Technical Support</NativeSelect.Option>
                  <NativeSelect.Option value="billing">Billing Question</NativeSelect.Option>
                  <NativeSelect.Option value="enterprise">Enterprise Sales</NativeSelect.Option>
                </NativeSelect>
              </Form.Item>
              <Form.Item label="Message">
                <Textarea defaultValue="" rows={4} style={{ borderRadius: 12 }} />
              </Form.Item>
              <Flex justify="end" gap="sm">
                <Button btnType="outline" style={{ height: 42, borderRadius: 12, paddingLeft: 24, paddingRight: 24 }}>
                  Cancel
                </Button>
                <Button btnType="primary" style={{
                  height: 42,
                  borderRadius: 12,
                  paddingLeft: 24,
                  paddingRight: 24,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                  border: 'none',
                }}>
                  <Flex align="center" gap="sm">
                    <IconComment style={{ fontSize: 16 }} />
                    <span>Send Message</span>
                  </Flex>
                </Button>
              </Flex>
            </Form>
            </div>
          </Card>
        </div>
      </Flex>
    </div>
  );
}
