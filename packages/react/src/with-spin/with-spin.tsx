import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';
import type { SvgIconProps } from '../_utils/components';
import classNames from 'classnames';

type IconComponent = ForwardRefExoticComponent<SvgIconProps & RefAttributes<SVGSVGElement>>;

export function withSpin(Icon: IconComponent): IconComponent {
  const SpinIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
    const { className, ...rest } = props;

    return (
      <Icon
        ref={ref}
        className={classNames('ty-icon-spin', className)}
        {...rest}
      />
    );
  });

  const name = Icon.displayName || 'Icon';
  SpinIcon.displayName = `withSpin(${name})`;

  return SpinIcon;
}
