import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Typography from '../index';
import { Heading, Paragraph, Text } from '../../index';

describe('<Typography />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Typography.Heading>Heading</Typography.Heading>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Title correctly', () => {
    const { getByText } = render(<Typography.Heading>Heading</Typography.Heading>);
    expect(getByText('Heading')).toBeInTheDocument();
  });

  it('should render Paragraph', () => {
    const { getByText } = render(<Typography.Paragraph>Text</Typography.Paragraph>);
    expect(getByText('Text')).toBeInTheDocument();
  });

  it('should render Text', () => {
    const { getByText } = render(<Typography.Text>Inline</Typography.Text>);
    expect(getByText('Inline')).toBeInTheDocument();
  });

  it('should render Text with semantic type class', () => {
    const { container } = render(<Typography.Text type="secondary">Inline</Typography.Text>);
    expect(container.firstChild).toHaveClass('ty-typography', 'ty-typography_secondary');
  });

  it('should forward ref on Heading', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<Typography.Heading ref={ref}>Heading</Typography.Heading>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current!.tagName).toBe('H1');
  });

  it('should render the correct heading level', () => {
    const { container } = render(<Typography.Heading level={3}>H3</Typography.Heading>);
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('should return null for invalid heading level', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const { container } = render(
      <Typography.Heading level={0 as any}>Bad</Typography.Heading>
    );
    expect(container.innerHTML).toBe('');
    spy.mockRestore();
  });

  it('should forward ref on Text', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Typography.Text ref={ref}>Inline</Typography.Text>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('should keep the same DOM node after re-render (Heading stability)', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const { rerender } = render(<Typography.Heading ref={ref}>First</Typography.Heading>);
    const firstNode = ref.current;
    rerender(<Typography.Heading ref={ref}>Second</Typography.Heading>);
    expect(ref.current).toBe(firstNode);
  });

  it('should prefer superscript when sub and sup are both enabled', () => {
    const { container } = render(
      <Typography.Text sub sup>
        Inline
      </Typography.Text>
    );
    expect(container.querySelector('sup')).toBeInTheDocument();
    expect(container.querySelector('sub')).not.toBeInTheDocument();
  });

  it('should render Text as a custom tag', () => {
    const { container } = render(<Typography.Text as="label">Inline</Typography.Text>);
    expect(container.querySelector('label')).toBeInTheDocument();
  });

  it('should apply ellipsis title to Paragraph when tooltip is enabled', () => {
    const { getByText } = render(
      <Typography.Paragraph ellipsis={{ tooltip: true }}>Long paragraph</Typography.Paragraph>
    );
    expect(getByText('Long paragraph')).toHaveAttribute('title', 'Long paragraph');
  });

  it('should copy text content when copyable is enabled', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    const onCopy = jest.fn();
    const { getByRole } = render(
      <Typography.Text copyable={{ onCopy }}>Copy me</Typography.Text>
    );

    fireEvent.click(getByRole('button', { name: 'Copy text' }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('Copy me');
      expect(onCopy).toHaveBeenCalledWith(true, 'Copy me');
    });

    expect(getByRole('button', { name: 'Copied text' })).toBeInTheDocument();
  });

  it('should support named exports from package entry', () => {
    const { getByText } = render(
      <>
        <Heading level={2}>Heading</Heading>
        <Paragraph>Paragraph</Paragraph>
        <Text>Text</Text>
      </>
    );

    expect(getByText('Heading')).toBeInTheDocument();
    expect(getByText('Paragraph')).toBeInTheDocument();
    expect(getByText('Text')).toBeInTheDocument();
  });
});
