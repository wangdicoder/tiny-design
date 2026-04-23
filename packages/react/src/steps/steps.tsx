import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { hasMarker, STEPS_ITEM_MARK } from '../_utils/component-markers';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { StepsContext } from './steps-context';
import { StepsItemProps, StepsProps } from './types';

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (props: StepsProps, ref): React.ReactElement => {
    const {
      defaultCurrent = 0,
      status = 'process',
      direction = 'horizontal',
      labelPlacement = 'vertical',
      onChange,
      className,
      children,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('steps', configContext.prefixCls, customisedCls);
    const cls = classNames(prefixCls, className, `${prefixCls}_${direction}`);
    const [current, setCurrent] = useState<number>(
      'current' in props ? (props.current as number) : defaultCurrent
    );

    const itemOnClick = (curr: number) => {
      !('current' in props) && setCurrent(curr);
      onChange && onChange(curr);
    };

    useEffect(() => {
      'current' in props && setCurrent(props.current as number);
    }, [props]);

    return (
      <StepsContext.Provider
        value={{
          current,
          labelPlacement,
          status,
          clickable: 'onChange' in props,
          onClick: itemOnClick,
        }}>
        <div {...otherProps} ref={ref} className={cls}>
          {React.Children.map(children, (child, idx) => {
            const childElement = child as React.FunctionComponentElement<StepsItemProps>;
            if (hasMarker(childElement.type, STEPS_ITEM_MARK)) {
              const childProps: Partial<StepsItemProps> = {
                stepIndex: idx,
              };
              return React.cloneElement(childElement, childProps);
            } else {
              console.warn('Steps has a child that is not a Step component.');
              return null;
            }
          })}
        </div>
      </StepsContext.Provider>
    );
  }
);

Steps.displayName = 'Steps';

export default Steps;
