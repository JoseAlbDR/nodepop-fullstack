import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customError';

export class NotFoundError extends CustomAPIError {
  constructor(public message: string) {
    super('Not Found', message, StatusCodes.NOT_FOUND);
  }
}
