import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { GroupProvider } from "./components/provider/GroupProvider";
import { ExpenseProvider } from "./components/provider/ExpenseProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// サイトのベースURL（本番環境のドメインに変更してください）
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://warikanapp.vercel.app/";
const SITE_NAME = "割り勘アプリ";
const SITE_DESCRIPTION = "面倒な割り勘計算を数秒で完了。会員登録不要・アプリインストール不要。旅行、BBQ、飲み会、イベントの立替費用をURL共有だけでスマートに精算できる無料のWebアプリです。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  
  // タイトル設定
  title: {
    default: "割り勘アプリ",
    template: `%s | ${SITE_NAME}`,
  },

  // 説明文（検索結果に表示される文章）
  description: SITE_DESCRIPTION,

  // キーワード（Googleは重視しませんが、一部の検索エンジンやディレクトリ登録用）
  keywords: [
    "割り勘", 
    "割り勘アプリ", 
    "精算", 
    "立替", 
    "登録不要", 
    "インストール不要", 
    "旅行", 
    "計算", 
    "ワリカ", 
    "Walica"
  ],

  // 作者・クリエイター情報
  authors: [{ name: "Walican Team" }],
  creator: "Walican Team",

  // ロボット（検索エンジンのクロール設定）
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // OGP設定（LINEやX、Slackでシェアされた時の見た目）※超重要
  openGraph: {
    title: "Walican | 登録不要のスマート割り勘アプリ",
    description: "旅行や飲み会の面倒な精算を、リンクを送るだけで解決。誰が誰にいくら払うか自動計算します。",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png", // publicフォルダに配置するOGP画像（1200x630推奨）
        width: 1200,
        height: 630,
        alt: "Walican - スマート割り勘アプリ",
      },
    ],
  },
  
  // カノニカルURL（重複コンテンツ防止）
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-center w-full min-h-screen bg-gray-50">
          <div className="flex flex-col justify-between w-full max-w-[768px] min-h-screen bg-white shadow-lg">
            <Header />
            <GroupProvider>
              <ExpenseProvider>{children}</ExpenseProvider>
            </GroupProvider>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
