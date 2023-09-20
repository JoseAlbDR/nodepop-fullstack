import { NextFunction, Request, Response } from 'express';
import { CustomAPIError } from '../errors/custom-error';
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ name: err.name, msg: err.message, stack: err.stack });
};

export default errorHandlerMiddleware;
