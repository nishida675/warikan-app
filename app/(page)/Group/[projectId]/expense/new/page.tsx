"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExpenseNewPage() {
  const router = useRouter();
  const [payer, setPayer] = useState("");
  const [participants, setParticipants] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ payer, participants, category, amount });
    // Firestore保存処理など
  };

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-slate-100 p-10"
      >
        {/* タイトル */}
        <h1 className="text-3xl font-semibold text-slate-900 mb-2 text-center">
          支出を登録
        </h1>

        {/* 支払った人 */}
        <div className="mb-8">
          <label className="block mb-2 text-slate-700 font-medium">
            支払った人
          </label>
          <input
            type="text"
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
            placeholder="例: Aさん"
            required
            className="w-full p-4 rounded-xl border border-slate-300 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       text-slate-800 text-lg"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-slate-700 font-medium">
            割り勘参加者
          </label>
          <input
            type="text"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            placeholder="例: Bさん, Cさん"
            className="w-full p-4 rounded-xl border border-slate-300 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       text-slate-800 text-lg"
          />
        </div>

        {/* 費目 */}
        <div className="mb-8">
          <label className="block mb-2 text-slate-700 font-medium">何に使った？</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="例: 食事代"
            className="w-full p-4 rounded-xl border border-slate-300 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       text-slate-800 text-lg"
          />
        </div>

        {/* 金額 */}
        <div className="mb-10">
          <label className="block mb-2 text-slate-700 font-medium">金額</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="例: 3000"
            className="w-full p-4 rounded-xl border border-slate-300 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       text-slate-800 text-lg"
          />
        </div>

        {/* ボタン */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-1/2 py-4 rounded-xl text-lg font-semibold 
                       border border-slate-800 text-slate-800 
                       hover:bg-slate-800/10 transition"
          >
            戻る
          </button>
          <button
            type="submit"
            className="w-1/2 py-4 rounded-xl text-lg font-semibold 
                       bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            登録
          </button>
        </div>
      </form>
    </main>
  );
}
