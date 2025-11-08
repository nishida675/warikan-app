"use client";
import { useState, use, useEffect } from "react";
import { Edit3, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProjectId } from "@/app/components/hooks/useProjectId";
import ExpenseCard from "@/app/components/ui/ExpenseCard";
import ExpenseCardHeader from "@/app/components/ui/ExpenseCardHeader";
import ExpenseCardContent from "@/app/components/ui/ExpenseCardContent";

const GroupPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = use(params);
  const { projectId: currentId, setProjectId } = useProjectId();
  const router = useRouter();

  useEffect(() => {
    if (currentId !== projectId) {
      setProjectId(projectId);
    }
  }, [projectId, currentId, setProjectId]);

  const [group] = useState({
    name: "旅行メンバー",
    members: ["太郎", "花子", "健"],
  });

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "ホテル代",
      amount: 12000,
      payer: "太郎",
      beneficiaries: ["花子", "健"],
    },
    {
      id: 2,
      title: "夕食代",
      amount: 8000,
      payer: "花子",
      beneficiaries: ["太郎", "健"],
    },
  ]);

  const handleAddExpense = () => {
    router.push(`/Group/${projectId}/expense/new`);
  };

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-start bg-slate-50 px-4 py-10 space-y-6">
      {/* 上部ブロック（白背景・グループ情報など） */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 w-full max-w-xl space-y-6">
        {/* グループ情報 */}
        <ExpenseCard className="shadow-md">
          <ExpenseCardHeader className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              {group.name}
            </h2>
            <button
              type="button"
              className="
                w-9 h-9 flex items-center justify-center 
                rounded-full border border-slate-300 
                bg-white hover:bg-slate-100 transition
                shadow-sm
              "
              aria-label="編集"
            >
              <Edit3 className="w-5 h-5 text-slate-700" />
            </button>
          </ExpenseCardHeader>
          <ExpenseCardContent>
            <p className="text-gray-700">
              <span className="font-semibold">メンバー：</span>
              {group.members.join("、")}
            </p>
          </ExpenseCardContent>
        </ExpenseCard>

        {/* 立て替え追加ボタン */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddExpense}
            className="
              w-full py-4 rounded-xl text-lg font-semibold 
              bg-indigo-600 text-white hover:bg-indigo-700 transition
            "
          >
            立て替え追加
          </button>
        </div>

        {/* 注意書き */}
        <p className="text-sm text-gray-500 text-center">
          ※「立て替え追加」ボタンから登録しましょう
        </p>
      </div>

      {/* 下部：立て替えリスト（外の別カード） */}
      <div className="w-full max-w-xl space-y-4">
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} className="relative shadow-lg border">
            {/* 右上のバツボタン */}
            <button
              type="button"
              className="
                absolute top-3 right-3
                w-8 h-8 flex items-center justify-center 
                rounded-full bg-red-50 text-red-500 
                hover:bg-red-100 hover:text-red-600 
                transition border
                "
              aria-label="削除"
            >
              <X className="w-4 h-4" />
            </button>

            <ExpenseCardHeader className="flex items-center gap-2 mb-2">
              {/* タイトルと編集ボタンを横並び */}
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                {expense.title}
                <button
                  type="button"
                  className="
                    w-8 h-8 flex items-center justify-center 
                    rounded-full border border-slate-300 
                    bg-white hover:bg-slate-100 transition
                    shadow-sm
                    "
                  aria-label="編集"
                >
                  <Edit3 className="w-4 h-4 text-slate-700" />
                </button>
              </h3>
            </ExpenseCardHeader>

            <ExpenseCardContent>
              {/* 金額を右寄せで強調表示 */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">
                  <span className="font-semibold">{expense.payer}</span>{" "}
                  が立て替えました
                </p>
                <p className="text-xl font-bold text-slate-800">
                  ¥{expense.amount.toLocaleString()}
                </p>
              </div>

              {/* 対象メンバー（丸でイニシャル表示） */}
              <div className="flex items-center mt-2">
                {expense.beneficiaries.map((name) => (
                  <div
                    key={name}
                    className="
                        w-8 h-8 flex items-center justify-center 
                        rounded-full bg-indigo-100 text-indigo-700 
                        font-semibold text-sm
                    "
                    title={name}
                  >
                    {name.charAt(0)}
                  </div>
                ))}
              </div>
            </ExpenseCardContent>
          </ExpenseCard>
        ))}
      </div>
    </main>
  );
};

export default GroupPage;
