import { forwardRef } from 'react';
import type { IconProps } from './types';

const IconMore = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { size = '1em', color = 'currentColor', className, style, ...rest } = props;
  return (
    <svg
      ref={ref}
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      fill="none"
      className={className}
      style={{ verticalAlign: 'middle', ...style }}
      {...rest}
    >
      <circle cx="512" cy="207" r="72" fill={color} />
      <circle cx="512" cy="512" r="72" fill={color} />
      <circle cx="512" cy="817" r="72" fill={color} />
    </svg>
  );
});

IconMore.displayName = 'IconMore';

export { IconMore };
