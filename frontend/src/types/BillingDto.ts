import { UserDto } from "./UserDto";

export type BillingDto = {
  payer: UserDto;
  receiver: UserDto;
  amount: number;
};