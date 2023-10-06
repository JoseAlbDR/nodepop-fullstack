import { Request, Response } from 'express';
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

  deleteLike: async (req: Request, res: Response) => {
    const { id: productId } = req.params;

    console.log('delete controller');

    await likesService.deleteLike(productId, req.user);

    res.sendStatus(StatusCodes.OK);
  },
};
