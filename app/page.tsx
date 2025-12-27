import Image from "next/image";
import { RecentGroupsSection } from "./components/ui/RecentGroupsSection";
import ButtonNavigate from "./components/ui/Button";

const HERO_IMAGE_URL = "/hero.png";
const STEP_IMAGES = ["/createGroup.png", "/expense.png", "/url.png"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFBEB] text-slate-900 font-sans tracking-tight leading-relaxed scroll-smooth relative overflow-hidden">
      
      {/* 背景のドット装飾 */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:30px_30px] opacity-50 -z-10" />
      
      {/* 浮遊する装飾パーツ */}
      <div className="absolute top-20 left-[5%] w-20 h-20 bg-yellow-300 rounded-full border-4 border-slate-900 -z-10 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute top-40 right-[10%] w-12 h-12 bg-cyan-300 border-4 border-slate-900 rotate-12 -z-10" />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-sm rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            ＼ 会員登録なしでスグ使える！ ／
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8">
            割り勘を、
            <br />
            <span className="relative inline-block text-orange-500 italic">
              もっと楽しく
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-200 -z-10" />
            </span>
            <br />
            スマートに。
          </h1>

          <p className="text-lg md:text-xl font-bold text-slate-700 mb-10 max-w-md leading-relaxed">
            面倒な計算は割り勘アプリにおまかせ！
            <br className="hidden md:block" />
            URLを送るだけで、パパッと清算完了。
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <ButtonNavigate
              href="/GroupCreation"
              className="
                px-10 py-5 rounded-2xl bg-[#FF6B35] text-white
                text-2xl font-black border-4 border-slate-900
                shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]
                active:translate-x-[8px] active:translate-y-[8px] active:shadow-none
                transition-all duration-100
              "
            >
              今すぐスタート！ 🚀
            </ButtonNavigate>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-cyan-400 rounded-[40px] border-4 border-slate-900 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
          <div className="bg-white p-4 rounded-[40px] border-4 border-slate-900 overflow-hidden shadow-xl">
            {HERO_IMAGE_URL ? (
              <Image
                src={HERO_IMAGE_URL}
                alt="hero"
                width={900}
                height={600}
                className="object-cover w-full h-[360px] md:h-[450px] rounded-[28px]"
                priority
              />
            ) : (
              <div className="w-full h-[360px] md:h-[450px] bg-slate-100 flex items-center justify-center">
                <span className="text-6xl text-slate-300">📱</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recent Groups Section (コンポーネント内もスタイルを合わせると◎) */}
      <div className="my-10 scale-95 md:scale-100 transform">
        <RecentGroupsSection />
      </div>

      {/* Feature Section */}
      <section className="bg-white border-y-8 border-slate-900 py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 underline decoration-yellow-400 decoration-8 underline-offset-8">
            割り勘アプリが選ばれる理由
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "アプリ不要！",
                desc: "ブラウザからURLを共有するだけ。友達にインストールをお願いする必要なし！",
                icon: "🌍",
                color: "bg-green-300",
              },
              {
                title: "自動で計算！",
                desc: "誰が誰にいくら払えばいいか、一瞬で答えが出ます。算数はもう不要。",
                icon: "🧮",
                color: "bg-purple-300",
              },
              {
                title: "誰でも使える！",
                desc: "超シンプルな画面設計。おじいちゃんもおばあちゃんも、これなら安心。",
                icon: "✨",
                color: "bg-pink-300",
              },
            ].map((f, i) => (
              <article
                key={i}
                className={`p-8 rounded-[32px] border-4 border-slate-900 ${f.color} shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-rotate-2 transition-transform`}
              >
                <div className="text-5xl mb-6">{f.icon}</div>
                <h3 className="font-black text-2xl mb-4 leading-tight">{f.title}</h3>
                <p className="font-bold text-slate-800 leading-relaxed text-sm">
                  {f.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How to use section */}
      <section id="how-to-use" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-center mb-16">
            <span className="text-4xl md:text-5xl font-black bg-slate-900 text-white px-8 py-3 rounded-full shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
              使いかた3ステップ
            </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "グループ作成", desc: "イベント名を入れるだけ！" },
            { step: "02", title: "金額を入力", desc: "立て替えた人をポチポチ選ぶ！" },
            { step: "03", title: "URLを共有", desc: "LINEで送って清算おわり！" },
          ].map((s, i) => (
            <div key={i} className="relative flex flex-col items-center group">
              <div className="absolute -top-6 -left-2 text-7xl font-black text-slate-900/10 -z-10 group-hover:text-orange-500/20 transition-colors">
                {s.step}
              </div>
              
              <div className="mb-8 w-full aspect-[4/5] rounded-[40px] border-4 border-slate-900 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden p-6 relative group-hover:rotate-2 transition-transform">
                <Image
                  src={STEP_IMAGES[i] || "/placeholder-step.png"}
                  alt={s.title}
                  fill
                  className="object-contain p-8"
                />
              </div>

              <h3 className="font-black text-2xl mb-2">{s.title}</h3>
              <p className="font-bold text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-yellow-300 rounded-[48px] border-8 border-slate-900 p-10 md:p-16 text-center relative shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute -top-12 -right-8 w-24 h-24 bg-orange-500 rounded-full border-4 border-slate-900 flex items-center justify-center text-4xl rotate-12">
            🔥
          </div>
          
          <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
            さあ、面倒な計算から<br />卒業しよう！
          </h3>
          
          <ButtonNavigate
            href="/GroupCreation"
            className="
              px-12 py-6 rounded-full bg-slate-900 text-white 
              font-black text-2xl shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]
              hover:scale-110 active:scale-95 transition-all
            "
          >
            無料で今すぐはじめる！ 👈
          </ButtonNavigate>
          
          <p className="mt-8 font-bold text-slate-700">
            登録不要・ずっと無料
          </p>
        </div>
      </section>
    </main>
  );
}