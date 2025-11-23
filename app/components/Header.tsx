"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const Logo = () => (
    <div
      className="flex items-center gap-2 sm:gap-3 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-gradient-to-tr from-indigo-500 to-fuchsia-500 shadow-md flex items-center justify-center text-white font-semibold text-base sm:text-lg">
        W
      </div>
      <div className="leading-tight">
        <div className="text-base sm:text-lg font-semibold text-slate-900">
          割り勘アプリ
        </div>
        <div className="text-xs sm:text-sm text-slate-500">
          Split bills, simply
        </div>
      </div>
    </div>
  );

  if (pathname !== "/") {
    return (
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center h-20">
            <Logo />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="#how-to-use"
              className="text-xs sm:text-base font-medium text-slate-700 hover:text-slate-900 transition"
            >
              使い方
            </a>

            <button
              onClick={() => router.push("/GroupCreation")}
              className="
                px-3 py-2 sm:px-6 sm:py-2.5
                rounded-md border border-slate-800 
                text-slate-800 font-semibold bg-transparent
                hover:bg-slate-800 hover:text-white
                transition-all duration-300 ease-out
                text-xs sm:text-base
              "
            >
              今すぐ使う
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
