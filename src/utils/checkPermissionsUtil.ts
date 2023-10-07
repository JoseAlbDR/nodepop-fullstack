import mongoose from 'mongoose';

import { JWTPayload } from '../types/authInterfaces';
import { UnauthorizedError } from '../errors';

/**
 * Check if the user has permissions to access a resource.
 *
 * @param {JWTPayload} requestUser - The user making the request (from JWT).
 * @param {mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>} resourceUserId - The user ID associated with the resource.
 * @throws {UnauthorizedError} Throws an error if the user is not authorized to access the resource.
 */
export const checkPermissions = (
  requestUser: JWTPayload,
  resourceUserId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
) => {
  // Allow admin users unrestricted access
  if (requestUser.role === 'admin') return;

  // Check if the user created the resource
  const userId = resourceUserId as mongoose.Types.ObjectId;
  if (requestUser.userId.toString() === userId.toString()) return;

  // If neither admin nor resource owner, throw unauthorized error
  throw new UnauthorizedError('Not authorized to access this resource');
};
