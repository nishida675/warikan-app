"use client";

import { useState, useEffect, use, useContext, useMemo } from "react";
import { Edit3, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProjectId } from "@/app/components/hooks/useProjectId";
import {
  GroupContext,
  GroupData,
} from "@/app/components/provider/GroupProvider";
import { ExpenseContext } from "@/app/components/provider/ExpenseProvider";
import { calculateSettlements } from "@/app/components/calculateSettlements";
import SettlementList from "@/app/components/ui/Settlement";
import Loading from "@/app/loading";
import { DeleteExpense } from "@/app/components/model/DeleteExpense";
import {
  getProject,
  getUsers,
  getExpenses,
} from "@/app/components/model/GetProjectData";
import ExpenseCard from "@/app/components/ui/ExpenseCard";
import ExpenseCardHeader from "@/app/components/ui/ExpenseCardHeader";
import ExpenseCardContent from "@/app/components/ui/ExpenseCardContent";

const GroupPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = use(params);
  const { projectId: currentId } = useProjectId();
  const { groups, setGroups } = useContext(GroupContext);
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 対象グループを取得
  const currentGroup = useMemo<GroupData | undefined>(
    () => (groups ?? []).find((g) => g.projectId === projectId),
    [groups, projectId]
  );

  const members = useMemo(
    () => currentGroup?.members || [],
    [currentGroup?.members]
  );
  const groupName = currentGroup?.groupName || "未設定のプロジェクト";

  const settlements = useMemo(() => {
    if (expenses.length === 0) return [];
    return calculateSettlements(members, expenses);
  }, [members, expenses]);

  const memberMap = useMemo(() => {
    const map = new Map<string, string>();
    members.forEach((m) => map.set(m.id, m.name));
    return map;
  }, [members]);

  const getParticipantNames = (participantIds: string[]) =>
    participantIds.map((id) => memberMap.get(id) ?? "不明");

  // Firestoreからプロジェクト名とユーザー一覧を取得
  useEffect(() => {
    if (!projectId) return;

    let cancelled = false;

    const fetchProjectData = async () => {
      try {
        const targetId = currentId ?? projectId;

        const projectData = await getProject(targetId);
        if (!projectData) return;

        const users = await getUsers(targetId);
        const expenses = await getExpenses(targetId);

        if (!cancelled) {
          setGroups((prev) => {
            const list = prev ?? [];
            const exists = list.find((g) => g.projectId === targetId);
            if (exists) {
              return list.map((g) =>
                g.projectId === targetId
                  ? {
                      ...g,
                      groupName: projectData.name || "未設定",
                      members: users,
                    }
                  : g
              );
            } else {
              return [
                ...list,
                {
                  projectId: targetId,
                  groupName: projectData.name || "未設定",
                  members: users,
                },
              ];
            }
          });

          setExpenses(expenses);
        }
      } catch (error) {
        console.error("Firestore取得エラー:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchProjectData();

    return () => {
      cancelled = true;
    };
  }, [projectId, currentId, setGroups, setExpenses]); 

  const handleAddExpense = () => {
    router.push(`/Group/${projectId}/expense/new`);
  };

  // 立て替え削除処理
  const handleDeleteExpense = async (expenseId: string) => {
    if (!projectId) {
      alert("プロジェクトIDがありません");
      return;
    }
    const isDelete = await DeleteExpense(projectId, expenseId);
    if (isDelete) {
      setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    } else {
      alert("立て替えの削除に失敗しました。");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-start bg-slate-50 px-4 py-10 space-y-6">
      {/* 上部ブロック */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 w-full max-w-xl space-y-6">
        {/* グループ情報 */}
        <ExpenseCard className="shadow-md">
          <ExpenseCardHeader className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              {groupName}
            </h2>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100 transition shadow-sm"
              aria-label="編集"
            >
              <Edit3 className="w-5 h-5 text-slate-700" />
            </button>
          </ExpenseCardHeader>
          <ExpenseCardContent>
            <p className="text-gray-700">
              <span className="font-semibold">メンバー：</span>
              {members.length > 0
                ? members.map((m) => m.name).join("、")
                : "メンバー未登録"}
            </p>
          </ExpenseCardContent>
        </ExpenseCard>

        {/* 立て替え追加ボタン */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddExpense}
            className="w-full py-4 rounded-xl text-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            立て替え追加
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          ※「立て替え追加」ボタンから登録しましょう
        </p>
      </div>

      {/* 下部：立て替えリスト */}
      <div className="w-full max-w-xl space-y-4">
        {expenses.length === 0 && (
          <p className="text-center text-gray-500">
            まだ立て替えは登録されていません。
          </p>
        )}
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} className="relative shadow-lg border">
            <button
              type="button"
              onClick={() => handleDeleteExpense(expense.id)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition border"
              aria-label="削除"
            >
              <X className="w-4 h-4" />
            </button>

            <ExpenseCardHeader className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                {expense.description}
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100 transition shadow-sm"
                  aria-label="編集"
                >
                  <Edit3 className="w-4 h-4 text-slate-700" />
                </button>
              </h3>
            </ExpenseCardHeader>

            <ExpenseCardContent>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">
                  <span className="font-semibold">
                    {memberMap.get(expense.payerId) ?? "不明"}
                  </span>{" "}
                  が立て替えました
                </p>
                <p className="text-xl font-bold text-slate-800">
                  ¥{expense.amount.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center mt-2">
                {getParticipantNames(expense.participants).map((name) => (
                  <div
                    key={name}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm"
                    title={name}
                  >
                    {name.charAt(0)}
                  </div>
                ))}
              </div>
            </ExpenseCardContent>
          </ExpenseCard>
        ))}

        {expenses.length > 0 && <SettlementList settlements={settlements} />}
      </div>
    </main>
  );
};

export default GroupPage;
