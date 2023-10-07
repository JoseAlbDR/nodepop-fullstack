import { Request, Response } from 'express';
import { AddLikeDTO } from '../dtos/addLikeDto';
import { StatusCodes } from 'http-status-codes';
import { likesService } from '../services/likesService';

export const likesController = {
  /**
   * Add a new like for a product.
   *
   * @param {Request} req - The HTTP request object containing like data.
   * @param {Response} res - The HTTP response object to send the response.
   */
  addLike: async (req: AddLikeDTO, res: Response) => {
    const { productId } = req.body;
    const { userId } = req.user;

    // Call the likesService to add a like for the product
    const newLike = await likesService.addLike(productId, userId);

    // Send a success response with a status code of 200 (OK) and the new like data
    res.status(StatusCodes.OK).json({ newLike });
  },

  /**
   * Delete a like for a product.
   *
   * @param {Request} req - The HTTP request object containing the product ID.
   * @param {Response} res - The HTTP response object to send the response.
   */
  deleteLike: async (req: Request, res: Response) => {
    const { id: productId } = req.params;

    // Call the likesService to delete a like for the product
    await likesService.deleteLike(productId, req.user);

    // Send a success response with a status code of 200 (OK)
    res.sendStatus(StatusCodes.OK);
  },
};
