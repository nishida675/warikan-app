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

// 初期値は空配列
export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  setExpenses: () => {},
});

const ExpenseProviderComponent = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // 初回ロード（CSRのみ）
  useEffect(() => {
    try {
      const saved = localStorage.getItem("expenses");
      if (saved) setExpenses(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to parse expenses:", e);
    }
  }, []);

  // expenses が変わったら localStorage に保存
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
