import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/authInterfaces';

export const createJWT = (payload: JWTPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyJWT = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET);
