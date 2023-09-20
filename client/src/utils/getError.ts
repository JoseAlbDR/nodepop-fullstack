import { isRouteErrorResponse } from 'react-router-dom';
import { IError } from '../types/ErrorTypes';

export const getError = (error: unknown): IError => {
  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    return {
      msg: error.statusText,
      status: error.status,
    };
  } else if (error instanceof Error) {
    return { msg: error.message };
  } else if (typeof error === 'string') {
    return { msg: error };
  } else {
    console.error(error);
    return { msg: 'Unknown error' };
  }
};
