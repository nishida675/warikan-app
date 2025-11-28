const Footer = () => {
  return (
    <footer className="mt-12 border-t border-slate-100 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm md:text-base text-slate-600 whitespace-nowrap">
          © {new Date().getFullYear()} 割り勘アプリ — Split bills, simply
        </div>
        <div className="flex gap-6 text-base text-slate-600">
          <a>利用規約</a>
          <a>プライバシー</a>
          <a>お問い合わせ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
