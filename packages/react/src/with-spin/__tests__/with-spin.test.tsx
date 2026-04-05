import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { Close } from '../../_utils/components';
import { withSpin } from '../with-spin';
import { forwardRef } from 'react';
import type { SvgIconProps } from '../../_utils/components';

// Wrap the simple Close component to make it forwardRef-compatible
const CloseIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  const { size, color, className, style, ...rest } = props;
  return (
    <svg
      ref={ref}
      viewBox="0 0 1024 1024"
      width={size ?? '1em'}
      height={size ?? '1em'}
      fill={color ?? 'currentColor'}
      className={className}
      style={style}
      {...rest}
    >
      <path d="M782.426059 824.924989l-584.588225-584.727395c-11.987009-11.990079-11.984962-31.42778 0.005116-43.414789 11.990079-11.987009 31.42778-11.984962 43.414789 0.005117l584.588225 584.727395c11.987009 11.990079 11.984962 31.42778-0.005116 43.414788-11.989055 11.988032-31.42778 11.984962-43.414789-0.005116z" />
      <path d="M197.768249 824.856427c-11.987009-11.990079-11.984962-31.42778 0.005117-43.414788l584.727394-584.589249c11.990079-11.987009 31.42778-11.984962 43.414789 0.005117 11.987009 11.990079 11.984962 31.42778-0.005116 43.414788l-584.727395 584.589249c-11.990079 11.987009-31.42778 11.984962-43.414789-0.005117z" />
    </svg>
  );
});
CloseIcon.displayName = 'CloseIcon';

describe('withSpin HOC', () => {
  const SpinClose = withSpin(CloseIcon);

  it('applies ty-icon-spin CSS class', () => {
    const { container } = render(<SpinClose />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveClass('ty-icon-spin');
  });

  it('passes through icon props', () => {
    const { container } = render(<SpinClose size={24} color="red" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('24');
    expect(svg.getAttribute('fill')).toBe('red');
  });

  it('merges className with existing className prop', () => {
    const { container } = render(<SpinClose className="custom" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveClass('ty-icon-spin');
    expect(svg).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = createRef<SVGSVGElement>();
    render(<SpinClose ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it('sets displayName', () => {
    expect(SpinClose.displayName).toBe('withSpin(CloseIcon)');
  });
});
