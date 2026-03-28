import { Button, Card, Checkbox, Divider, Flex, Form, Input, InputPassword, Typography } from '@tiny-design/react';
import { IconLock, IconGoogle, IconGithub } from '@tiny-design/icons';

const { Heading, Text } = Typography;

export default function SignInSimple() {
  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh', padding: '40px 16px', background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf2f8 50%, #fef3c7 100%)' }}>
      <Card variant="elevated" style={{ width: '100%', maxWidth: 420, borderRadius: 16 }}>
        <div style={{ padding: 16 }}>
        <Flex vertical align="center" style={{ marginBottom: 24 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
          }}>
            <IconLock style={{ fontSize: 22, color: '#fff' }} />
          </div>
          <Heading level={3} style={{ margin: 0 }}>Welcome back</Heading>
          <Text style={{ color: 'var(--ty-color-text-secondary)', marginTop: 4 }}>
            Sign in to continue to your workspace
          </Text>
        </Flex>

        <Flex gap="sm" style={{ marginBottom: 20 }}>
          <Button block btnType="outline" style={{ height: 42, borderRadius: 10 }}>
            <Flex align="center" justify="center" gap="sm">
              <IconGoogle style={{ fontSize: 18 }} />
              <span>Google</span>
            </Flex>
          </Button>
          <Button block btnType="outline" style={{ height: 42, borderRadius: 10 }}>
            <Flex align="center" justify="center" gap="sm">
              <IconGithub style={{ fontSize: 18 }} />
              <span>GitHub</span>
            </Flex>
          </Button>
        </Flex>

        <Divider style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>or continue with email</Divider>

        <Form layout="vertical">
          <Form.Item label="Email address">
            <Input placeholder="you@company.com" style={{ height: 42, borderRadius: 10 }} />
          </Form.Item>
          <Form.Item label="Password">
            <InputPassword placeholder="Enter your password" style={{ height: 42, borderRadius: 10 }} />
          </Form.Item>
          <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
            <Checkbox>Remember me</Checkbox>
            <a href="#" style={{ fontSize: 13, fontWeight: 500 }}>Forgot password?</a>
          </Flex>
          <Button btnType="primary" block style={{
            height: 44,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 15,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none',
          }}>
            Sign in
          </Button>
        </Form>

        <Text style={{ display: 'block', textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>
          Don't have an account? <a href="#" style={{ fontWeight: 600 }}>Create one free</a>
        </Text>
        </div>
      </Card>
    </Flex>
  );
}
