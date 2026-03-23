import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import TextLoop from '../index';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('<TextLoop />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <TextLoop>
        <span>A</span>
        <span>B</span>
      </TextLoop>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render an empty container with no children', () => {
    const { container } = render(<TextLoop />);
    expect(container.querySelector('.ty-text-loop')).toBeTruthy();
    expect(container.querySelector('.ty-text-loop__item')).toBeFalsy();
  });

  it('should render statically with one child', () => {
    const { container } = render(
      <TextLoop>
        <span>Only one</span>
      </TextLoop>
    );
    expect(container.querySelectorAll('.ty-text-loop__item')).toHaveLength(1);
  });

  it('should render all children plus a duplicate first child when infinite', () => {
    const { container } = render(
      <TextLoop infinite>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </TextLoop>
    );
    expect(container.querySelectorAll('.ty-text-loop__item')).toHaveLength(4);
  });

  it('should not duplicate first child when infinite is false', () => {
    const { container } = render(
      <TextLoop infinite={false}>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </TextLoop>
    );
    expect(container.querySelectorAll('.ty-text-loop__item')).toHaveLength(3);
  });

  it('should cycle to next child after interval', () => {
    const { container } = render(
      <TextLoop interval={2000}>
        <span>A</span>
        <span>B</span>
      </TextLoop>
    );
    const track = container.querySelector('.ty-text-loop__track') as HTMLElement;
    const initialTransform = track.style.transform;

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(track.style.transform).not.toBe(initialTransform);
  });

  it('should pause cycling on hover and resume on leave', () => {
    const { container } = render(
      <TextLoop interval={1000}>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </TextLoop>
    );
    const root = container.firstChild as HTMLElement;
    const track = container.querySelector('.ty-text-loop__track') as HTMLElement;

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const transformAfterFirst = track.style.transform;

    fireEvent.mouseEnter(root);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(track.style.transform).toBe(transformAfterFirst);

    fireEvent.mouseLeave(root);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(track.style.transform).not.toBe(transformAfterFirst);
  });

  it('should stop after one cycle when infinite is false', () => {
    const { container } = render(
      <TextLoop interval={1000} infinite={false}>
        <span>A</span>
        <span>B</span>
      </TextLoop>
    );
    const track = container.querySelector('.ty-text-loop__track') as HTMLElement;

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const transformAtLast = track.style.transform;

    fireEvent.transitionEnd(track);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(track.style.transform).toBe(transformAtLast);
  });

  it('should render track element', () => {
    const { container } = render(
      <TextLoop>
        <span>A</span>
        <span>B</span>
      </TextLoop>
    );
    const track = container.querySelector('.ty-text-loop__track');
    expect(track).toBeInTheDocument();
  });

  it('should have aria-live attribute', () => {
    const { container } = render(
      <TextLoop>
        <span>A</span>
        <span>B</span>
      </TextLoop>
    );
    expect(container.firstChild).toHaveAttribute('aria-live', 'polite');
  });

  it('should accept custom className and style', () => {
    const { container } = render(
      <TextLoop className="custom" style={{ color: 'red' }}>
        <span>A</span>
        <span>B</span>
      </TextLoop>
    );
    expect(container.firstChild).toHaveClass('ty-text-loop', 'custom');
    expect(container.firstChild).toHaveStyle({ color: 'red' });
  });
});
