"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
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
};

export default Logo;
