import React from 'react';
import { BaseProps } from '../_utils/props';

export type AvatarShape = 'circle' | 'square';
export type AvatarPresence = 'online' | 'busy' | 'away' | 'offline';

export interface AvatarProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'span'> {
  /** use an icon */
  icon?: React.ReactNode;

  /** avatar shape */
  shape?: AvatarShape;

  /** avatar size */
  size?: number;

  /** use an image */
  src?: string;

  /** display presence status  */
  presence?: AvatarPresence;

  /** alt prop for src */
  alt?: string;
}

export interface AvatarGroupProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'span'> {
  /** the distance between two avatars */
  gap: number | string;
}
