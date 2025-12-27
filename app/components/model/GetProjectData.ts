import { Expense } from "@/app/components/Type";
import { Member, Project } from "@/app/components/Type";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

// プロジェクトドキュメント取得

export const getProject = async (
  projectId: string
): Promise<Project | null> => {
  const ref = doc(db, "warikan", projectId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as { name: string }),
  };
};


export const getUsers = async (projectId: string): Promise<Member[]> => {
  const ref = collection(db, "warikan", projectId, "users");
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { name: string }),
  }));
};

export const getExpenses = async (projectId: string): Promise<Expense[]> => {
  const ref = collection(db, "warikan", projectId, "expenses");
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      payerId: data.payerId ?? "",
      amount: data.amount ?? 0,
      description: data.description ?? "",
      participants: data.participants ?? [],
      createdAt: data.createdAt ?? "",
    };
  });
};
