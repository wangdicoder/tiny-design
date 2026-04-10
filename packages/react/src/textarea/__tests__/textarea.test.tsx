import { render, fireEvent } from '@testing-library/react';
import Textarea from '../index';

describe('<Textarea />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Textarea />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Textarea />);
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  it('should render disabled', () => {
    const { container } = render(<Textarea disabled />);
    expect(container.querySelector('textarea')).toBeDisabled();
  });

  it('should fire onChange', () => {
    const fn = jest.fn();
    const { container } = render(<Textarea onChange={fn} />);
    const textarea = container.querySelector('textarea')!;
    fireEvent.change(textarea, { target: { value: 'test' } });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should render resize handle by default', () => {
    const { container } = render(<Textarea />);
    expect(container.querySelector('.ty-textarea-container__resize-handle')).toBeInTheDocument();
  });

  it('should not render resize handle when resizable is false', () => {
    const { container } = render(<Textarea resizable={false} />);
    expect(container.querySelector('.ty-textarea-container__resize-handle')).not.toBeInTheDocument();
  });

  it('should not render resize handle when disabled', () => {
    const { container } = render(<Textarea disabled />);
    expect(container.querySelector('.ty-textarea-container__resize-handle')).not.toBeInTheDocument();
  });

  it('should render custom resizeHandle', () => {
    const { container } = render(<Textarea resizeHandle={<span data-testid="custom-handle">drag</span>} />);
    const handle = container.querySelector('.ty-textarea-container__resize-handle');
    expect(handle).toBeInTheDocument();
    expect(handle?.querySelector('[data-testid="custom-handle"]')).toBeInTheDocument();
  });

  it('should use default resize handle when no custom resizeHandle is provided', () => {
    const { container } = render(<Textarea />);
    expect(container.querySelector('.ty-textarea-container__resize-handle svg')).toBeInTheDocument();
  });

  it('should allow shrinking after growing with custom resize handle', () => {
    const { container } = render(<Textarea />);
    const wrapper = container.querySelector('.ty-textarea-container') as HTMLDivElement;
    const handle = container.querySelector('.ty-textarea-container__resize-handle') as HTMLSpanElement;

    Object.defineProperty(wrapper, 'offsetHeight', {
      configurable: true,
      get: () => Number.parseInt(wrapper.style.height || '80', 10),
    });

    fireEvent.mouseDown(handle, { clientY: 100 });
    fireEvent.mouseMove(document, { clientY: 160 });
    expect(wrapper.style.height).toBe('140px');
    fireEvent.mouseUp(document);

    fireEvent.mouseDown(handle, { clientY: 160 });
    fireEvent.mouseMove(document, { clientY: 40 });
    expect(wrapper.style.height).toBe('80px');
    fireEvent.mouseUp(document);
  });
});
