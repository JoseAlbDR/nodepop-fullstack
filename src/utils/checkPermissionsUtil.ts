import mongoose from 'mongoose';

import { JWTPayload } from '../types/authInterfaces';
import { UnauthorizedError } from '../errors';

export const checkPermissions = (
  requestUser: JWTPayload,
  resourceUserId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  // console.log(requestUser.userId === resourceUserId);

  if (requestUser.role === 'admin') return;

  // Check if the user created the resourze
  const userId = resourceUserId as mongoose.Types.ObjectId;
  if (requestUser.userId.toString() === userId.toString()) return;

  throw new UnauthorizedError('Not authorized to access this resource');
};
