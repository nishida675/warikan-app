import { db } from "@/app/lib/firebase";
import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { Expense } from "../Type";

export const updateExpense = async (
  projectId: string,
  expenseId: string,
  data: Omit<Expense, "id" | "createdAt">
): Promise<boolean> => {
  try {
    const ref = doc(db, "warikan", projectId, "expenses", expenseId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return false;

    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
    return true;
  } catch (error) {
    console.error("Firestore更新エラー:", error);
    return false;
  }
};
