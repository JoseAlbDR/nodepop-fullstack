import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customError';

export class BadRequestError extends CustomAPIError {
  constructor(public message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
