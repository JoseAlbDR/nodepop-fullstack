import { Request, Response, NextFunction } from 'express';
// import { verifyJWT } from '../utils/jwtUtils';
import { UnauthenticatedError } from '../errors';
import { verifyJWT } from '../utils/jwtUtils';
import { ITokenPayload } from '../types/authInterfaces';

export const authenticateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { token } = req.signedCookies as Record<string, string>;

  if (!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const { userId, role } = verifyJWT(token) as ITokenPayload;
    req.user = { userId, role };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError('authentication invalid');
  }
};
