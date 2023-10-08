import mongoose from 'mongoose';
import { Product } from '../models/ProductModel';
import { BadRequestError, NotFoundError } from '../errors';
import { Likes } from '../models/Likes';
import { JWTPayload } from '../types/authInterfaces';

export const likesService = {
  /**
   * Add a like to a product from a user.
   *
   * @param {mongoose.Types.ObjectId} productId - The ID of the product to like.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user who is adding the like.
   * @returns {Promise<Likes>} The newly created like.
   * @throws {NotFoundError} Throws an error if the product is not found.
   * @throws {BadRequestError} Throws an error if the user has already liked the product.
   */
  addLike: async (
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) => {
    // Check if the product exists
    const isValidProduct = await Product.findOne({ _id: productId });

    if (!isValidProduct) throw new NotFoundError('Product not found');

    // Check if the user has already liked the product
    const alreadyLiked = await Likes.findOne({
      product: productId,
      user: userId,
    });

    if (alreadyLiked) throw new BadRequestError('Already liked this product');

    // Create a new like and return it
    const newLike = await Likes.create({ product: productId, user: userId });
    return newLike;
  },

  /**
   * Delete a like for a product by a user.
   *
   * @param {string} productId - The ID of the product to unlike.
   * @param {JWTPayload} user - The authenticated user who is removing the like.
   * @returns {Promise<boolean>} `true` if the like is deleted successfully.
   * @throws {NotFoundError} Throws an error if the like is not found.
   */
  deleteLike: async (productId: string, user: JWTPayload) => {
    // Find the like associated with the product and user
    const like = await Likes.findOne({
      product: productId,
      user: user.userId,
    });

    if (!like) throw new NotFoundError('Too many clicks ANSIAS');

    // Delete the like and return `true` to indicate success
    await like.deleteOne();

    return true;
  },
};
