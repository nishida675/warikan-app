"use client";

import { usePathname } from "next/navigation";
import Logo from "./ui/Logo";
import ButtonNavigate from "./ui/Button";

const Header = () => {
  const pathname = usePathname();

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

            <ButtonNavigate
              href="/GroupCreation"
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
            </ButtonNavigate>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
