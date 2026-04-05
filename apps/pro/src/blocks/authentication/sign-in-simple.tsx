import { Button, Card, Checkbox, Divider, Flex, Form, Input, InputPassword, Typography } from '@tiny-design/react';
import { IconLock, IconGoogle, IconGithub } from '@tiny-design/icons';

const { Heading, Text } = Typography;

export default function SignInSimple() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: '100vh',
        padding: '48px 20px',
        background: '#f4f7fb',
      }}
    >
      <Card
        variant="elevated"
        style={{
          width: '100%',
          maxWidth: 428,
          borderRadius: 20,
          border: '1px solid #dbe3ef',
          boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08)',
        }}
      >
        <div style={{ padding: 24 }}>
        <Flex vertical align="center" style={{ marginBottom: 28 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: '#1e3a8a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            boxShadow: '0 10px 24px rgba(30, 58, 138, 0.18)',
          }}>
            <IconLock style={{ fontSize: 22, color: '#fff' }} />
          </div>
          <Heading level={3} style={{ margin: 0 }}>Welcome back</Heading>
          <Text style={{ color: 'var(--ty-color-text-secondary)', marginTop: 6 }}>
            Sign in to access your team workspace
          </Text>
        </Flex>

        <Flex gap="sm" style={{ marginBottom: 20 }}>
          <Button block btnType="outline" style={{ height: 42, borderRadius: 12, borderColor: '#d7e0ec', background: '#fff' }}>
            <Flex align="center" justify="center" gap="sm">
              <IconGoogle style={{ fontSize: 18 }} />
              <span>Google</span>
            </Flex>
          </Button>
          <Button block btnType="outline" style={{ height: 42, borderRadius: 12, borderColor: '#d7e0ec', background: '#fff' }}>
            <Flex align="center" justify="center" gap="sm">
              <IconGithub style={{ fontSize: 18 }} />
              <span>GitHub</span>
            </Flex>
          </Button>
        </Flex>

        <Divider style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>or continue with email</Divider>

        <Form layout="vertical">
          <Form.Item label="Email address">
            <Input placeholder="you@company.com" style={{ height: 44, borderRadius: 12, background: '#fbfcfe' }} />
          </Form.Item>
          <Form.Item label="Password">
            <InputPassword placeholder="Enter your password" style={{ height: 44, borderRadius: 12, background: '#fbfcfe' }} />
          </Form.Item>
          <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
            <Checkbox>Remember me</Checkbox>
            <a href="#" style={{ fontSize: 13, fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}>Forgot password?</a>
          </Flex>
          <Button btnType="primary" block style={{
            height: 46,
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 15,
            background: '#1e3a8a',
            border: '1px solid #1e3a8a',
            boxShadow: '0 10px 20px rgba(30, 58, 138, 0.18)',
          }}>
            Sign in
          </Button>
        </Form>

        <Text style={{ display: 'block', textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>
          Don't have an account? <a href="#" style={{ fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}>Create one free</a>
        </Text>
        </div>
      </Card>
    </Flex>
  );
}
