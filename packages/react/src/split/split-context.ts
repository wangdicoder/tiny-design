import React from 'react';
import { SplitOrientation } from './types';

type Props = {
  orientation: SplitOrientation;
};

export const SplitContext = React.createContext<Props>({ orientation: 'horizontal' });
