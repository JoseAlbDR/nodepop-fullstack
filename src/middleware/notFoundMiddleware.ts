import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Middleware function for handling route not found errors.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: `Route ${req.url} not found` });
};

export default notFoundMiddleware;
