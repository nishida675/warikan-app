"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  memo,
} from "react";

export type GroupContextType = {
  groupName: string;
  setGroupName: Dispatch<SetStateAction<string>>;
  members: string[];
  setMembers: Dispatch<SetStateAction<string[]>>;
};

export const GroupContext = createContext<GroupContextType>(
  {} as GroupContextType
);

const GroupProviderComponent = ({ children }: { children: ReactNode }) => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  return (
    <GroupContext.Provider
      value={{ groupName, setGroupName, members, setMembers }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const GroupProvider = memo(GroupProviderComponent);

