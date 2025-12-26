"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { GroupContext } from "@/app/components/provider/GroupProvider";
import { updateGroup } from "@/app/components/model/UpdateGroup";
import { updateUsers } from "@/app/components/model/UpdateUsers";

const GroupEditPage = ({ params }: { params: { projectId: string } }) => {
  const router = useRouter();
  const { projectId } = params;

  const { groupName, setGroupName, members, setMembers } =
    useContext(GroupContext);

  // 🔹 編集用ローカル state
  const [name, setName] = useState(groupName);
  const [localMembers, setLocalMembers] = useState(members);
  const [loading, setLoading] = useState(false);

  // ===== メンバー名変更 =====
  const handleChangeMember = (index: number, value: string) => {
    const updated = [...localMembers];
    updated[index] = { ...updated[index], name: value };
    setLocalMembers(updated);
  };

  // ===== メンバー削除 =====
  const handleDeleteMember = (index: number) => {
    setLocalMembers((prev) => prev.filter((_, i) => i !== index));
  };

  // ===== 更新 =====
  const handleUpdate = async () => {
    setLoading(true);

    const okGroup = await updateGroup(projectId, name);
    const okUsers = await updateUsers(projectId, localMembers);

    if (okGroup && okUsers) {
      // ✅ Context 更新
      setGroupName(name);
      setMembers(localMembers);

      alert("グループ情報を更新しました");
      router.back();
    } else {
      alert("更新に失敗しました");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
      <h2 className="text-xl font-bold">グループ編集</h2>

      {/* グループ名 */}
      <div>
        <label className="text-sm text-gray-500">グループ名</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>

      {/* メンバー */}
      <div>
        <p className="text-sm text-gray-500 mb-2">メンバー</p>
        {localMembers.map((m, i) => (
          <div key={m.id} className="flex gap-2 mb-2">
            <input
              value={m.name}
              onChange={(e) =>
                handleChangeMember(i, e.target.value)
              }
              className="flex-1 border rounded px-2 py-1"
            />
            <button
              onClick={() => handleDeleteMember(i)}
              className="text-red-500"
            >
              削除
            </button>
          </div>
        ))}
      </div>

      {/* 操作 */}
      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          className="flex-1 border rounded py-2"
        >
          戻る
        </button>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex-1 bg-indigo-600 text-white rounded py-2"
        >
          更新
        </button>
      </div>
    </main>
  );
};

export default GroupEditPage;
