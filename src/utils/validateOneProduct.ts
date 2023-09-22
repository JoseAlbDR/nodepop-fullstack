import mongoose from 'mongoose';
import { BadRequestError, NotFoundError } from '../errors';
import { Product } from '../models/ProductModel';

export const validateOneProductPatchDelete = async (value: string) => {
  const isValid = mongoose.Types.ObjectId.isValid(value);

  if (!isValid) throw new BadRequestError(`${value} is not a valid MongoDB id`);

  const result = await Product.findById(value);

  if (!result) throw new NotFoundError(`Product with id: ${value} not found`);
};
