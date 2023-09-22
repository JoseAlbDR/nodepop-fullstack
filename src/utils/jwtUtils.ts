import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Role } from '../types/authInterfaces';

type JWTPayload = {
  userId: mongoose.Types.ObjectId;
  role: Role;
  email: string;
};

export const createJWT = (payload: JWTPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyJWT = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET);
