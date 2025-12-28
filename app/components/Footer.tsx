import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-900 w-full">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm md:text-base text-white font-bold opacity-50 text-center md:text-left">
          © {new Date().getFullYear()} 割り勘アプリ — Split bills, simply
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-white font-bold opacity-50">
          <Link href="/legal/terms">利用規約</Link>
          <Link href="/legal/privacy">プライバシーポリシー</Link>
          <Link
            href="https://forms.gle/5a4nXvqMVmbiLtgZA"
            target="_blank"
            rel="noopener noreferrer"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
