"use client";

import Image from "next/image";
import React from "react";

const HERO_IMAGE_URL = "";

const STEP_IMAGES = [
  "/images/step1.png", // グループ作成
  "/images/step2.png", // 立て替え入力
  "/images/step3.png", // 清算共有
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth overflow-visible">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-base inline-block mb-6 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-medium shadow-sm">
            会員登録不要・ブラウザで完結
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">
            旅行や食事の立て替えを、スマートに清算
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Walicaは複数人の割り勘を直感的に管理できるウェブアプリです。アプリ不要、リンクを共有するだけで清算が完了します。
          </p>

          <div className="mt-10 flex gap-4">
            <button className="px-8 py-4 rounded-lg shadow-md bg-indigo-600 text-white font-medium hover:scale-[1.02] transform transition text-lg">
              今すぐ始める
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 text-lg text-slate-700">
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
            <div className="w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={HERO_IMAGE_URL}
                alt="hero"
                width={900}
                height={600}
                className="object-cover w-full h-[480px]"
              />
            </div>
          ) : (
            <div className="w-full h-[480px] rounded-3xl bg-gradient-to-tr from-indigo-50 via-white to-fuchsia-50 border border-slate-100 shadow-inner flex items-center justify-center">
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
                  stroke="#e6e6f0"
                  strokeWidth="2"
                />
                <path
                  d="M16 120L48 78L80 104L118 54L168 120H16Z"
                  fill="#eef2ff"
                />
              </svg>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-semibold mb-12">主な特徴</h2>
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
              { title: "シンプル設計", desc: "迷わず使える直感的な操作画面。" },
            ].map((f, i) => (
              <article
                key={i}
                className="p-10 rounded-2xl shadow-md bg-white border border-slate-100 hover:shadow-xl transition"
              >
                <div className="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold mb-6 text-2xl">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-xl mb-3">{f.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-to-use" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold mb-16 text-center">使い方</h2>

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
              className="flex flex-col items-center text-center gap-8 p-10 rounded-3xl border bg-white shadow-md hover:shadow-xl transition"
            >
              {/* ステップ番号とタイトル */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-2xl shadow-md">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-2xl mb-2">{s.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* イメージ画像（横いっぱい） */}
              <div className="relative w-full h-72 rounded-3xl overflow-hidden shadow-inner bg-slate-100">
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
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="rounded-3xl p-12 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-bold">今日から試す — 無料で簡単</h3>
            <p className="mt-3 text-lg text-slate-100/90">
              グループを作って、すぐに割り勘を終わらせましょう。
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 rounded-lg bg-white text-indigo-700 font-semibold text-lg">
              始める
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
