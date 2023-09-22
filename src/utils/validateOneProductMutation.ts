import { JWTPayload } from './../types/authInterfaces';
import mongoose from 'mongoose';
import { BadRequestError, NotFoundError } from '../errors';
import { Product } from '../models/ProductModel';
import { Request } from 'express-validator/src/base';
import { checkPermissions } from './checkPermissionsUtil';

export const validateOneProductMutation = async (
  value: string,
  req: Request
) => {
  const isValid = mongoose.Types.ObjectId.isValid(value);

  if (!isValid) throw new BadRequestError(`${value} is not a valid MongoDB id`);

  const result = await Product.findById(value);

  if (!result) throw new NotFoundError(`Product with id: ${value} not found`);

  checkPermissions(req.user as JWTPayload, result.createdBy);
};
