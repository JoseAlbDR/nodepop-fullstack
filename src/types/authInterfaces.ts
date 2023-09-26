import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

export type Role = 'admin' | 'user' | 'tester';

export interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: Role;
  avatar?: string;
}

export type ILoginUser = Omit<IUser, 'name' | 'lastName' | 'location' | 'role'>;

export interface ITokenPayload extends JwtPayload {
  userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  role: Role;
  email: string;
  iat: number;
  exp: number;
}

export type JWTPayload = {
  userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  role: Role;
  email: string;
};
