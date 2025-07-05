import {UserDto} from './UserDto';

export type GroupDto = {
  code: string;
  id: string;
  name: string;
  members: UserDto[];
};