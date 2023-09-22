import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

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

export interface ITokenPayload extends JwtPayload {
  userId: mongoose.Types.ObjectId;
  role: Role;
  email: string;
  iat: number;
  exp: number;
}

export type JWTPayload = {
  userId: mongoose.Types.ObjectId;
  role: Role;
  email: string;
};
