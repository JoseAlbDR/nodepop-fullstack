import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '../errors';

/**
 * Middleware to check if the user is a tester and restrict access.
 *
 * @param req     - Express request object.
 * @param _res    - Express response object.
 * @param next    - Function to pass the request to the next middleware.
 */
export const checkTestUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Check if the user's role is 'tester.'
  if (req.user.role === 'tester')
    throw new BadRequestError('Demo User. Read Only!');

  // If not a tester, allow access and continue to the next middleware or route.
  next();
};
