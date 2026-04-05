import { Button, Card, Checkbox, Flex, Form, Input, InputPassword, Progress, Typography } from '@tiny-design/react';
import { IconAddUser } from '@tiny-design/icons';

const { Heading, Text } = Typography;

export default function SignUpSimple() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: '100vh',
        padding: '48px 20px',
        background: '#f3f6fa',
      }}
    >
      <Card
        variant="elevated"
        style={{
          width: '100%',
          maxWidth: 448,
          borderRadius: 20,
          background: 'var(--ty-color-bg-container)',
          border: '1px solid #dbe3ef',
          boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08)',
        }}
      >
        <div style={{ padding: 24 }}>
        <Flex vertical align="center" style={{ marginBottom: 24 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)',
          }}>
            <IconAddUser style={{ fontSize: 22, color: '#fff' }} />
          </div>
          <Heading level={3} style={{ margin: 0 }}>Create your account</Heading>
          <Text style={{ color: 'var(--ty-color-text-secondary)', marginTop: 6 }}>
            Start your 14-day trial with a clean setup flow
          </Text>
        </Flex>

        <Form layout="vertical">
          <Flex gap="sm">
            <Form.Item label="First name" style={{ flex: 1 }}>
              <Input placeholder="John" style={{ height: 44, borderRadius: 12, background: '#fbfcfe' }} />
            </Form.Item>
            <Form.Item label="Last name" style={{ flex: 1 }}>
              <Input placeholder="Doe" style={{ height: 44, borderRadius: 12, background: '#fbfcfe' }} />
            </Form.Item>
          </Flex>
          <Form.Item label="Work email">
            <Input placeholder="you@company.com" style={{ height: 44, borderRadius: 12, background: '#fbfcfe' }} />
          </Form.Item>
          <Form.Item label="Password">
            <InputPassword placeholder="Create a strong password" style={{ height: 44, borderRadius: 12, background: '#fbfcfe' }} />
          </Form.Item>
          <div style={{ marginBottom: 18, padding: 14, borderRadius: 14, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Flex justify="space-between" style={{ marginBottom: 4 }}>
              <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>Password strength</Text>
              <Text style={{ fontSize: 12, color: '#15803d', fontWeight: 600 }}>Strong</Text>
            </Flex>
            <Progress.Bar percent={85} showInfo={false} style={{ height: 4 }} />
          </div>
          <Checkbox style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 13 }}>
              I agree to the <a href="#" style={{ fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}>Privacy Policy</a>
            </Text>
          </Checkbox>
          <Button btnType="primary" block style={{
            height: 46,
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 15,
            background: '#0f172a',
            border: '1px solid #0f172a',
            boxShadow: '0 10px 20px rgba(15, 23, 42, 0.14)',
          }}>
            Get started free
          </Button>
        </Form>

        <Text style={{ display: 'block', textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--ty-color-text-secondary)' }}>
          Already have an account? <a href="#" style={{ fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}>Sign in</a>
        </Text>
        </div>
      </Card>
    </Flex>
  );
}
