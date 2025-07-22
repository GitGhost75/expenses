import { UserDto } from "./UserDto";

export type ExpenseDto = {
  id: string;
  amount: number;
  description: string;
  date: Date;
  groupCode: string;
  userId: string;
  user: UserDto;
};