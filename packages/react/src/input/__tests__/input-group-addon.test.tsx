import React from 'react';
import { render } from '@testing-library/react';
import Input from '../index';
import Button from '../../button';
import Select from '../../select';
import InputNumber from '../../input-number';

describe('<Input.Addon />', () => {
  it('adds control styling and injects props into supported controls', () => {
    const { container, rerender } = render(
      <Input.Addon disabled size="lg">
        <Input />
      </Input.Addon>
    );

    expect(container.firstChild).toHaveClass('ty-input-group-addon_control', 'ty-input-group-addon_lg');
    expect(container.querySelector('.ty-input')).toHaveClass('ty-input_lg', 'ty-input_disabled');
    expect(container.querySelector('input')).toBeDisabled();

    rerender(
      <Input.Addon disabled size="lg">
        <Button>Action</Button>
      </Input.Addon>
    );
    expect(container.querySelector('.ty-btn')).toHaveClass('ty-btn_lg', 'ty-btn_disabled');
    expect(container.querySelector('button')).toBeDisabled();

    rerender(
      <Input.Addon disabled size="lg">
        <Select options={[{ label: 'One', value: '1' }]} />
      </Input.Addon>
    );
    expect(container.querySelector('.ty-select')).toHaveClass('ty-select_lg', 'ty-select_disabled');

    rerender(
      <Input.Addon disabled size="lg">
        <InputNumber />
      </Input.Addon>
    );
    expect(container.querySelector('.ty-input-number')).toHaveClass(
      'ty-input-number_lg',
      'ty-input-number_disabled'
    );
    expect(container.querySelector('input[type="number"]')).toBeDisabled();
  });

  it('does not treat plain elements as input-group controls', () => {
    const { container } = render(
      <Input.Addon size="lg">
        <span>plain text</span>
      </Input.Addon>
    );

    expect(container.firstChild).not.toHaveClass('ty-input-group-addon_control');
    expect(container.querySelector('span')).toHaveTextContent('plain text');
  });
});
