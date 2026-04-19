import { createContext } from 'react';
import { QuickActionsDirection, QuickActionsOpenSource } from './types';

export interface QuickActionsContextProps {
  direction: QuickActionsDirection;
  isOpen: boolean;
  closeOnActionClick: boolean;
  requestClose: (source: QuickActionsOpenSource) => void;
}

export const QuickActionsContext = createContext<QuickActionsContextProps>({
  direction: 'up',
  isOpen: false,
  closeOnActionClick: true,
  requestClose: () => undefined,
});
