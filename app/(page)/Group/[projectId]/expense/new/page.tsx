"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useProjectId } from "@/app/components/hooks/useProjectId";
import { GroupContext } from "@/app/components/provider/GroupProvider";
import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ExpenseNewPage() {
  const router = useRouter();
  const { projectId: currentId } = useProjectId();
  const { members } = useContext(GroupContext);

  const [payer, setPayer] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (memberId: string) => {
    setParticipants((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentId) {
      alert("プロジェクトIDがありません");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsLoading(true);

    try {
      const expenseRef = collection(db, "warikan", currentId, "expenses");

      await addDoc(expenseRef, {
        payerId: payer,
        amount: Number(amount),
        description: category,
        participants: participants,
        createdAt: serverTimestamp(),
      });

      router.push(`/Group/${currentId}`);
    } catch (error) {
      setIsSubmitting(false);
      setIsLoading(false);
      console.error("Firestore追加エラー:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <main className=" bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-slate-200 p-10">
        {/* タイトル */}
        <h1 className="text-3xl font-semibold text-slate-900 mb-8 text-center">
          支出を登録
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 支払った人 */}
          <div>
            <label className="block mb-2 text-slate-700 font-medium">
              支払った人
            </label>
            <div className="relative">
              <select
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
                required
                className="
                  w-full appearance-none p-4 rounded-xl border border-slate-300 
                  bg-white text-slate-800 text-lg
                  shadow-inner
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                "
              >
                <option value="">選択してください</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              {/* ▼アイコン */}
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* 割り勘参加者 */}
          <div>
            <label className="block mb-3 text-slate-700 font-medium">
              割り勘参加者
            </label>
            <div className="flex flex-wrap gap-3">
              {members.map((member) => (
                <label
                  key={member.id}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-2xl border 
                    cursor-pointer transition
                    ${
                      participants.includes(member.id)
                        ? "bg-indigo-50 border-indigo-400 shadow-sm"
                        : "bg-slate-100 border-slate-200 hover:bg-slate-200"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={participants.includes(member.id)}
                    onChange={() => handleCheckboxChange(member.id)}
                    className="w-5 h-5 accent-indigo-600"
                  />
                  <span className="text-slate-800 text-sm font-medium">
                    {member.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 費目 */}
          <div>
            <label className="block mb-2 text-slate-700 font-medium">
              何に使った？
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="例: 食事代"
              className="
                w-full p-4 rounded-xl border border-slate-300 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                text-slate-800 text-lg shadow-inner
              "
            />
          </div>

          {/* 金額 */}
          <div>
            <label className="block mb-2 text-slate-700 font-medium">
              金額
            </label>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xl font-semibold">¥</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="例: 3000"
                className="
        flex-1 p-4 rounded-xl border border-slate-300 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        text-slate-800 text-lg shadow-inner
      "
              />
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="
                w-1/2 py-4 rounded-xl text-lg font-semibold 
                border border-slate-800 text-slate-800 
                hover:bg-slate-100 active:shadow-inner
                transition-all duration-150
              "
            >
              戻る
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-1/2 py-4 rounded-xl text-lg font-semibold 
                bg-indigo-600 text-white shadow-md hover:bg-indigo-700 active:shadow-inner
                transition-all duration-150
              "
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
