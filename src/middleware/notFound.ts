import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send(`Route ${req.url} not found`);
};

export default notFoundMiddleware;
