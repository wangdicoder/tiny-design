import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Image from '../index';

describe('<Image />', () => {
  const originalIntersectionObserver = window.IntersectionObserver;
  const completeDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete');
  const naturalWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth');

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    if (completeDescriptor) {
      Object.defineProperty(HTMLImageElement.prototype, 'complete', completeDescriptor);
    }
    if (naturalWidthDescriptor) {
      Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', naturalWidthDescriptor);
    }
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<Image src="test.jpg" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Image src="test.jpg" />);
    expect(container.querySelector('img')).toBeTruthy();
  });

  it('should render with round style on container', () => {
    const { container } = render(<Image src="test.jpg" round />);
    expect(container.firstChild).toHaveClass('ty-image_round');
  });

  it('should default alt to empty string', () => {
    render(<Image src="test.jpg" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', '');
  });

  it('should apply object-fit style to image layer', () => {
    render(<Image src="test.jpg" objectFit="contain" />);
    expect(screen.getByRole('img')).toHaveStyle({ objectFit: 'contain' });
  });

  it('should forward ref to the native img element', () => {
    const ref = React.createRef<HTMLImageElement>();

    render(<Image src="test.jpg" ref={ref} />);

    expect(ref.current?.tagName).toBe('IMG');
  });

  it('should switch to fallback image when src fails', () => {
    render(<Image src="broken.jpg" fallback="fallback.jpg" alt="cover" />);

    const image = screen.getByRole('img', { name: 'cover' });
    fireEvent.error(image);

    expect(screen.getByRole('img', { name: 'cover' })).toHaveAttribute('src', 'fallback.jpg');
  });

  it('should render fallback node when image and fallback image are unavailable', () => {
    render(
      <Image
        src="broken.jpg"
        fallback={<span data-testid="fallback-node">fallback node</span>}
        alt="cover"
      />
    );

    const image = screen.getByRole('img', { name: 'cover' });
    fireEvent.error(image);

    expect(screen.getByTestId('fallback-node')).toBeInTheDocument();
  });

  it('should preserve onError and promote fallback for cached broken images', async () => {
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
      configurable: true,
      get() {
        return true;
      },
    });

    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
      configurable: true,
      get() {
        return this.getAttribute('src') === 'broken.jpg' ? 0 : 100;
      },
    });

    const handleError = jest.fn();

    render(<Image src="broken.jpg" fallback="fallback.jpg" onError={handleError} alt="cover" />);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: 'cover' })).toHaveAttribute('src', 'fallback.jpg');
    });

    expect(handleError).toHaveBeenCalledTimes(1);
  });

  it('should keep lazy image on placeholder before intersecting', () => {
    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();

    class MockIntersectionObserver {
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    }

    window.IntersectionObserver = MockIntersectionObserver as typeof window.IntersectionObserver;

    const { container } = render(<Image lazy src="test.jpg" placeholder="placeholder.jpg" />);

    expect(container.firstChild).toHaveAttribute('data-status', 'idle');
    expect(container.querySelector('.ty-image__img')).toBeNull();
    expect(observe).toHaveBeenCalled();
  });

  it('should fall back to eager loading when IntersectionObserver is unavailable', () => {
    // @ts-expect-error test fallback behavior when observer is not supported
    window.IntersectionObserver = undefined;

    render(<Image lazy src="test.jpg" placeholder="placeholder.jpg" alt="cover" />);

    expect(screen.getByRole('img', { name: 'cover' })).toHaveAttribute('src', 'test.jpg');
  });
});
