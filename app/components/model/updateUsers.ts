import { db } from "@/app/lib/firebase";
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Member } from "@/app/components/Type";

export const updateUsers = async (
  projectId: string,
  members: Member[]
) => {
  try {
    const usersRef = collection(db, "warikan", projectId, "users");

    for (const member of members) {
      if (member.id) {
        // 既存メンバー → 更新
        const ref = doc(usersRef, member.id);
        await updateDoc(ref, {
          name: member.name,
        });
      } else {
        // 新規メンバー → 追加
        await addDoc(usersRef, {
          name: member.name,
          createdAt: serverTimestamp(),
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error("ユーザー更新エラー:", error);
    return { success: false };
  }
};
