import { UserDto } from "./UserDto";

export type BillingDto = {
  payer: string;
  receiver: string;
  amount: number;
};