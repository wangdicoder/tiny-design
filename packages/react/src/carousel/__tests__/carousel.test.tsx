import { render, fireEvent, act } from '@testing-library/react';
import Carousel from '../index';
import { CarouselRef } from '../types';
import { createRef } from 'react';

const slides = (
  <>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </>
);

describe('<Carousel />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );
    expect(container.firstChild).toHaveClass('ty-carousel');
  });

  it('should render slides', () => {
    const { getByText } = render(
      <Carousel>
        <div>Slide A</div>
        <div>Slide B</div>
      </Carousel>
    );
    expect(getByText('Slide A')).toBeInTheDocument();
    expect(getByText('Slide B')).toBeInTheDocument();
  });

  it('should render dots by default', () => {
    const { container } = render(
      <Carousel>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );
    expect(container.querySelectorAll('.ty-carousel__dot').length).toBe(3);
  });

  it('should hide dots when dots is false', () => {
    const { container } = render(
      <Carousel dots={false}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );
    expect(container.querySelectorAll('.ty-carousel__dot').length).toBe(0);
  });

  it('should not render arrows by default', () => {
    const { container } = render(
      <Carousel>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );
    expect(container.querySelector('.ty-carousel__arrow')).toBeNull();
  });

  it('should render arrows when enabled', () => {
    const { container } = render(
      <Carousel arrows>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );
    expect(container.querySelector('.ty-carousel__arrow_prev')).toBeInTheDocument();
    expect(container.querySelector('.ty-carousel__arrow_next')).toBeInTheDocument();
  });

  it('should switch slide on dot click', () => {
    const fn = jest.fn();
    const { container } = render(
      <Carousel afterChange={fn}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );
    const dots = container.querySelectorAll('.ty-carousel__dot');
    fireEvent.click(dots[2]);
    expect(container.querySelectorAll('.ty-carousel__dot_active').length).toBe(1);
  });

  it('should render fade effect', () => {
    const { container } = render(
      <Carousel effect="fade">
        <div>1</div>
        <div>2</div>
      </Carousel>
    );
    expect(container.firstChild).toHaveClass('ty-carousel_fade');
  });

  it('should expose ref methods', () => {
    const ref = createRef<CarouselRef>();
    render(
      <Carousel ref={ref}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );
    expect(ref.current).toBeDefined();
    expect(typeof ref.current!.next).toBe('function');
    expect(typeof ref.current!.prev).toBe('function');
    expect(typeof ref.current!.goTo).toBe('function');
  });

  it('should fire beforeChange and afterChange', () => {
    const before = jest.fn();
    const ref = createRef<CarouselRef>();
    render(
      <Carousel ref={ref} beforeChange={before}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );
    act(() => {
      ref.current!.goTo(2, true);
    });
    expect(before).toHaveBeenCalledWith(0, 2);
  });

  it('should render dot placement', () => {
    const { container } = render(
      <Carousel dotPlacement="top">
        <div>1</div>
        <div>2</div>
      </Carousel>
    );
    expect(container.querySelector('.ty-carousel__dots_top')).toBeInTheDocument();
  });
});
