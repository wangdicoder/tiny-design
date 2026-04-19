import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from '../index';
import Input from '../../input';

describe('<Form />', () => {
  it('should call onFinish when submit passes validation', () => {
    const onFinish = jest.fn();

    render(
      <Form initialValues={{ username: 'alice' }} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <button type="submit">submit</button>
      </Form>
    );

    fireEvent.click(screen.getByText('submit'));

    expect(onFinish).toHaveBeenCalledWith({ username: 'alice' });
  });

  it('should call onFinishFailed when submit fails validation', () => {
    const onFinish = jest.fn();
    const onFinishFailed = jest.fn();

    render(
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="username" rules={[{ required: true, message: 'username required' }]}>
          <Input />
        </Form.Item>
        <button type="submit">submit</button>
      </Form>
    );

    fireEvent.click(screen.getByText('submit'));

    expect(onFinish).not.toHaveBeenCalled();
    expect(onFinishFailed).toHaveBeenCalledWith({
      values: {},
      errors: { username: ['username required'] },
    });
  });

  it('should validate on submit when validateTrigger is onSubmit', () => {
    render(
      <Form validateTrigger="onSubmit">
        <Form.Item name="username" rules={[{ required: true, message: 'username required' }]}>
          <Input />
        </Form.Item>
        <button type="submit">submit</button>
      </Form>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByText('username required')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('submit'));
    expect(screen.getByText('username required')).toBeInTheDocument();
  });

  it('should forward ref to native form element', () => {
    const ref = React.createRef<HTMLFormElement>();

    render(
      <Form ref={ref}>
        <button type="submit">submit</button>
      </Form>
    );

    expect(ref.current).toBeInstanceOf(HTMLFormElement);
  });
});
