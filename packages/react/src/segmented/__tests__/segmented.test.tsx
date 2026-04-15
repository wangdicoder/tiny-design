import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Segmented from '../index';

describe('<Segmented />', () => {
  const options = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  it('should match the snapshot', () => {
    const { asFragment } = render(<Segmented options={options} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Segmented
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' },
        ]}
      />
    );
    expect(container.firstChild).toHaveClass('ty-segmented');
  });

  it('should render options', () => {
    const { getByText } = render(
      <Segmented
        options={[
          { label: 'Foo', value: 'foo' },
          { label: 'Bar', value: 'bar' },
        ]}
      />
    );
    expect(getByText('Foo')).toBeInTheDocument();
    expect(getByText('Bar')).toBeInTheDocument();
  });

  it('should select default value', () => {
    const { container } = render(
      <Segmented
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' },
        ]}
        defaultValue="b"
      />
    );
    const active = container.querySelector('.ty-segmented__item_active');
    expect(active).toBeTruthy();
    expect(active!).toHaveTextContent('B');
  });

  it('should not select any option by default', () => {
    const { container } = render(<Segmented options={options} />);
    expect(container.querySelector('.ty-segmented__item_active')).toBeNull();
  });

  it('should handle onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Segmented
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        onChange={onChange}
      />
    );
    fireEvent.click(getByLabelText('B'));
    expect(onChange).toHaveBeenCalledWith(
      'b',
      { label: 'B', value: 'b' },
      expect.any(Object)
    );
  });

  it('should support block mode', () => {
    const { container } = render(
      <Segmented
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        block
      />
    );
    expect(container.firstChild).toHaveClass('ty-segmented_block');
  });

  it('should support disabled', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Segmented
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
        disabled
        onChange={onChange}
      />
    );
    fireEvent.click(getByLabelText('B'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should reset uncontrolled selection when option is removed', () => {
    const { container, rerender } = render(
      <Segmented options={options} defaultValue="weekly" />
    );

    rerender(
      <Segmented
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Monthly', value: 'monthly' },
        ]}
        defaultValue="weekly"
      />
    );

    expect(container.querySelector('.ty-segmented__item_active')).toBeNull();
  });
});
