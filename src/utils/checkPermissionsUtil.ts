import mongoose from 'mongoose';
import { ITokenPayload } from '../types/authInterfaces';
import { UnauthorizedError } from '../errors';

export const checkPermissions = (
  requestUser: ITokenPayload,
  resourceUserId: mongoose.Types.ObjectId
) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId) return;

  throw new UnauthorizedError('Not authorized to access this resource');
};
