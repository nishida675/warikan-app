"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { initAnonymousAuth } from "../../lib/firebase";
import { createGroup } from "@/app/components/model/createGroup";
import { useLoginId } from "@/app/components/hooks/useLoginId";

const GroupCreationPage = () => {
  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const router = useRouter();
  const { setLoginId } = useLoginId();

  // Firebase匿名認証の初期化
  useEffect(() => {
    const init = async () => {
      const idToken = await initAnonymousAuth();
      setLoginId(idToken); // トークンを保存
    };
    init();
  }, [setLoginId]);
  // メンバー追加
  const addMember = () => {
    if (memberName.trim() === "") return;
    setMembers([...members, memberName.trim()]);
    setMemberName("");
  };

  // メンバー削除
  const removeMember = (name: string) => {
    setMembers(members.filter((m) => m !== name));
  };

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (members.length === 0) {
      alert("少なくとも1人のメンバーを追加してください。");
      return;
    }

    const result = await createGroup(groupName, members);

    if (!result.success) {
      alert(result.error);
      return;
    }

    router.push(`/GroupCreatingSuccessful/${result.id}`);
  };

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-slate-100 p-10"
      >
        {/* タイトル */}
        <h1 className="text-3xl font-semibold text-slate-900 mb-2 text-center">
          グループを作成
        </h1>
        <p className="text-slate-600 text-center mb-10">
          グループ名とメンバーを入力してください。
        </p>

        {/* グループ名 */}
        <div className="mb-8">
          <label className="block mb-2 text-slate-700 font-medium">
            グループ名
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="例: 北海道旅行"
            required
            className="
              w-full p-4 rounded-xl border border-slate-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              text-slate-800 text-lg
            "
          />
        </div>

        {/* メンバー追加 */}
        <div className="mb-8">
          <label className="block mb-2 text-slate-700 font-medium">
            メンバーを追加
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="例: 太郎"
              className="
                flex-1 p-4 rounded-xl border border-slate-300 
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                text-lg
              "
            />
            <button
              type="button"
              onClick={addMember}
              className="
                px-6 py-3 rounded-xl border border-slate-800 text-slate-800 
                font-semibold bg-transparent 
                hover:bg-slate-800/10 transition
              "
            >
              追加
            </button>
          </div>
        </div>

        {/* メンバー一覧 */}
        {members.length > 0 && (
          <div className="mb-8">
            <h2 className="text-slate-700 font-medium mb-3">
              追加されたメンバー
            </h2>
            <ul className="flex flex-wrap gap-2">
              {members.map((member, index) => (
                <li
                  key={index}
                  className="
                    flex items-center bg-slate-100 border border-slate-200
                    rounded-full px-4 py-1.5 text-slate-800
                  "
                >
                  <span className="mr-2">{member}</span>
                  <button
                    type="button"
                    onClick={() => removeMember(member)}
                    className="text-slate-500 hover:text-red-600 font-bold transition"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* グループ情報表示 */}
        <div className="mb-8 text-slate-600 bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p>グループ名：{groupName || "（未入力）"}</p>
          <p>メンバー数：{members.length}人</p>
        </div>

        {/* 作成ボタン */}
        <button
          type="submit"
          className="
            w-full py-4 rounded-xl text-lg font-semibold 
            bg-indigo-600 text-white hover:bg-indigo-700 transition
          "
        >
          グループを作成する
        </button>
      </form>
    </main>
  );
};

export default GroupCreationPage;
