import { db } from "@/app/lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export const updateGroup = async (
  projectId: string,
  groupName: string
) => {
  try {
    const ref = doc(db, "warikan", projectId);

    await updateDoc(ref, {
      name: groupName,
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("グループ更新エラー:", error);
    return { success: false };
  }
};
