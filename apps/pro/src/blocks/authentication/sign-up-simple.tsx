import { Button, Card, Checkbox, Flex, Form, Input, InputPassword, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

export default function SignUpSimple() {
  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh', padding: '40px 16px' }}>
      <Card variant="elevated" style={{ width: '100%', maxWidth: 440 }}>
        <Heading level={3} style={{ textAlign: 'center', marginBottom: 4 }}>
          Create your account
        </Heading>
        <Text style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
          Already have an account? <a href="#">Sign in</a>
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
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item label="Password">
            <InputPassword placeholder="Create a password" />
          </Form.Item>
          <Form.Item label="Confirm password">
            <InputPassword placeholder="Confirm your password" />
          </Form.Item>
          <Checkbox style={{ marginBottom: 16 }}>
            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </Checkbox>
          <Button btnType="primary" block>
            Create account
          </Button>
        </Form>
      </Card>
    </Flex>
  );
}
