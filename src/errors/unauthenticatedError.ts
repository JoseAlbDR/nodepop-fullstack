import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customError';

export class UnauthenticatedError extends CustomAPIError {
  constructor(public message: string) {
    super('Unauthenticated', message, StatusCodes.UNAUTHORIZED);
  }
}
