import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GroupDto } from '../types/GroupDto';

type GroupContextType = {
  group: GroupDto | null;
  setGroup: (group: GroupDto | null) => void;
  setGroupName: (name: string) => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [group, setGroupState] = useState<GroupDto | null>(null);

  const setGroup = (group: GroupDto | null) => {
    setGroupState(group);
  };

  const setGroupName = (name: string) => {
    if (group) {
      setGroupState({ ...group, name });
    }
  };

  return (
    <GroupContext.Provider value={{ group, setGroup, setGroupName }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
};
