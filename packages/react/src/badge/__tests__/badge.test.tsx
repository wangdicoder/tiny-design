import React from 'react';
import { render } from '@testing-library/react';
import Badge from '../index';

describe('<Badge />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Badge count={5}><div>content</div></Badge>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Badge count={5}><div>content</div></Badge>);
    expect(container.firstChild).toHaveClass('ty-badge');
  });

  it('should render count with ScrollNumber', () => {
    const { container } = render(<Badge count={5}><div>content</div></Badge>);
    expect(container.querySelector('.ty-badge__count')).toBeTruthy();
    expect(container.querySelector('.ty-badge__scroll-number')).toBeTruthy();
  });

  it('should render max+ when count exceeds max', () => {
    const { container } = render(<Badge count={100} max={99}><div>content</div></Badge>);
    const suffix = container.querySelector('.ty-scroll-number__suffix');
    expect(suffix).toBeTruthy();
    expect(suffix!.textContent).toBe('+');
  });

  it('should render as dot', () => {
    const { container } = render(<Badge dot><div>content</div></Badge>);
    expect(container.querySelector('.ty-badge__dot')).toBeTruthy();
  });

  it('should not show zero by default', () => {
    const { container } = render(<Badge count={0}><div>content</div></Badge>);
    expect(container.querySelector('.ty-badge__count')).toBeFalsy();
  });

  it('should show zero when showZero is true', () => {
    const { container } = render(<Badge count={0} showZero><div>content</div></Badge>);
    expect(container.querySelector('.ty-badge__count')).toBeTruthy();
    expect(container.querySelector('.ty-badge__scroll-number')).toBeTruthy();
  });

  it('should render string count without ScrollNumber', () => {
    const { container, getByText } = render(<Badge count="new"><div>content</div></Badge>);
    expect(container.querySelector('.ty-badge__count')).toBeTruthy();
    expect(container.querySelector('.ty-badge__scroll-number')).toBeFalsy();
    expect(getByText('new')).toBeInTheDocument();
  });
});
