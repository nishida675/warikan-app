"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const Logo = () => (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-indigo-500 to-fuchsia-500 shadow-md flex items-center justify-center text-white font-semibold text-lg">
        W
      </div>
      <div>
        <div className="text-lg font-semibold text-slate-900">アプリ名</div>
        <div className="text-sm text-slate-500">Split bills, simply</div>
      </div>
    </div>
  );

  // ホーム以外のページ
  if (pathname !== "/") {
    return (
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-20">
            <Logo />
          </div>
        </div>
      </header>
    );
  }

  // ホームページ
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴ部分 */}
          <Logo />

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center gap-8 text-base font-medium text-slate-700">
            <a href="#how-to-use" className="hover:text-slate-900 transition">
              使い方
            </a>
            <button
              onClick={() => router.push("/GroupCreation")}
              className="
                px-8 py-3 rounded-md border border-slate-800 text-slate-800 
      font-semibold bg-transparent
      hover:bg-slate-800 hover:text-white
      transition-all duration-300 ease-out
              "
            >
              今すぐ使う
            </button>
          </nav>

          {/* モバイルメニュー */}
          <div className="md:hidden">
            <button
              aria-label="menu"
              className="p-3 rounded-md hover:bg-slate-100 transition"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="#0f172a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
