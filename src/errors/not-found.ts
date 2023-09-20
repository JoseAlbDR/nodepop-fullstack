import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './custom-error';

export class NotFoundError extends CustomAPIError {
  constructor(public message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
