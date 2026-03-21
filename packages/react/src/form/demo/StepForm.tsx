import React, { useState } from 'react';
import { Form, Input, InputNumber, Steps, Button, Flex, Result } from '@tiny-design/react';

const stepFields: string[][] = [
  ['username', 'email'],
  ['fullName', 'age', 'phone'],
];

export default function StepFormDemo() {
  const [form] = Form.useForm({
    username: '',
    email: '',
    fullName: '',
    age: '',
    phone: '',
  });
  const [current, setCurrent] = useState(0);

  const validateStep = (step: number): boolean => {
    const fields = stepFields[step];
    if (!fields) return true;
    fields.forEach((name) => form.validateField(name));
    return fields.every((name) => !form.getFieldError(name));
  };

  const handleNext = () => {
    if (validateStep(current)) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleFinish = () => {
    setCurrent(3);
  };

  const handleReset = () => {
    form.resetFields();
    setCurrent(0);
  };

  const stepStyle = (step: number): React.CSSProperties =>
    current !== step ? { display: 'none' } : {};

  return (
    <div style={{ maxWidth: 600 }}>
      <Steps current={current} style={{ marginBottom: 24 }}>
        <Steps.Step title="Account" description="Login credentials" />
        <Steps.Step title="Profile" description="Personal info" />
        <Steps.Step title="Confirm" description="Review & submit" />
        <Steps.Step title="Done" description="Registration complete" />
      </Steps>

      {current < 3 ? (
        <Form form={form} onFinish={handleFinish} noValidate>
          <div style={stepStyle(0)}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Username is required' },
                { min: 3, message: 'At least 3 characters' },
              ]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email',
                },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </div>

          <div style={stepStyle(1)}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Full name is required' }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                { required: true, message: 'Age is required' },
              ]}
            >
              <InputNumber min={1} max={120} placeholder="Enter age" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: 'Phone number is required' },
                { pattern: /^\d{7,15}$/, message: 'Please enter a valid phone number' },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </div>

          <div style={stepStyle(2)}>
            <Form.Item label="Username">
              <span>{form.getFieldValue('username')}</span>
            </Form.Item>
            <Form.Item label="Email">
              <span>{form.getFieldValue('email')}</span>
            </Form.Item>
            <Form.Item label="Full Name">
              <span>{form.getFieldValue('fullName')}</span>
            </Form.Item>
            <Form.Item label="Age">
              <span>{form.getFieldValue('age')}</span>
            </Form.Item>
            <Form.Item label="Phone">
              <span>{form.getFieldValue('phone')}</span>
            </Form.Item>
          </div>

          <Form.Item>
            <Flex gap="sm">
              {current > 0 && (
                <Button type="button" onClick={handlePrev}>
                  Previous
                </Button>
              )}
              {current < 2 && (
                <Button btnType="primary" type="button" onClick={handleNext}>
                  Next
                </Button>
              )}
              {current === 2 && (
                <Button btnType="primary" type="submit">
                  Submit
                </Button>
              )}
            </Flex>
          </Form.Item>
        </Form>
      ) : (
        <Result
          status="success"
          title="Registration Successful!"
          subtitle={`Welcome, ${form.getFieldValue('fullName')}. Your account "${form.getFieldValue('username')}" has been created.`}
          extra={
            <Button btnType="primary" onClick={handleReset}>
              Register Another
            </Button>
          }
        />
      )}
    </div>
  );
}
