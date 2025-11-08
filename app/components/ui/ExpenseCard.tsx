import { ReactNode } from "react";

const ExpenseCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-2xl p-4 border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

export default ExpenseCard;
