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

export type GroupContextType = {
  groupName: string;
  setGroupName: Dispatch<SetStateAction<string>>;
  members: Member[];
  setMembers: Dispatch<SetStateAction<Member[]>>;
};

export const GroupContext = createContext<GroupContextType>(
  {} as GroupContextType
);

const GroupProviderComponent = ({ children }: { children: ReactNode }) => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  // ✅ 初期読み込み：localStorage から復元
  useEffect(() => {
    const savedMembers = localStorage.getItem("members");
    const savedGroupName = localStorage.getItem("groupName");
    if (savedMembers) {
      try {
        setMembers(JSON.parse(savedMembers));
      } catch (e) {
        console.error("Failed to parse members:", e);
      }
    }
    if (savedGroupName) setGroupName(savedGroupName);
  }, []);

  // ✅ 値変更時に保存
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem("groupName", groupName);
  }, [groupName]);

  return (
    <GroupContext.Provider
      value={{ groupName, setGroupName, members, setMembers }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const GroupProvider = memo(GroupProviderComponent);
