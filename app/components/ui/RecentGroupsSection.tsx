"use client";

import { useContext } from "react";
import { GroupContext, GroupData } from "@/app/components/provider/GroupProvider";
import { useRouter } from "next/navigation";

export function RecentGroupsSection() {
  const { groups } = useContext(GroupContext);
  const router = useRouter();

  const recentGroups = groups.slice(-5).reverse();

  if (recentGroups.length === 0) return null;

  return (
    <>
      {recentGroups.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="border-t border-slate-100 pt-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🕒</span>
              <h2 className="text-xl font-bold text-slate-800">
                最近使ったグループ
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentGroups.map((group: GroupData) => (
                <button
                  key={group.projectId}
                  onClick={() => router.push(`/Group/${group.projectId}`)}
                  className="
                        group w-full text-left
                        flex items-center justify-between
                        p-5 rounded-xl border border-slate-400 bg-white shadow-sm
                        hover:shadow-md hover:border-slate-500 hover:-translate-y-0.5
                        active:scale-[0.99]
                        transition-all duration-200 ease-out
                      "
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    {/* 左側のアイコン */}
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg shrink-0 group-hover:bg-slate-200 group-hover:text-slate-700 transition-colors">
                      {group.groupName.slice(0, 1)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 truncate group-hover:text-slate-900 transition-colors">
                        {group.groupName}
                      </h3>
                    </div>
                  </div>

                  {/* 右側の矢印アイコン */}
                  <div className="text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all duration-200 pl-4 shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
