import { Button, Card, Checkbox, Flex, Form, Input, InputPassword, Progress, Typography } from '@tiny-design/react';
import { IconAddUser } from '@tiny-design/icons';

const { Heading, Text } = Typography;

export default function SignUpSimple() {
  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh', padding: '40px 16px', background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
      <Card variant="elevated" style={{ width: '100%', maxWidth: 440, borderRadius: 16, background: 'var(--ty-color-bg-container)' }}>
        <div style={{ padding: 16 }}>
        <Flex vertical align="center" style={{ marginBottom: 24 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
          }}>
            <IconAddUser style={{ fontSize: 22, color: '#fff' }} />
          </div>
          <Heading level={3} style={{ margin: 0 }}>Create your account</Heading>
          <Text style={{ color: 'var(--ty-color-text-secondary)', marginTop: 4 }}>
            Start your 14-day free trial, no credit card required
          </Text>
        </Flex>

        <Form layout="vertical">
          <Flex gap="sm">
            <Form.Item label="First name" style={{ flex: 1 }}>
              <Input placeholder="John" style={{ height: 42, borderRadius: 10 }} />
            </Form.Item>
            <Form.Item label="Last name" style={{ flex: 1 }}>
              <Input placeholder="Doe" style={{ height: 42, borderRadius: 10 }} />
            </Form.Item>
          </Flex>
          <Form.Item label="Work email">
            <Input placeholder="you@company.com" style={{ height: 42, borderRadius: 10 }} />
          </Form.Item>
          <Form.Item label="Password">
            <InputPassword placeholder="Create a strong password" style={{ height: 42, borderRadius: 10 }} />
          </Form.Item>
          <div style={{ marginBottom: 16 }}>
            <Flex justify="space-between" style={{ marginBottom: 4 }}>
              <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Password strength</Text>
              <Text style={{ fontSize: 12, color: '#10b981', fontWeight: 500 }}>Strong</Text>
            </Flex>
            <Progress.Bar percent={85} showInfo={false} style={{ height: 4 }} />
          </div>
          <Checkbox style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 13 }}>
              I agree to the <a href="#" style={{ fontWeight: 500 }}>Terms of Service</a> and <a href="#" style={{ fontWeight: 500 }}>Privacy Policy</a>
            </Text>
          </Checkbox>
          <Button btnType="primary" block style={{
            height: 44,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 15,
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            border: 'none',
          }}>
            Get started free
          </Button>
        </Form>

        <Text style={{ display: 'block', textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>
          Already have an account? <a href="#" style={{ fontWeight: 600 }}>Sign in</a>
        </Text>
        </div>
      </Card>
    </Flex>
  );
}
