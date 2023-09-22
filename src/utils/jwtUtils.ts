import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Role } from '../types/authInterfaces';

type JWTPayload = { userId: mongoose.Types.ObjectId; role: Role };

export const createJWT = (payload: JWTPayload) => {
  const token = jwt.sign(payload, 'secret', {
    expiresIn: '1d',
  });

  return token;
};
