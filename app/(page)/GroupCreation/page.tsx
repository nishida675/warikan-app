"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { CreateGroup } from "@/app/components/model/createGroup";
import { useAuth } from "@/app/components/provider/AuthProvider";

const GroupCreationPage = () => {
  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { isAuthReady } = useAuth();

  if (!isAuthReady) return <Loading />;

  const addMember = () => {
    if (memberName.trim() === "") return;
    setMembers([...members, memberName.trim()]);
    setMemberName("");
  };

  const removeMember = (name: string) => {
    setMembers(members.filter((m) => m !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (members.length === 0) {
      alert("少なくとも1人のメンバーを追加してください。");
      setIsSubmitting(false);
      return;
    }

    const result = await CreateGroup(groupName, members);

    if (!result.success) {
      setIsSubmitting(false);
      alert(result.error);
      return;
    }

    router.push(`/GroupCreatingSuccessful/${result.id}`);
  };

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-8 md:py-12">
      <form
        onSubmit={handleSubmit}
        className="
            w-full max-w-lg md:max-w-2xl 
            bg-white rounded-2xl md:rounded-3xl 
            shadow-lg border border-slate-100 
            p-6 md:p-10
          "
      >
        {/* タイトル */}
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2 text-center">
          グループを作成
        </h1>
        <p className="text-slate-600 text-center mb-8 md:mb-10 text-sm md:text-base">
          グループ名とメンバーを入力してください。
        </p>

        {/* グループ名 */}
        <div className="mb-6 md:mb-8">
          <label className="block mb-2 text-slate-700 font-medium text-sm md:text-base">
            グループ名
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="例: 北海道旅行"
            required
            className="
                w-full p-3 md:p-4 
                rounded-xl border border-slate-300 
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                text-slate-800 text-base
              "
          />
        </div>

        {/* メンバー追加 */}
        <div className="mb-6 md:mb-8">
          <label className="block mb-2 text-slate-700 font-medium text-sm md:text-base">
            メンバーを追加
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="例: 太郎"
              className="
                  flex-1 p-3 md:p-4 
                  rounded-xl border border-slate-300 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  text-base
                "
            />
            <button
              type="button"
              onClick={addMember}
              className="
                  px-4 md:px-6 py-3 rounded-xl 
                  border border-slate-800 text-slate-800 
                  font-semibold text-sm md:text-base
                  bg-transparent hover:bg-slate-800/10 transition
                "
            >
              追加
            </button>
          </div>
        </div>

        {/* メンバー一覧 */}
        {members.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-slate-700 font-medium mb-3 text-sm md:text-base">
              追加されたメンバー
            </h2>
            <ul className="flex flex-wrap gap-2">
              {members.map((member, index) => (
                <li
                  key={index}
                  className="
                      flex items-center bg-slate-100 border border-slate-200
                      rounded-full px-3 md:px-4 py-1.5 text-slate-800 text-sm md:text-base
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

        {/* 作成ボタン */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="
              w-full py-3 md:py-4 rounded-xl 
              text-base md:text-lg font-semibold 
              bg-indigo-600 text-white 
              hover:bg-indigo-700 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
        >
          {isSubmitting ? "作成中..." : "グループを作成する"}
        </button>
      </form>
    </main>
  );
};

export default GroupCreationPage;
