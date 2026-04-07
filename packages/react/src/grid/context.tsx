import React from 'react';
import { Breakpoint } from './responsive';

export interface GridContextValue {
  breakpoint: Breakpoint;
  columns?: number;
}

export const GridContext = React.createContext<GridContextValue | null>(null);
