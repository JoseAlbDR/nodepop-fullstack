import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MongoError } from 'mongodb';

import { CustomAPIError } from '../errors/customError';

/**
 * Error handling middleware for handling and formatting various errors.
 *
 * @param err     - The error object.
 * @param _req    - Express request object.
 * @param res     - Express response object.
 * @param _next   - Function to pass the request to the next middleware.
 */
const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err); // Log the error for debugging purposes.

  let msg, statusCode;

  // Handle custom errors
  if (err instanceof CustomAPIError) {
    statusCode = err.statusCode;
    msg = err.message;
  }

  // Handle duplicate UNIQUE email error in MongoDB
  if (err instanceof MongoError && err.code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    msg = `Email already exists. Please try another email.`;
  }

  // If the error is not custom or duplicate email, handle other errors.
  return res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    name: err.name,
    msg: msg || err.message || 'Internal Server Error. Try Again Later',
    stack: err.stack, // Include the error stack trace.
  });
};

export default errorHandlerMiddleware;
