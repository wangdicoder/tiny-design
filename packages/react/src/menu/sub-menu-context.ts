import React from 'react';

type Props = {
  level?: number;
  ancestorKeys?: string[];
  onMenuItemClick?: () => void;
};

export const SubMenuContext = React.createContext<Props>({});
