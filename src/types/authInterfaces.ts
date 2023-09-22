export type Role = 'admin' | 'user';

export interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: Role;
}

export type ILoginUser = Omit<IUser, 'name' | 'lastName' | 'location' | 'role'>;
