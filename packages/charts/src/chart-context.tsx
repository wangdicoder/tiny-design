import React, { createContext, useContext } from 'react';
import { ChartConfig } from './types';

interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = createContext<ChartContextValue | null>(null);

export function useChart(): ChartContextValue {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }
  return context;
}

export function ChartContextProvider({
  config,
  children,
}: {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  return (
    <ChartContext.Provider value={{ config }}>{children}</ChartContext.Provider>
  );
}
