import { AxiosResponse } from 'axios';

export type Role = 'admin' | 'user';

export interface IUser {
  name: string;
  email: string;
  lastName: string;
  location: string;
  role: Role;
}

export interface IUserData extends AxiosResponse {
  user: IUser;
}
