import { AxiosResponse } from 'axios';

export type Role = 'admin' | 'user';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  lastName: string;
  location: string;
  role: Role;
  avatar?: string;
}

export interface IUserData extends AxiosResponse {
  user: IUser;
}

export interface IUserResponse extends AxiosResponse {
  data: { user: IUser };
}
