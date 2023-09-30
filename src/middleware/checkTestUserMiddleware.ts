import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '../errors';

export const checkTestUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.user.role === 'tester')
    throw new BadRequestError('Demo User. Read Only!');
  next();
};
