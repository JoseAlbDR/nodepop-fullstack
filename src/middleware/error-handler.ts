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
    res.status(err.statusCode).json({ msg: err.message });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleware;
