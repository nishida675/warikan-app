"use client";

import { useContext, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Check } from "lucide-react";
import { GroupContext } from "@/app/components/provider/GroupProvider";
import { updateGroup } from "@/app/components/model/updateGroup";
import { updateUsers } from "@/app/components/model/updateUsers";

export default function GroupEditPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const router = useRouter();
  const { projectId } = use(params);


  const { groupName, setGroupName, members, setMembers } =
    useContext(GroupContext);

  const [editingGroup, setEditingGroup] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [newMemberName, setNewMemberName] = useState("");

  // メンバー名変更
  const updateMemberName = (id: string, name: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name } : m))
    );
  };

  // メンバー追加（🔥 id を付けない）
  const addMember = () => {
    if (!newMemberName.trim()) return;

    const newMember: Member = {
      name: newMemberName.trim(),
    };

    setMembers((prev) => [...prev, newMember]);
    setNewMemberName("");
  };

  // 更新
  const handleUpdate = async () => {
    const groupResult = await updateGroup(projectId, groupName);
    const userResult = await updateUsers(projectId, members);

    if (!groupResult.success || !userResult.success) {
      alert("更新に失敗しました");
      return;
    }

    router.back();
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-white rounded-2xl">
      {/* ===== グループ名 ===== */}
      <div>
        <p className="text-sm text-gray-500">グループ名</p>
        <div className="flex items-center gap-2">
          {editingGroup ? (
            <>
              <input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="border-b flex-1 outline-none"
              />
              <Check
                className="cursor-pointer"
                onClick={() => setEditingGroup(false)}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold flex-1">{groupName}</h2>
              <Pencil
                className="cursor-pointer"
                onClick={() => setEditingGroup(true)}
              />
            </>
          )}
        </div>
      </div>

      {/* ===== メンバー ===== */}
      <div>
        <p className="text-sm text-gray-500 mb-2">メンバー名</p>

        {/* 追加 */}
        <div className="flex gap-2 mb-3">
          <input
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            className="border rounded-lg px-3 py-2 flex-1"
            placeholder="名前を入力"
          />
          <button
            onClick={addMember}
            className="px-4 py-2 rounded-lg bg-orange-400 text-white"
          >
            追加
          </button>
        </div>

        {/* 一覧 */}
        <div className="flex flex-wrap gap-2">
          {members.map((m, index) => (
            <div
              key={m.id ?? `new-${index}`}
              className="flex items-center gap-1 border rounded-full px-3 py-1"
            >
              {editingMemberId === m.id ? (
                <>
                  <input
                    value={m.name}
                    onChange={(e) =>
                      m.id && updateMemberName(m.id, e.target.value)
                    }
                    className="w-20 outline-none"
                  />
                  <Check
                    className="cursor-pointer"
                    onClick={() => setEditingMemberId(null)}
                  />
                </>
              ) : (
                <>
                  <span>{m.name}</span>
                  {m.id && (
                    <Pencil
                      className="cursor-pointer w-4 h-4"
                      onClick={() => setEditingMemberId(m.id!)}
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== ボタン ===== */}
      <div className="space-y-3 pt-6">
        <button
          onClick={handleUpdate}
          className="w-full py-3 rounded-full bg-orange-400 text-white font-bold"
        >
          更新
        </button>
        <button
          onClick={() => router.back()}
          className="w-full py-3 rounded-full bg-gray-100"
        >
          戻る
        </button>
      </div>
    </div>
  );
}
