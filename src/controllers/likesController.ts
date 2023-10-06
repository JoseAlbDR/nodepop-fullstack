import { Response } from 'express';
import { AddLikeDTO } from '../dtos/addLikeDto';
import { StatusCodes } from 'http-status-codes';
import { Product } from '../models/ProductModel';
import { BadRequestError, NotFoundError } from '../errors';
import { Likes } from '../models/Likes';

export const likesController = {
  addLike: async (req: AddLikeDTO, res: Response) => {
    console.log(req.body);
    const { productId } = req.body;
    const { userId } = req.user;

    const isValidProduct = await Product.findOne({ _id: productId });

    if (!isValidProduct) throw new NotFoundError('Product not found');

    const alreadyLiked = await Likes.findOne({
      product: productId,
      user: userId,
    });

    if (alreadyLiked)
      throw new BadRequestError('Already liked for this product');

    const newLike = await Likes.create({ product: productId, user: userId });

    res.status(StatusCodes.OK).json({ newLike });
  },
};
