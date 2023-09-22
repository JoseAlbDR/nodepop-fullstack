import mongoose from 'mongoose';
import { JWTPayload } from '../types/authInterfaces';
import { UnauthorizedError } from '../errors';

export const checkPermissions = (
  requestUser: JWTPayload,
  resourceUserId: mongoose.Types.ObjectId
) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId) return;

  throw new UnauthorizedError('Not authorized to access this resource');
};
