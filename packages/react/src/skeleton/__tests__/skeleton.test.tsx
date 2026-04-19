import React from 'react';
import { render } from '@testing-library/react';
import Skeleton from '../index';

describe('<Skeleton />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Skeleton />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('role', 'status');
    expect(container.querySelector('.ty-skeleton')).toBeInTheDocument();
    expect(container.querySelector('.ty-skeleton')).toHaveClass('ty-skeleton_round');
  });

  it('should render with shimmer animation', () => {
    const { container } = render(<Skeleton animation="shimmer" />);
    expect(container.querySelector('.ty-skeleton')).toHaveClass('ty-skeleton_animated_shimmer');
  });

  it('should render shaped block', () => {
    const { container } = render(<Skeleton shape="circle" width={40} height={40} />);
    expect(container.querySelector('.ty-skeleton')).toHaveClass('ty-skeleton_circle');
  });

  it('should render children when loading is false', () => {
    const { getByText, queryByRole } = render(<Skeleton loading={false}>Loading content</Skeleton>);
    expect(getByText('Loading content')).toBeInTheDocument();
    expect(queryByRole('status')).not.toBeInTheDocument();
  });

  it('should render structured skeleton', () => {
    const { container } = render(<Skeleton avatar title paragraph={{ rows: 2 }} />);
    expect(container.querySelector('.ty-skeleton__group')).toBeInTheDocument();
    expect(container.querySelectorAll('.ty-skeleton__text-row')).toHaveLength(3);
  });
});
