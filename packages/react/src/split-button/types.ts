import React from 'react';
import { ButtonColor, ButtonGroupProps, ButtonVariant } from '../button/types';
import { DropdownPlacement, DropdownTrigger } from '../dropdown/types';
import { MenuProps } from '../menu/types';
import { SizeType } from '../_utils/props';

export interface SplitButtonProps extends Omit<ButtonGroupProps, 'onClick'> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  size?: SizeType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  overlay?: React.ReactElement<MenuProps>;
  dropdownTrigger?: DropdownTrigger;
  dropdownPlacement?: DropdownPlacement;
}
