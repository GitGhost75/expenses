import { UserDto } from './UserDto';

export type GroupDto = {
  code: string;
  name: string;
  members: UserDto[];
};