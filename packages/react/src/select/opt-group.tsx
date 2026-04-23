import React, { useContext } from 'react';
import classNames from 'classnames';
import { hasMarker, markComponent, SELECT_OPT_GROUP_MARK, SELECT_OPTION_MARK } from '../_utils/component-markers';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { SelectOptGroupProps, SelectOptionsProps } from './types';

const SelectOptGroup = (props: SelectOptGroupProps): React.ReactElement => {
  const { prefixCls: customisedCls, label, className, children, ...otherProps } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('select-group', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  return (
    <li {...otherProps} key={label} className={cls}>
      <div className={`${prefixCls}__title`}>{label}</div>
      <ul className={`${prefixCls}__list`}>
        {React.Children.map(children, (child) => {
          const childElement = child as React.FunctionComponentElement<SelectOptionsProps>;
          if (hasMarker(childElement.type, SELECT_OPTION_MARK)) {
            const childProps = {
              ...childElement.props,
            };
            return React.cloneElement(childElement, childProps);
          } else {
            console.warn(
              'Select has a child that is not neither SelectOption nor SelectOptGroup component.'
            );
            return null;
          }
        })}
      </ul>
    </li>
  );
};

SelectOptGroup.displayName = 'SelectOptGroup';
markComponent(SelectOptGroup, SELECT_OPT_GROUP_MARK);

export default SelectOptGroup;
