import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customError';

export class UnauthorizedError extends CustomAPIError {
  constructor(public message: string) {
    super('Unauthorized', message, StatusCodes.FORBIDDEN);
  }
}
