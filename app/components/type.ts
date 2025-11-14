export type CreateGroupResponse = {
  success: boolean;
  id?: string;
  error?: string;
};

export type Project = {
  id: string;
  name: string;
};

export type Member = {
  id: string;
  name: string;
};

export type Expense = {
  id: string;
  payerId: string;
  amount: number;
  description: string;
  participants: string[];
  createdAt?: string;
};