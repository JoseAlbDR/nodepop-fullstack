import mongoose from 'mongoose';
import _ from 'lodash';

import { Product } from '../models/Product';
import { IProduct, IUpdateProduct } from '../types/product-interfaces';
import { NotFoundError } from '../errors';

const productService = {
  getAllProducts: async () => {
    const results = await Product.find({}).sort('-createdAt');
    return results;
  },

  createProduct: async (product: IProduct) => {
    const result = await Product.create(product);

    return result;
  },

  getOneProduct: async (id: mongoose.Types.ObjectId) => {
    const result = await Product.findById(id);

    if (!result) throw new NotFoundError(`Product with id: ${id} not found`);

    return result;
  },

  updateProduct: async (
    id: mongoose.Types.ObjectId,
    updates: IUpdateProduct
  ) => {
    const result = Product.findByIdAndUpdate(id, updates, {
      runValidators: true,
      new: true,
    });

    if (!result) throw new NotFoundError(`Product with id: ${id} not found`);

    return result;
  },

  deleteProduct: async (id: mongoose.Types.ObjectId) => {
    const result = await Product.findByIdAndDelete(id);

    if (!result) throw new NotFoundError(`Product with id: ${id} not found`);

    return result;
  },

  getAllTags: async (): Promise<string[]> => {
    const result = await Product.find({});

    const uniqueTags = _.uniq(result.flatMap((item) => item.tags));

    return uniqueTags;
  },
};

export default productService;
