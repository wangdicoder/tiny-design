import React from 'react';
import { render } from '@testing-library/react';
import Card from '../index';

describe('<Card />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Card>Content</Card>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('ty-card');
  });

  it('should render outlined by default (bordered backward compat)', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('ty-card_outlined');
  });

  it('should render elevated variant', () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    expect(container.firstChild).toHaveClass('ty-card_elevated');
    expect(container.firstChild).not.toHaveClass('ty-card_outlined');
  });

  it('should render filled variant', () => {
    const { container } = render(<Card variant="filled">Content</Card>);
    expect(container.firstChild).toHaveClass('ty-card_filled');
    expect(container.firstChild).not.toHaveClass('ty-card_outlined');
  });

  it('should render outlined variant explicitly', () => {
    const { container } = render(<Card variant="outlined">Content</Card>);
    expect(container.firstChild).toHaveClass('ty-card_outlined');
  });

  it('variant should take precedence over bordered', () => {
    const { container } = render(<Card variant="elevated" bordered>Content</Card>);
    expect(container.firstChild).toHaveClass('ty-card_elevated');
    expect(container.firstChild).not.toHaveClass('ty-card_outlined');
  });

  it('should render without border when bordered is false', () => {
    const { container } = render(<Card bordered={false}>Content</Card>);
    expect(container.firstChild).not.toHaveClass('ty-card_outlined');
  });

  it('should render hoverable', () => {
    const { container } = render(<Card hoverable>Content</Card>);
    expect(container.firstChild).toHaveClass('ty-card_hoverable');
  });

  it('should render title', () => {
    const { getByText } = render(<Card title="Title">Content</Card>);
    expect(getByText('Title')).toBeInTheDocument();
  });

  it('should render extra content', () => {
    const { getByText } = render(<Card title="Title" extra={<span>More</span>}>Content</Card>);
    expect(getByText('More')).toBeInTheDocument();
  });

  it('should render footer', () => {
    const { getByText } = render(<Card footer={<div>Footer</div>}>Content</Card>);
    expect(getByText('Footer')).toBeInTheDocument();
  });
});
