import React from 'react';
import { Form, Input, InputPassword, Button, Divider } from '@tiny-design/react';

export default function ValidateTriggerDemo() {
  return (
    <>
      <Divider titlePlacement="start">onChange</Divider>
      <Form initialValues={{ username: '', password: '' }} style={{ maxWidth: 500 }}>
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
          <Button variant="solid" color="primary" type="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Divider titlePlacement="start">onBlur</Divider>
      <Form
        validateTrigger="onBlur"
        initialValues={{ username: '', password: '' }}
        style={{ maxWidth: 500 }}>
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
          <Button variant="solid" color="primary" type="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Divider titlePlacement="start">onSubmit</Divider>
      <Form
        validateTrigger="onSubmit"
        initialValues={{ username: '', password: '' }}
        style={{ maxWidth: 500 }}>
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
          <Button variant="solid" color="primary" type="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
