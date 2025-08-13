import React from 'react';

interface RefreshContextType {
  refreshTrigger: number;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
}

export const RefreshContext = React.createContext<RefreshContextType | undefined>(undefined);