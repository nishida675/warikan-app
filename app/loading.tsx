const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* スピナー */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
      </div>

      {/* テキスト */}
      <p className="mt-6 text-slate-700 text-lg font-medium tracking-wide">
        読み込み中...
      </p>
    </div>
  );
};

export default Loading;
