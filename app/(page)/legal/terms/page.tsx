import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約',
};

const TermsPage = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          割り勘アプリ 利用規約
        </h1>

        <div className="prose lg:prose-xl mx-auto">
          <p className="mb-4">
            この利用規約（以下、「本規約」といいます。）は、[あなたの氏名または組織名]（以下、「当方」といいます。）が提供する割り勘アプリ「[アプリ名]」（以下、「本サービス」といいます。）の利用条件を定めるものです。本サービスをご利用になる皆様（以下、「ユーザー」といいます。）には、本規約に従って本サービスをご利用いただきます。
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">第1条（適用）</h2>
          <p>
            本規約は、ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">第2条（本サービスの利用）</h2>
          <ol className="list-decimal pl-6">
            <li>
              ユーザーは、本規約に同意することを条件として、本サービスを無料で利用することができます。
            </li>
            <li>
              本サービスは、複数人での支払いを容易に計算・管理するためのツールです。ユーザーは、自己の責任において本サービスを利用するものとします。
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-8 mb-4">第3条（禁止事項）</h2>
          <p>
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
          </p>
          <ul className="list-disc pl-6">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>当方のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
            <li>本サービスの運営を妨害するおそれのある行為</li>
            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
            <li>他のユーザーに成りすます行為</li>
            <li>反社会的勢力に対して直接または間接に利益を供与する行為</li>
            <li>その他、当方が不適切と判断する行為</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">第4条（免責事項）</h2>
          <ol className="list-decimal pl-6">
            <li>
              当方は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </li>
            <li>
              当方は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当方とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
            </li>
            <li>
              前項ただし書に定める場合であっても、当方は、当方の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当方またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-8 mb-4">第5条（知的財産権）</h2>
          <p>
            本サービスによって提供される情報、デザイン、ソフトウェア等に関する著作権その他の知的財産権は、当方または正当な権利を有する第三者に帰属します。
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">第6条（利用規約の変更）</h2>
          <p>
            当方は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">第7条（準拠法・裁判管轄）</h2>
          <ol className="list-decimal pl-6">
            <li>
              本規約の解釈にあたっては、日本法を準拠法とします。
            </li>
            <li>
              本サービスに関して紛争が生じた場合には、当方の本店所在地を管轄する裁判所を専属的合意管轄とします。
            </li>
          </ol>

          <p className="mt-8 text-right">以上</p>
          <p className="text-right">制定日: 2025年12月7日</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
