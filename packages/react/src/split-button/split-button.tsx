import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ArrowDown } from '../_utils/components';
import { SplitButtonProps } from './types';
import ButtonGroup from '../button/button-group';
import Button from '../button/button';
import Dropdown from '../dropdown';

const SplitButton = (props: SplitButtonProps): React.ReactElement => {
  const {
    size = 'md',
    variant = 'solid',
    color = 'default',
    disabled = false,
    loading = false,
    dropdownPlacement = 'bottom-end',
    dropdownTrigger = 'hover',
    onClick,
    overlay,
    className,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('split-button', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  return (
    <ButtonGroup
      {...otherProps}
      className={cls}
      variant={variant}
      color={color}
      disabled={disabled}
      size={size}>
      <Button onClick={onClick} loading={loading}>
        {children}
      </Button>
      <Dropdown overlay={overlay} trigger={dropdownTrigger} placement={dropdownPlacement}>
        <Button
          className={`${prefixCls}__dropdown-btn`}
          variant={variant}
          color={color}
          disabled={disabled}
          size={size}>
          <ArrowDown size={10} />
        </Button>
      </Dropdown>
    </ButtonGroup>
  );
};

SplitButton.displayName = 'SplitButton';

export default SplitButton;
