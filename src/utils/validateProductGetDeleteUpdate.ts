import mongoose from 'mongoose';
import { JWTPayload } from '../types/authInterfaces';
import { BadRequestError, NotFoundError } from '../errors';
import { Product } from '../models/ProductModel';
import { Request } from 'express-validator/src/base';
import { checkPermissions } from './checkPermissionsUtil';

/**
 * Validate a product's ID for get, delete, or update operations.
 *
 * @param {string} value - The product ID to validate.
 * @param {Request} req - The Express request object containing user information.
 * @throws {BadRequestError} Throws a BadRequestError if the ID is invalid.
 * @throws {NotFoundError} Throws a NotFoundError if the product is not found.
 */
export const validateProductGetDeleteUpdate = async (
  value: string,
  req: Request
) => {
  // Check if the provided ID is a valid MongoDB ObjectId
  const isValid = mongoose.Types.ObjectId.isValid(value);

  if (!isValid) {
    throw new BadRequestError(`Invalid MongoDB id`);
  }

  // Find the product by its ID
  const result = await Product.findById(value);

  if (!result) {
    throw new NotFoundError(`Product not found`);
  }

  // Check permissions to ensure the user can access the product
  checkPermissions(req.user as JWTPayload, result.createdBy!);
};
