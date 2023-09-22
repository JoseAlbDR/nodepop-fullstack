import { Request, Response, NextFunction } from 'express';
// import { verifyJWT } from '../utils/jwtUtils';
import { UnauthenticatedError, UnauthorizedError } from '../errors';
import { verifyJWT } from '../utils/jwtUtils';
import { ITokenPayload, Role } from '../types/authInterfaces';

const authenticateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { token } = req.signedCookies as Record<string, string>;

  if (!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const { userId, role, email } = verifyJWT(token) as ITokenPayload;
    req.user = { userId, role, email };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError('authentication invalid');
  }
};

const authorizePermissions = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { role } = req.user;
    if (!roles.includes(role))
      throw new UnauthorizedError('Unauthorized to view this route');
    next();
  };
};

export { authenticateUser, authorizePermissions };
