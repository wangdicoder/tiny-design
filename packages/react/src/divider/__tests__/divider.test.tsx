import React from 'react';
import { render } from '@testing-library/react';
import Divider from '../index';

describe('<Divider />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Divider />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveClass('ty-divider');
  });

  it('should render horizontal type by default', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveClass('ty-divider_horizontal');
    expect(container.firstChild).toHaveClass('ty-divider_solid');
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should render vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.firstChild).toHaveClass('ty-divider_vertical');
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should render variant style', () => {
    const { container } = render(<Divider variant="dashed" />);
    expect(container.firstChild).toHaveClass('ty-divider_dashed');
  });

  it('should render with text', () => {
    const { getByText } = render(<Divider>Section</Divider>);
    expect(getByText('Section')).toBeInTheDocument();
  });

  it('should render text with title placement', () => {
    const { container } = render(<Divider titlePlacement="start">Left</Divider>);
    expect(container.firstChild).toHaveClass('ty-divider_start');
    expect(container.firstChild).toHaveClass('ty-divider_text');
    expect(container.querySelector('.ty-divider_inner-text')).toBeInTheDocument();
  });

  it('should render falsy children content', () => {
    const { container, getByText } = render(<Divider>{0}</Divider>);
    expect(container.firstChild).toHaveClass('ty-divider_text');
    expect(getByText('0')).toBeInTheDocument();
  });

  it('should render plain style', () => {
    const { container } = render(<Divider plain>Plain</Divider>);
    expect(container.firstChild).toHaveClass('ty-divider_plain');
  });

  it('should apply title gap custom property', () => {
    const { container } = render(<Divider titleGap={24}>Gap</Divider>);
    expect(container.firstChild).toHaveStyle('--ty-divider-title-gap: 24px');
  });

  it('should not render inner text for vertical divider', () => {
    const { container, queryByText } = render(
      <Divider orientation="vertical" titlePlacement="start">
        Hidden
      </Divider>,
    );
    expect(container.firstChild).not.toHaveClass('ty-divider_text');
    expect(container.firstChild).not.toHaveClass('ty-divider_start');
    expect(queryByText('Hidden')).not.toBeInTheDocument();
  });
});
