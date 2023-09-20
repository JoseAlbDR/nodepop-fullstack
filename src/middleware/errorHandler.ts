import { NextFunction, Request, Response } from 'express';
import { CustomAPIError } from '../errors/customError';
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);

  const statusCode =
    err instanceof CustomAPIError
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;

  const msg =
    'message' in err ? err.message : 'Internal Server Error Try Again Later';

  return res.status(statusCode).json({ name: err.name, msg, stack: err.stack });
};

export default errorHandlerMiddleware;
