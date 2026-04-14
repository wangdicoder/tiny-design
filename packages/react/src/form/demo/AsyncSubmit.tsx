import React from 'react';
import { Form, Input, InputNumber, Button, Flex, Alert } from '@tiny-design/react';
import type { FormValues } from '../form-instance';

export default function AsyncSubmitDemo() {
  const [form] = Form.useForm({ username: '', age: 0 });
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<FormValues | null>(null);

  const handleFinish = async (values: FormValues) => {
    setLoading(true);
    setResult(null);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setResult(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} style={{ maxWidth: 500 }}>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Username is required' },
          { min: 3, message: 'At least 3 characters' },
        ]}>
        <Input placeholder="Enter username" />
      </Form.Item>
      <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Age is required' }]}>
        <InputNumber min={0} max={120} />
      </Form.Item>
      <Form.Item>
        <Flex gap="sm" align="center">
          <Button variant="solid" color="primary" type="submit" loading={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button type="reset" disabled={loading}>
            Reset
          </Button>
        </Flex>
      </Form.Item>
      {result && (
        <Form.Item>
          <Alert type="success" title={`Submitted: ${JSON.stringify(result)}`} />
        </Form.Item>
      )}
    </Form>
  );
}
