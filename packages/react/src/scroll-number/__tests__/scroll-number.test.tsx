import React from 'react';
import { render } from '@testing-library/react';
import ScrollNumber from '../index';

describe('<ScrollNumber />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<ScrollNumber value={42} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with correct class name', () => {
    const { container } = render(<ScrollNumber value={0} />);
    expect(container.firstChild).toHaveClass('ty-scroll-number');
  });

  it('should render digit columns for each digit', () => {
    const { container } = render(<ScrollNumber value={42} />);
    const digits = container.querySelectorAll('.ty-scroll-number__digit');
    expect(digits).toHaveLength(2);
  });

  it('should render cells in each digit column', () => {
    const { container } = render(<ScrollNumber value={5} />);
    const cells = container.querySelectorAll('.ty-scroll-number__digit-cell');
    expect(cells.length).toBeGreaterThanOrEqual(10);
  });

  it('should render separator for formatted numbers', () => {
    const { container } = render(<ScrollNumber value={1234} />);
    const separators = container.querySelectorAll('.ty-scroll-number__separator');
    expect(separators).toHaveLength(1);
    expect(separators[0].textContent).toBe(',');
  });

  it('should render title when provided', () => {
    const { container } = render(<ScrollNumber value={100} title="Users" />);
    const title = container.querySelector('.ty-scroll-number__title');
    expect(title).toBeTruthy();
    expect(title!.textContent).toBe('Users');
  });

  it('should render prefix and suffix', () => {
    const { container } = render(<ScrollNumber value={100} prefix="$" suffix="USD" />);
    expect(container.querySelector('.ty-scroll-number__prefix')!.textContent).toBe('$');
    expect(container.querySelector('.ty-scroll-number__suffix')!.textContent).toBe('USD');
  });

  it('should apply valueClassName to the value container', () => {
    const { container } = render(<ScrollNumber value={100} valueClassName="custom-value" />);
    expect(container.querySelector('.ty-scroll-number__content')).toHaveClass('custom-value');
  });

  it('should handle precision', () => {
    const { container } = render(<ScrollNumber value={3.1} precision={2} />);
    const digits = container.querySelectorAll('.ty-scroll-number__digit');
    // 3.10 has digits: 3, 1, 0
    expect(digits).toHaveLength(3);
  });

  it('should handle custom prefixCls', () => {
    const { container } = render(<ScrollNumber value={1} prefixCls="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('should handle string value', () => {
    const { container } = render(<ScrollNumber value="99" />);
    const digits = container.querySelectorAll('.ty-scroll-number__digit');
    expect(digits).toHaveLength(2);
  });

  it('should render empty when value is undefined', () => {
    const { container } = render(<ScrollNumber />);
    const digits = container.querySelectorAll('.ty-scroll-number__digit');
    expect(digits).toHaveLength(0);
  });

  it('should render negative numbers with separator for minus sign', () => {
    const { container } = render(<ScrollNumber value={-5} />);
    const separators = container.querySelectorAll('.ty-scroll-number__separator');
    expect(separators[0].textContent).toBe('-');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ScrollNumber ref={ref} value={1} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
