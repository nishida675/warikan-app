import { Member, Expense, Settlement } from "@/app/components/Type"; 


export function calculateSettlements(
  members: Member[],
  expenses: Expense[]
): Settlement[] {
  // 初期化: 各メンバーの収支
  const balance: Record<string, number> = {};
  members.forEach((m) => (balance[m.id] = 0));

  // 1. 実際に支払った額を加算
  expenses.forEach((exp) => {
    balance[exp.payerId] += exp.amount;
  });

  // 2. 割り勘額を各参加者から差し引く
  expenses.forEach((exp) => {
    const share = exp.amount / exp.participants.length;
    exp.participants.forEach((userId) => {
      balance[userId] -= share;
    });
  });

  // 3. プラス（受取側）とマイナス（支払側）に分ける
  const positives: { id: string; amount: number }[] = [];
  const negatives: { id: string; amount: number }[] = [];

  Object.entries(balance).forEach(([id, amount]) => {
    if (amount > 0) positives.push({ id, amount });
    else if (amount < 0) negatives.push({ id, amount: -amount }); // 正の値に変換
  });

  // 4. マッチングして "誰が誰にいくら払うか" を作る
  const settlements: Settlement[] = [];

  let i = 0,
    j = 0;

  while (i < negatives.length && j < positives.length) {
    const payer = negatives[i];
    const receiver = positives[j];
    const amount = Math.min(payer.amount, receiver.amount);

    settlements.push({
      from: members.find((m) => m.id === payer.id)?.name ?? "",
      to: members.find((m) => m.id === receiver.id)?.name ?? "",
      amount: Math.round(amount),
    });

    payer.amount -= amount;
    receiver.amount -= amount;

    if (payer.amount === 0) i++;
    if (receiver.amount === 0) j++;
  }

  return settlements;
}
