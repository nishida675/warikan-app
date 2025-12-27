"use client";

import { useState, useEffect, useContext, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GroupContext } from "@/app/components/provider/GroupProvider";
import { ExpenseContext } from "@/app/components/provider/ExpenseProvider";
import { updateExpense } from "@/app/components/model/updateExpense";
import { Save, ChevronLeft } from "lucide-react";
import { Expense } from "@/app/components/type";

const ExpenseEditPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("expenseId");
  const projectId = searchParams.get("projectId");
  const { groups } = useContext(GroupContext);
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const members = useMemo(() => {
    if (!groups || !projectId) return [];
    const currentGroup = groups.find((g) => g.projectId === projectId);
    return currentGroup?.members ?? [];
  }, [groups, projectId]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [payerId, setPayerId] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!expenseId) return;
    const expense = expenses.find((e) => e.id === expenseId);
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount);
      setPayerId(expense.payerId);
      setParticipants(expense.participants);
    }
  }, [expenseId, expenses]);

  const toggleParticipant = (id: string) => {
    setParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!projectId || !expenseId) return;
    if (!description.trim() || amount <= 0 || !payerId) {
      alert("必要項目を入力してください");
      return;
    }

    setLoading(true);

    const success = await updateExpense(projectId, expenseId, {
      description,
      amount,
      payerId,
      participants,
    } as Omit<Expense, "id" | "createdAt">);

    if (success) {
      setExpenses((prev) =>
        prev.map((e) =>
          e.id === expenseId
            ? { ...e, description, amount, payerId, participants }
            : e
        )
      );
      router.back();
    } else {
      alert(
        "更新に失敗しました。Firestore上にドキュメントが存在するか確認してください。"
      );
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-600 transition hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            立て替え編集
          </h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Expense
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 space-y-8">
        {/* 内容 */}
        <div className="space-y-3">
          <label className="text-sm font-black text-slate-500 uppercase tracking-wider ml-1">
            内容
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例: 昼食代"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg font-bold text-slate-800"
          />
        </div>

        {/* 金額 */}
        <div className="space-y-3">
          <label className="text-sm font-black text-slate-500 uppercase tracking-wider ml-1">
            金額
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="例: 1200"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg font-bold text-slate-800"
          />
        </div>

        {/* 支払者 */}
        <div className="space-y-3">
          <label className="text-sm font-black text-slate-500 uppercase tracking-wider ml-1">
            立て替えた人
          </label>
          <select
            value={payerId}
            onChange={(e) => setPayerId(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg font-bold text-slate-800"
          >
            <option value="">選択してください</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* 参加者 */}
        <div className="space-y-3">
          <label className="text-sm font-black text-slate-500 uppercase tracking-wider ml-1">
            参加者
          </label>
          <div className="flex flex-wrap gap-2">
            {members.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleParticipant(m.id)}
                className={`px-4 py-2 rounded-2xl border font-semibold ${
                  participants.includes(m.id)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                } transition`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => router.back()}
            className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-lg font-bold transition"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-indigo-100 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            更新する
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseEditPage;
