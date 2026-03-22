import React from 'react';
import { render } from '@testing-library/react';
import Marquee from '../index';

describe('<Marquee />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Marquee>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Marquee>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render children duplicated for seamless loop', () => {
    const { getAllByText } = render(
      <Marquee>
        <div>Item</div>
      </Marquee>
    );
    expect(getAllByText('Item')).toHaveLength(2);
  });

  it('should apply reverse class to track when direction is right', () => {
    const { container } = render(
      <Marquee direction="right">
        <div>Item</div>
      </Marquee>
    );
    const track = container.querySelector('.ty-marquee__track');
    expect(track).toHaveClass('ty-marquee__track_reverse');
  });

  it('should apply pause-on-hover class to track by default', () => {
    const { container } = render(
      <Marquee>
        <div>Item</div>
      </Marquee>
    );
    const track = container.querySelector('.ty-marquee__track');
    expect(track).toHaveClass('ty-marquee__track_pause-on-hover');
  });

  it('should not apply pause-on-hover class when disabled', () => {
    const { container } = render(
      <Marquee pauseOnHover={false}>
        <div>Item</div>
      </Marquee>
    );
    const track = container.querySelector('.ty-marquee__track');
    expect(track).not.toHaveClass('ty-marquee__track_pause-on-hover');
  });

  it('should apply fade class to wrapper when fade is true', () => {
    const { container } = render(
      <Marquee fade>
        <div>Item</div>
      </Marquee>
    );
    expect(container.firstChild).toHaveClass('ty-marquee_fade');
  });

  it('should have overflow hidden on wrapper', () => {
    const { container } = render(
      <Marquee>
        <div>Item</div>
      </Marquee>
    );
    expect(container.firstChild).toHaveClass('ty-marquee');
  });

  it('should set duration and gap as CSS variables on track', () => {
    const { container } = render(
      <Marquee duration={30} gap={24}>
        <div>Item</div>
      </Marquee>
    );
    const track = container.querySelector('.ty-marquee__track') as HTMLElement;
    expect(track.style.getPropertyValue('--ty-marquee-duration')).toBe('30s');
    expect(track.style.getPropertyValue('--ty-marquee-gap')).toBe('24px');
  });

  it('should forward ref to wrapper', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Marquee ref={ref}>
        <div>Item</div>
      </Marquee>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('ty-marquee');
  });

  it('should pass through custom className', () => {
    const { container } = render(
      <Marquee className="custom">
        <div>Item</div>
      </Marquee>
    );
    expect(container.firstChild).toHaveClass('ty-marquee');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('should not duplicate children when infinite is false', () => {
    const { getAllByText } = render(
      <Marquee infinite={false}>
        <div>Item</div>
      </Marquee>
    );
    expect(getAllByText('Item')).toHaveLength(1);
  });

  it('should apply once class to track when infinite is false', () => {
    const { container } = render(
      <Marquee infinite={false}>
        <div>Item</div>
      </Marquee>
    );
    const track = container.querySelector('.ty-marquee__track');
    expect(track).toHaveClass('ty-marquee__track_once');
  });

  it('should not apply once class by default', () => {
    const { container } = render(
      <Marquee>
        <div>Item</div>
      </Marquee>
    );
    const track = container.querySelector('.ty-marquee__track');
    expect(track).not.toHaveClass('ty-marquee__track_once');
  });
});
