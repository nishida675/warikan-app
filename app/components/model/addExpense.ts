import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const addExpense = async (
  projectId: string,
  payerId: string,
  amount: number,
  description: string,
  participants: string[]
) => {
  try {
    const expenseRef = collection(db, "warikan", projectId, "expenses");

    await addDoc(expenseRef, {
      payerId,
      amount,
      description,
      participants,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Firestore追加エラー:", error);
    return { success: false, error };
  }
};
