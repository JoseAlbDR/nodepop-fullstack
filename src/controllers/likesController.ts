import { Response } from 'express';
import { AddLikeDTO } from '../dtos/addLikeDto';
import { StatusCodes } from 'http-status-codes';
import { likesService } from '../services/likesService';

export const likesController = {
  addLike: async (req: AddLikeDTO, res: Response) => {
    const { productId } = req.body;
    const { userId } = req.user;

    const newLike = await likesService.addLike(productId, userId);

    res.status(StatusCodes.OK).json({ newLike });
  },
};
