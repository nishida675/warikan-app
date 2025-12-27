"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  memo,
} from "react";
import { Member } from "@/app/components/type";

export type GroupData = {
  groupName: string;
  members: Member[];
  projectId: string;
};

export type GroupContextType = {
  groups: GroupData[] | null | undefined;
  setGroups: Dispatch<SetStateAction<GroupData[] | null | undefined>>;
};

export const GroupContext = createContext<GroupContextType>({
  groups: undefined,
  setGroups: () => {},
});

const GroupProviderComponent = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<GroupData[] | null | undefined>(
    undefined
  );

  // 初回ロード
  useEffect(() => {
    const saved = localStorage.getItem("groups");
    setGroups(saved ? JSON.parse(saved) : []);
  }, []);

  // groups が変わったら localStorage に保存
  useEffect(() => {
    if (groups !== undefined) {
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }, [groups]);

  if (groups === undefined) return null;

  return (
    <GroupContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

export const GroupProvider = memo(GroupProviderComponent);
