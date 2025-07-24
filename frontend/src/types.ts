export type ApiErrorResponse = {
	timestamp: string;
	status: number;
	error: string;
	message: string;
	path: string;
	validationErrors: string[];
};

export type BillingDto = {
  payer: string;
  receiver: string;
  amount: number;
};

export type ExpenseDto = {
  id: string;
  amount: number;
  description: string;
  date: Date;
  groupCode: string;
  userId: string;
  user: UserDto;
};

export type GroupDto = {
  code: string;
  name: string;
  members: UserDto[];
};

export type UserDto = {
  id: string;
  name: string;
  groupCode: string;
  balance: number;
};