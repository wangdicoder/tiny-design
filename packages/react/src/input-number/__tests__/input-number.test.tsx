import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputNumber from '../index';

describe('<InputNumber />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<InputNumber />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<InputNumber />);
    expect(container.firstChild).toHaveClass('ty-input-number');
  });

  it('should render disabled', () => {
    const { container } = render(<InputNumber disabled />);
    expect(container.querySelector('input')).toBeDisabled();
  });

  it('should fire onChange', () => {
    const fn = jest.fn();
    const { container } = render(<InputNumber onChange={fn} />);
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: '5' } });
    expect(fn).toHaveBeenCalled();
  });

  it('should render step buttons', () => {
    const { container } = render(<InputNumber />);
    expect(container.querySelector('.ty-input-number__up')).toBeInTheDocument();
    expect(container.querySelector('.ty-input-number__down')).toBeInTheDocument();
  });

  it('should not crash when controlled value is undefined', () => {
    const { container } = render(<InputNumber value={undefined as unknown as number} />);
    expect(container.querySelector('input')).toHaveValue(null);
  });
});
