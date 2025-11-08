import { ReactNode } from "react";

const ExpenseCardHeader = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`mb-2 ${className}`}>{children}</div>;

export default ExpenseCardHeader;