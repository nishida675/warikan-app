import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ✅ グループ作成関数
export const CreateGroup = async (groupName: string, members: string[]) => {
  try {
    // projects コレクションにプロジェクト追加
    const projectRef = await addDoc(collection(db, `warikan`), {
      name: groupName,
      createdAt: serverTimestamp(),
    });

    // users サブコレクションにメンバー追加
    for (const member of members) {
      await addDoc(collection(projectRef, "users"), {
        name: member,
        createdAt: serverTimestamp(),
      });
    }

    // 成功時に projectId を返す
    return { success: true, id: projectRef.id };
  } catch (err) {
    console.error("Firestore 書き込みエラー:", err);
    return { success: false, error: "Firestore 書き込みに失敗しました。" };
  }
};
