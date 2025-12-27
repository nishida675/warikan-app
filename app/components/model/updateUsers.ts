import { db } from "@/app/lib/firebase";
import { collection, doc, updateDoc, addDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { Member } from "@/app/components/Type";

export const updateUsers = async (projectId: string, members: Member[]) => {
  try {
    const usersRef = collection(db, "warikan", projectId, "users");

    for (let i = 0; i < members.length; i++) {
      const member = members[i];

      if (member.id) {
        // 既存メンバー → 存在確認して update
        const ref = doc(usersRef, member.id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          await updateDoc(ref, {
            name: member.name,
            updatedAt: serverTimestamp(),
          });
        } else {
          // 存在しない場合は add する
          const newRef = await addDoc(usersRef, {
            name: member.name,
            createdAt: serverTimestamp(),
          });
          members[i].id = newRef.id;
        }
      } else {
        // 新規メンバー → add
        const newRef = await addDoc(usersRef, {
          name: member.name,
          createdAt: serverTimestamp(),
        });
        members[i].id = newRef.id;
      }
    }

    return { success: true };
  } catch (error) {
    console.error("ユーザー更新エラー:", error);
    return { success: false };
  }
};
