import mongoose from 'mongoose';
import productService from '../services/productService';
import { IProductQuery } from '../types/queryInterfaces';

/**
 * Build a MongoDB query object and execute the query based on the provided query parameters.
 *
 * @param {IProductQuery} queryParams - The query parameters for filtering, sorting, and pagination.
 * @param {mongoose.Types.ObjectId} userId - (Optional) The user ID for filtering user-specific products.
 * @returns {object} An object containing the query result, query object, page, and limit.
 */
export const getQueryParams = (
  queryParams: IProductQuery,
  userId?: mongoose.Types.ObjectId
) => {
  const { name, tags, onSale, price, sort } = queryParams;

  let { page, limit } = queryParams;
  const queryObject: IProductQuery = {};

  // Filter by name
  if (name && typeof name === 'string') {
    queryObject.name = {
      $regex: name,
      $options: 'i',
    };
  }

  // Filter by tag
  if (tags && typeof tags === 'string' && tags !== 'all') {
    const tagArray = tags.split(',');
    queryObject.tags = {
      $in: tagArray,
    };
  }

  // Filter by sale type
  if (onSale && typeof onSale === 'string' && onSale !== 'all') {
    queryObject.onSale = onSale === 'on sale' ? true : false;
  }

  // Filter by price
  if (price && typeof price === 'string') {
    const [min, max] = price.split('-');
    if (min && max) queryObject.price = { $gte: min, $lte: max };
    if (price.startsWith('-')) queryObject.price = { $lte: max };
    if (price.endsWith('-')) queryObject.price = { $gte: min };
    if (max === undefined) queryObject.price = { $eq: min };
  }

  // Retrieve products based on user ID or all products
  let result = userId
    ? productService.getUserProducts(userId, queryObject)
    : productService.getAllProducts(queryObject);

  // Sort results
  if (sort) {
    switch (sort) {
      case 'oldest':
        result = result.sort('createdAt');
        break;
      case 'newest':
        result = result.sort('-createdAt');
        break;
      case 'a-z':
        result = result.sort('name');
        break;
      case 'z-a':
        result = result.sort('-name');
        break;
      case 'lowest':
        result = result.sort('price');
        break;
      case 'highest':
        result = result.sort('-price');
        break;
      default:
        result = result.sort('createdAt');
    }
  } else {
    result = result.sort('-createdAt');
  }

  // Pagination
  page = +page! || 1;
  limit = +limit! || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  return { result, queryObject, page, limit };
};
