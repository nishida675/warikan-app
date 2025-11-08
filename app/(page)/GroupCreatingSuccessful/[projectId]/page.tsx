"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Copy, Check } from "lucide-react";

const GroupCreatingSuccessfulPage = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const router = useRouter();
  const { projectId } = use(params);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/Group/${projectId}`);
  }, [projectId]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 text-center w-full max-w-xl">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          グループを作成しました 🎉
        </h1>
        <p className="text-slate-600 mb-6">
          以下のurlをコピーして共有してください。
        </p>
        <div className="flex items-center justify-between bg-slate-100 border border-slate-300 rounded-xl p-3 mb-6">
          <span className="font-mono text-sm text-slate-800">{shareUrl}</span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 border border-slate-700 rounded-lg hover:bg-slate-800/10 transition"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" strokeWidth={4} />
            ) : (
              <>
                <Copy className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        <button
          onClick={() => router.push(`/Group/${projectId}`)}
          className="
            w-full py-3 rounded-xl text-lg font-semibold
            border border-slate-800 text-slate-800 bg-transparent
            hover:bg-slate-800 hover:text-white
            transition-colors duration-200
          "
        >
          グループページへ進む
        </button>
      </div>
    </main>
  );
};

export default GroupCreatingSuccessfulPage;
