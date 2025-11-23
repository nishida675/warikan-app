"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const HERO_IMAGE_URL = "/hero.png";

const STEP_IMAGES = [
  "/createGroup.png",
  "/expense.png",
  "/url.png",
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans tracking-wide leading-relaxed scroll-smooth relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-slate-100 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-6 lg:py-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <div className="text-xs md:text-sm inline-block mb-6 px-3 py-1 rounded-full bg-slate-50 text-slate-600 font-medium border border-slate-200">
            会員登録不要・ブラウザで完結
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.3] text-slate-900">
            旅行や食事の立て替えを、
            <br className="hidden sm:block" />
            <span className="inline-block bg-gradient-to-r from-amber-100/80 to-orange-100/50 px-2 py-1 rounded-md mt-1 -ml-2">
              スマートに清算
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-600">
            Walicaは複数人の割り勘を直感的に管理できるウェブアプリです。
            アプリ不要、リンクを共有するだけで清算が完了します。
          </p>

          {/* ボタンエリア */}
          <div className="mt-9 flex gap-4">
            <button
              onClick={() => router.push("/GroupCreation")}
              className="
                px-8 py-3 rounded-lg bg-slate-900 text-white
                font-bold shadow-lg shadow-slate-200
                hover:bg-slate-700 hover:shadow-xl hover:-translate-y-0.5
                transition-all duration-300 ease-out
              "
            >
              今すぐ始める
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 text-sm md:text-base text-slate-700">
            <div className="flex items-center gap-3">
              {/* アイコン背景も落ち着いた色味に */}
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <div>
                <div className="font-bold text-slate-900">登録不要</div>
                <div className="text-xs text-slate-500">リンク共有で完了</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-lg">
                🔒
              </div>
              <div>
                <div className="font-bold text-slate-900">安心・安全</div>
                <div className="text-xs text-slate-500">データは暗号化</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          {HERO_IMAGE_URL ? (
            <div className="w-full rounded-2xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition duration-500">
              <Image
                src={HERO_IMAGE_URL}
                alt="hero"
                width={900}
                height={600}
                className="object-cover w-full h-[360px] md:h-[420px]"
              />
            </div>
          ) : (
            <div className="w-full h-[320px] md:h-[400px] rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-xl flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
              <svg
                width="180"
                height="120"
                viewBox="0 0 200 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-md"
              >
                <rect
                  x="8"
                  y="8"
                  width="184"
                  height="134"
                  rx="14"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="4"
                />
                <path
                  d="M16 120L48 78L80 104L118 54L168 120H16Z"
                  fill="#f1f5f9"
                />
                <circle cx="150" cy="40" r="15" fill="#fdba74" />
              </svg>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 inline-block relative">
              主な特徴
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-300 rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "ブラウザで完結",
                desc: "アプリ不要、リンクを共有するだけで清算完了。",
                icon: "🌍",
                color: "bg-blue-50 text-blue-500",
              },
              {
                title: "自動計算",
                desc: "だれがいくら払うかを自動で計算。面倒な計算は不要。",
                icon: "🧮",
                color: "bg-emerald-50 text-emerald-500",
              },
              {
                title: "シンプル設計",
                desc: "迷わず使える直感的な操作画面。",
                icon: "✨",
                color: "bg-purple-50 text-purple-500",
              },
            ].map((f, i) => (
              <article
                key={i}
                className="p-6 rounded-xl shadow-sm bg-white border border-slate-100 hover:shadow-md hover:-translate-y-1 transition duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${f.color} flex items-center justify-center text-2xl mb-4`}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-to-use" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            <span className="bg-slate-100 px-4 py-1 rounded-md">
              3ステップで完了
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "STEP 1",
              title: "グループを作成",
              desc: "旅行や飲み会のグループを作成します。",
            },
            {
              step: "STEP 2",
              title: "立て替えを記録",
              desc: "誰がいくら立て替えたかを入力します。",
            },
            {
              step: "STEP 3",
              title: "リンク共有で清算",
              desc: "メンバーにリンクを送って清算完了。",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 relative">
                <div className="text-xs font-bold text-slate-400 tracking-widest mb-1">
                  {s.step}
                </div>
                <h3 className="font-bold text-xl text-slate-900">{s.title}</h3>
              </div>

              <p className="text-sm text-slate-600 mb-6 px-4 h-10">{s.desc}</p>

              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] max-w-[240px] rounded-2xl overflow-hidden shadow-md border-4 border-slate-100 group-hover:border-slate-200 transition-colors duration-300">
                <div className="absolute inset-0 bg-slate-50 flex items-center justify-center text-slate-200 font-bold text-4xl select-none">
                  {i + 1}
                </div>
                <Image
                  src={STEP_IMAGES[i] || "/placeholder-step.png"}
                  alt={`${s.title} のイメージ`}
                  fill
                  className="object-contain p-3 transition duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20 pt-8">
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              面倒な計算から解放されましょう
            </h3>
            <p className="text-slate-300 text-sm md:text-base">
              会員登録なしで、今すぐ無料で始められます。
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            {/* ボタンを白背景＋黒文字に変更してシックに */}
            <button
              onClick={() => router.push("/GroupCreation")}
              className="
                px-8 py-4 rounded-full bg-white text-slate-900 
                font-bold text-lg shadow-lg shadow-black/10
                hover:bg-slate-100 hover:scale-105
                transition-all duration-300
              "
            >
              無料で始める
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
