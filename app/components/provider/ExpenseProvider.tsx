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
import { Expense } from "@/app/components/Type";

export type ExpenseContextType = {
  expenses: Expense[];
  setExpenses: Dispatch<SetStateAction<Expense[]>>;
};

export const ExpenseContext = createContext<ExpenseContextType>(
  {} as ExpenseContextType
);

const ExpenseProviderComponent = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // 初期読み込み：localStorage から復元
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch (e) {
        console.error("Failed to parse expenses:", e);
      }
    }
  }, []);

  // 値変更時に localStorage に保存
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const ExpenseProvider = memo(ExpenseProviderComponent);
