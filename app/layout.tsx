import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { GroupProvider } from "./components/provider/GroupProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "割り勘アプリ",
  description: "シンプルで使いやすい割り勘アプリです。",
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
            <GroupProvider>{children}</GroupProvider>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
