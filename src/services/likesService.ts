import mongoose from 'mongoose';
import { Product } from '../models/ProductModel';
import { BadRequestError, NotFoundError } from '../errors';
import { Likes } from '../models/Likes';

export const likesService = {
  addLike: async (
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) => {
    const isValidProduct = await Product.findOne({ _id: productId });

    if (!isValidProduct) throw new NotFoundError('Product not found');

    const alreadyLiked = await Likes.findOne({
      product: productId,
      user: userId,
    });

    if (alreadyLiked) throw new BadRequestError('Already liked this product');

    const newLike = await Likes.create({ product: productId, user: userId });
    return newLike;
  },
};
