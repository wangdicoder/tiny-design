import { createContext } from 'react';
import { QuickActionsDirection } from './types';

export interface QuickActionsContextProps {
  direction: QuickActionsDirection;
}

export const QuickActionsContext = createContext<QuickActionsContextProps>({
  direction: 'up',
});
