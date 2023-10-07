import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import populateService from '../services/populateService';

export const populateController = {
  /**
   * Populate the database with a specified number of products.
   *
   * @param {Request} req - The HTTP request object containing the number of products to create.
   * @param {Response} res - The HTTP response object to send the response.
   */
  populateDatabase: async (req: Request, res: Response) => {
    // Parse the 'n' parameter from the request, defaulting to 10 if not provided or invalid
    const n = !isNaN(+req.params.n) ? +req.params.n : 10;

    // Extract the user ID from the request
    const { userId } = req.user;

    // Call the populateService to populate the database with products
    const createdProducts = await populateService.populateDatabase(n, userId);

    // Send a success response with a status code of 201 (Created) and the created products
    res.status(StatusCodes.CREATED).json({ products: createdProducts });
  },
};
