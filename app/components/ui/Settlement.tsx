
import { Settlement } from "@/app/components/type";

type Props = {
  settlements: Settlement[];
};

export default function SettlementList({ settlements }: Props) {
  if (settlements.length === 0) return null;

  return (
    <div className="mt-10 p-6 bg-white rounded-2xl shadow-md border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-4">清算方法</h3>

      <ul className="space-y-3">
        {settlements.map((s, i) => (
          <li key={i} className="flex justify-between text-slate-700">
            <span>
              <span className="font-semibold">{s.from}</span> →{" "}
              <span className="font-semibold">{s.to}</span>
            </span>
            <span className="font-bold">¥{s.amount.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
