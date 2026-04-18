import React, {ReactNode} from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface LoaderProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  /** customise the spinning indicator */
  indicator?: ReactNode;

  /** loader size */
  size?: SizeType;

  /** loading status */
  loading?: boolean;

  /** customize description content when Spin has children */
  tip?: string;

  /** vertical the content */
  vertical?: boolean;

  /** determine whether blur the loading background */
  blurred?: boolean;
}
