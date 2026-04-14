import React from 'react';
import { Form, Input, InputPassword, Button, Flex } from '@tiny-design/react';

export default function MethodDemo() {
  const [form] = Form.useForm({ username: '', password: '' });

  const resetForm = () => {
    form.resetFields();
  };

  const fillForm = () => {
    form.setFieldValues({ username: 'React', password: 'React' });
  };

  return (
    <Form form={form} style={{ maxWidth: 500 }}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}>
        <InputPassword />
      </Form.Item>
      <Form.Item>
        <Flex gap="sm">
          <Button variant="solid" color="primary" type="submit">
            Submit
          </Button>
          <Button type="button" onClick={resetForm}>
            Reset
          </Button>
          <Button variant="link" color="primary" type="button" onClick={fillForm}>
            Fill form
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}
