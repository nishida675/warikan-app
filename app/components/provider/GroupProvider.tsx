"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  memo,
} from "react";
import { Member } from "@/app/components/Type";

export type GroupData = {
  groupName: string;
  members: Member[];
  projectId: string;
};

export type GroupContextType = {
  groups: GroupData[];
  setGroups: Dispatch<SetStateAction<GroupData[]>>;
};

export const GroupContext = createContext<GroupContextType>(
  {} as GroupContextType
);

const GroupProviderComponent = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<GroupData[]>([]);

  //初期読み込み
  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      try {
        setGroups(JSON.parse(savedGroups));
      } catch (e) {
        console.error("Failed to parse groups:", e);
      }
    }
  }, []);

  //変更時に localStorage 保存
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  return (
    <GroupContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

export const GroupProvider = memo(GroupProviderComponent);
