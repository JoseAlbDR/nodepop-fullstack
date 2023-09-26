import { Request, Response } from 'express';

import populateService from '../services/populateService';
import { StatusCodes } from 'http-status-codes';

export const populateController = {
  populateDatabase: async (req: Request, res: Response) => {
    const n = !isNaN(+req.params.n) ? +req.params.n : 10;
    const { userId } = req.user;

    const createdProducts = await populateService.populateDatabase(n, userId);

    res.status(StatusCodes.CREATED).json({ products: createdProducts });
  },
};
