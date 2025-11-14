import { db } from "@/app/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const DeleteExpense = async (projectId: string, expenseId: string) => {
  try {
    // Firestore のドキュメント参照を取得
    const expenseRef = doc(db, "warikan", projectId, "expenses", expenseId);

    // Firestore から削除
    await deleteDoc(expenseRef);
    return true;
  } catch (error) {
    console.error("削除中にエラー:", error);
    return false;
  }
};
