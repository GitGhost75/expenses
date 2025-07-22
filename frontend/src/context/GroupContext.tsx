import { createContext, useContext, useState } from "react";

type GroupContextType = {
  groupName: string;
  setGroupName: (name: string) => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: React.ReactNode }) => {
  const [groupName, setGroupName] = useState("");

  return (
    <GroupContext.Provider value={{ groupName, setGroupName }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) throw new Error("useGroup must be used inside GroupProvider");
  return context;
};
