import { NextFunction, Request, Response } from 'express';
import { CustomAPIError } from '../errors/customError';
import { StatusCodes } from 'http-status-codes';
import { MongoError } from 'mongodb';

interface IDuplicateMongoError extends MongoError {
  keyValue: {
    [x: string]: string;
  };
}

const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);

  let msg, statusCode;

  // Custom errors
  if (err instanceof CustomAPIError) {
    statusCode = err.statusCode;
    msg = err.message;
  }

  // Duplicate UNIQUE email error
  if (err instanceof MongoError && err.code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    msg = `Duplicate value entered for ${Object.keys(
      (err as IDuplicateMongoError).keyValue
    ).join(', ')} please enter a valid value`;
  }

  // Check rest of errors
  return res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    name: err.name,
    msg: msg || 'Internal Server Error Try Again Later',
    stack: err.stack,
  });
};

export default errorHandlerMiddleware;
