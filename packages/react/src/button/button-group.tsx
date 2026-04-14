import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ButtonColor, ButtonGroupProps, ButtonProps, ButtonShape, ButtonVariant } from './types';
import { SizeType } from '../_utils/props';
import { BUTTON_MARK } from './button';

const hasOwnProp = <T extends object>(props: T, key: keyof T): boolean => props[key] !== undefined;

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props: ButtonGroupProps, ref) => {
    const {
      size = 'md',
      variant = 'solid',
      color = 'default',
      disabled = false,
      round = false,
      shape,
      inheritMode = 'fill',
      prefixCls: customisedCls,
      className,
      children,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('btn-group', configContext.prefixCls, customisedCls);
    const btnSize = props.size || configContext.componentSize || size;
    const resolvedShape = shape || (round ? 'round' : 'default');
    const cls = classNames(
      prefixCls,
      {
        [`${prefixCls}_round`]: resolvedShape === 'round',
        [`${prefixCls}_variant-${variant}`]: variant,
        [`${prefixCls}_color-${color}`]: color,
        [`${prefixCls}_${btnSize}`]: btnSize,
      },
      className
    );
    return (
      <div {...otherProps} className={cls} ref={ref}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<ButtonProps>(child)) {
            return child;
          }

          const childType = child.type as Record<PropertyKey, unknown>;
          if (!childType[BUTTON_MARK]) {
            return child;
          }

          if (inheritMode === 'none') {
            return child;
          }

          const childProps: Partial<ButtonProps> = {};
          const applyProp = <K extends keyof ButtonProps>(key: K, value: ButtonProps[K]): void => {
            if (inheritMode === 'override' || !hasOwnProp(child.props, key)) {
              childProps[key] = value;
            }
          };

          applyProp('variant', variant as ButtonVariant);
          applyProp('color', color as ButtonColor);
          applyProp('size', btnSize as SizeType);
          applyProp('disabled', disabled);

          if (
            inheritMode === 'override' ||
            (!hasOwnProp(child.props, 'shape') && !hasOwnProp(child.props, 'round'))
          ) {
            childProps.shape = resolvedShape as ButtonShape;
          }

          return React.cloneElement(child, childProps);
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
