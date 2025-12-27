import Link from "next/link";

const Footer = () => {
  return (
    <footer className="h-20 bg-slate-900 w-full flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm md:text-base text-white font-bold opacity-50 whitespace-nowrap">
          © {new Date().getFullYear()} 割り勘アプリ — Split bills, simply
        </div>
        <div className="flex gap-6 text-base text-white font-bold opacity-50">
          <Link href="/legal/terms">利用規約</Link>
          <Link href="/legal/privacy">プライバシーポリシー</Link>
          <Link href="https://forms.gle/5a4nXvqMVmbiLtgZA">お問い合わせ</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
