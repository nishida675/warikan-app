"use client";

import { useContext, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { GroupContext } from "@/app/components/provider/GroupProvider";
import { updateGroup } from "@/app/components/model/updateGroup";
import { updateUsers } from "@/app/components/model/updateUsers";
import { Member } from "@/app/components/Type";
import { v4 as uuidv4 } from "uuid";
import { Users, X, Save, LayoutGrid, ChevronLeft } from "lucide-react";

const GroupEditPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const router = useRouter();
  const { projectId } = use(params);

  const { groups, setGroups } = useContext(GroupContext);
  const group = groups?.find((g) => g.projectId === projectId);

  const [name, setName] = useState("");
  const [localMembers, setLocalMembers] = useState<Member[]>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!group) return;
    setName(group.groupName);
    setLocalMembers(group.members);
  }, [group]);

  const handleChangeMember = (index: number, value: string) => {
    setLocalMembers(prev =>
      prev.map((m, i) => i === index ? { ...m, name: value } : m)
    );
  };

  const handleDeleteMember = (index: number) => {
    setLocalMembers(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;

    const newMember: Member = {
      id: uuidv4(),
      name: newMemberName.trim(),
    };

    setLocalMembers(prev => [...prev, newMember]);
    setNewMemberName("");
  };

  const handleUpdate = async () => {
    if (!group) return;
    setLoading(true);

    const okGroup = await updateGroup(projectId, name);
    const okUsers = await updateUsers(projectId, localMembers);

    if (okGroup.success && okUsers.success) {
      setGroups(prev =>
        prev?.map(g =>
          g.projectId === projectId ? { ...g, groupName: name, members: localMembers } : g
        ) ?? prev
      );
      router.back();
    } else {
      alert("更新に失敗しました");
    }

    setLoading(false);
  };

  if (!group) return null;

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
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">グループ編集</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Settings & Members</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 space-y-8">
        {/* グループ名 */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-black text-slate-500 uppercase tracking-wider ml-1">
            <LayoutGrid className="w-4 h-4" />
            グループ名
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 北海道旅行"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg font-bold text-slate-800"
          />
        </div>

        {/* メンバー */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-black text-slate-500 uppercase tracking-wider ml-1">
            <Users className="w-4 h-4" />
            メンバー
          </label>
          
          <div className="space-y-3">
            {localMembers.map((m, i) => (
              <div key={m.id} className="group flex gap-3 items-center">
                <input
                  type="text"
                  value={m.name}
                  onChange={(e) => handleChangeMember(i, e.target.value)}
                  className="flex-1 p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-semibold text-slate-700"
                />
                <button
                  onClick={() => handleDeleteMember(i)}
                  className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* 新規メンバー追加 */}
          <div className="pt-4 border-t border-slate-50">
            <div className="flex gap-3">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                placeholder="新しいメンバー名"
                className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
              <button
                onClick={handleAddMember}
                className="px-6 py-4 rounded-2xl border-2 border-slate-800 text-slate-800 font-black hover:bg-slate-800 hover:text-white transition transform active:scale-95"
              >
                追加
              </button>
            </div>
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
            onClick={handleUpdate}
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

export default GroupEditPage;
