import { Request, Response, NextFunction } from 'express';

import { UnauthenticatedError, UnauthorizedError } from '../errors';
import { verifyJWT } from '../utils';
import { ITokenPayload, Role } from '../types/authInterfaces';

/**
 * Middleware to authenticate users based on JWT tokens.
 *
 * @param req     - Express request object.
 * @param _res    - Express response object.
 * @param next    - Function to pass the request to the next middleware.
 */
const authenticateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Extract the JWT token from signed cookies.
  const { token } = req.signedCookies as Record<string, string>;

  // If there is no token present, throw an UnauthenticatedError.
  if (!token) throw new UnauthenticatedError('Invalid authentication');

  try {
    // Verify and decode the JWT token.
    const { userId, role, email } = verifyJWT(token) as ITokenPayload;

    // Attach user information to the request object for later use.
    req.user = { userId, role, email };
    next();
  } catch (error) {
    console.log(error);
    // If there is an error during token verification, throw an UnauthenticatedError.
    throw new UnauthenticatedError('Invalid authentication');
  }
};

/**
 * Middleware to authorize users based on their roles.
 *
 * @param roles  - List of allowed roles that can access the route or middleware.
 */
const authorizePermissions = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    // Extract the user's role from the request object.
    const { role } = req.user;

    // Check if the user's role is included in the allowed roles.
    if (!roles.includes(role))
      throw new UnauthorizedError('Unauthorized to view this page');

    // If the role is allowed, continue to the next middleware or route.
    next();
  };
};

export { authenticateUser, authorizePermissions };
