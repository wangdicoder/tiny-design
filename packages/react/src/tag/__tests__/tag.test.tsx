import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tag from '../index';

describe('<Tag />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Tag>Tag</Tag>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Tag>Tag</Tag>);
    expect(container.firstChild).toHaveClass('ty-tag');
  });

  it('should render with color', () => {
    const { container } = render(<Tag color="blue">Blue</Tag>);
    expect(container.firstChild).toHaveClass('ty-tag_blue');
  });

  it('should render close button when closable', () => {
    const { container } = render(<Tag closable>Closable</Tag>);
    expect(container.querySelector('.ty-tag__close-btn')).toBeTruthy();
  });

  it('should trigger onClose when close button clicked', () => {
    const fn = jest.fn();
    const { container } = render(<Tag closable onClose={fn}>Closable</Tag>);
    const closeBtn = container.querySelector('.ty-tag__close-btn');
    closeBtn && fireEvent.click(closeBtn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should trigger onClick', () => {
    const fn = jest.fn();
    const { container } = render(<Tag onClick={fn}>Clickable</Tag>);
    container.firstChild && fireEvent.click(container.firstChild);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Variant tests
  it('should apply filled variant class by default for preset color', () => {
    const { container } = render(<Tag color="blue">Blue</Tag>);
    expect(container.firstChild).toHaveClass('ty-tag_blue');
    expect(container.firstChild).not.toHaveClass('ty-tag_blue-solid');
    expect(container.firstChild).not.toHaveClass('ty-tag_blue-outlined');
  });

  it('should apply solid variant class', () => {
    const { container } = render(<Tag color="blue" variant="solid">Blue</Tag>);
    expect(container.firstChild).toHaveClass('ty-tag_blue-solid');
    expect(container.firstChild).not.toHaveClass('ty-tag_blue');
  });

  it('should apply soft variant class', () => {
    const { container } = render(<Tag color="blue" variant="soft">Blue</Tag>);
    expect(container.firstChild).toHaveClass('ty-tag_blue-soft');
    expect(container.firstChild).not.toHaveClass('ty-tag_blue');
  });

  it('should apply outlined variant class', () => {
    const { container } = render(<Tag color="blue" variant="outlined">Blue</Tag>);
    expect(container.firstChild).toHaveClass('ty-tag_blue-outlined');
    expect(container.firstChild).not.toHaveClass('ty-tag_blue');
  });

  it('should not apply variant class without color', () => {
    const { container } = render(<Tag variant="solid">Tag</Tag>);
    expect(container.firstChild).toHaveClass('ty-tag');
    expect(container.firstChild).not.toHaveClass('ty-tag_solid');
  });
});
