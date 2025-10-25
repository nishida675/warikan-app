"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const HERO_IMAGE_URL = ""; // 必要に応じて画像URLを指定

const STEP_IMAGES = [
  "/images/step1.png",
  "/images/step2.png",
  "/images/step3.png",
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans tracking-wide leading-relaxed scroll-smooth">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-sm inline-block mb-8 px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-medium">
            会員登録不要・ブラウザで完結
          </div>

          <h1 className="text-5xl font-bold tracking-tight leading-[1.3] text-slate-900">
            旅行や食事の立て替えを、
            <br className="hidden sm:block" />
            スマートに清算
          </h1>

          <p className="mt-8 text-lg text-slate-600">
            Walicaは複数人の割り勘を直感的に管理できるウェブアプリです。
            アプリ不要、リンクを共有するだけで清算が完了します。
          </p>

          {/* 枠線ボタン */}
          <div className="mt-12 flex gap-4">
            <button
              onClick={() => router.push("/GroupCreation")}
              className="
      px-8 py-3 rounded-md border border-slate-800 text-slate-800 
      font-semibold bg-transparent
      hover:bg-slate-800 hover:text-white
      transition-all duration-300 ease-out
    "
            >
              今すぐ始める
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 text-base text-slate-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-slate-100 flex items-center justify-center shadow-inner text-xl">
                ⚡
              </div>
              <div>
                <div className="font-semibold">登録不要</div>
                <div className="text-sm text-slate-500">リンク共有で完了</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-slate-100 flex items-center justify-center shadow-inner text-xl">
                🔒
              </div>
              <div>
                <div className="font-semibold">安心・安全</div>
                <div className="text-sm text-slate-500">データは暗号化</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          {HERO_IMAGE_URL ? (
            <div className="w-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src={HERO_IMAGE_URL}
                alt="hero"
                width={900}
                height={600}
                className="object-cover w-full h-[480px]"
              />
            </div>
          ) : (
            <div className="w-full h-[480px] rounded-2xl bg-gradient-to-tr from-slate-50 via-white to-slate-100 border border-slate-200 shadow-inner flex items-center justify-center">
              <svg
                width="200"
                height="150"
                viewBox="0 0 200 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="8"
                  y="8"
                  width="184"
                  height="134"
                  rx="14"
                  fill="#ffffff"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M16 120L48 78L80 104L118 54L168 120H16Z"
                  fill="#f1f5f9"
                />
              </svg>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-32">
          <h2 className="text-3xl font-semibold mb-16 text-center text-slate-900">
            主な特徴
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "ブラウザで完結",
                desc: "アプリ不要、リンクを共有するだけで清算完了。",
              },
              {
                title: "自動計算",
                desc: "だれがいくら払うかを自動で計算。面倒な計算は不要。",
              },
              {
                title: "シンプル設計",
                desc: "迷わず使える直感的な操作画面。",
              },
            ].map((f, i) => (
              <article
                key={i}
                className="p-10 rounded-2xl shadow-sm bg-white border border-slate-200 hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-md bg-slate-800 text-white flex items-center justify-center font-semibold mb-6 text-lg">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-xl mb-3 text-slate-900">
                  {f.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-to-use" className="max-w-5xl mx-auto px-6 py-32">
        <h2 className="text-3xl font-semibold mb-20 text-center text-slate-900">
          使い方
        </h2>

        <div className="flex flex-col gap-20">
          {[
            {
              step: "1",
              title: "グループを作成",
              desc: "旅行や飲み会のグループを作成します。",
            },
            {
              step: "2",
              title: "立て替えを記録",
              desc: "誰がいくら立て替えたかを入力します。",
            },
            {
              step: "3",
              title: "リンク共有で清算",
              desc: "メンバーにリンクを送って清算完了。",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-8 p-10 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold text-xl">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-2xl mb-2 text-slate-900">
                    {s.title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-inner bg-slate-100 border border-slate-200">
                <Image
                  src={STEP_IMAGES[i] || "/placeholder-step.png"}
                  alt={`${s.title} のイメージ`}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="rounded-2xl p-12 bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-bold">今日から試す — 無料で簡単</h3>
            <p className="mt-3 text-lg text-slate-100/90">
              グループを作って、すぐに割り勘を終わらせましょう。
            </p>
          </div>
          <div className="flex gap-4">
            {/* CTAも白抜きボタン */}
            <button
              onClick={() => router.push("/GroupCreation")}
              className="px-8 py-3 rounded-md border border-white text-white font-semibold hover:bg-white/10 transition"
            >
              始める
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
