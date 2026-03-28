import { Button, Card, Checkbox, Divider, Flex, Form, Input, InputPassword, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

export default function SignInSimple() {
  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh', padding: '40px 16px' }}>
      <Card variant="elevated" style={{ width: '100%', maxWidth: 400 }}>
        <Heading level={3} style={{ textAlign: 'center', marginBottom: 4 }}>
          Sign in to your account
        </Heading>
        <Text style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
          Don't have an account? <a href="#">Sign up</a>
        </Text>
        <Form layout="vertical">
          <Form.Item label="Email">
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item label="Password">
            <InputPassword placeholder="Enter your password" />
          </Form.Item>
          <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
            <Checkbox>Remember me</Checkbox>
            <a href="#">Forgot password?</a>
          </Flex>
          <Button btnType="primary" block>
            Sign in
          </Button>
        </Form>
        <Divider>or continue with</Divider>
        <Flex gap="sm">
          <Button block btnType="outline">Google</Button>
          <Button block btnType="outline">GitHub</Button>
        </Flex>
      </Card>
    </Flex>
  );
}
