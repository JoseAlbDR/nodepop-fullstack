import mongoose from 'mongoose';
import _ from 'lodash';

import { Product } from '../models/Product';
import { IProduct, IUpdateProduct } from '../types/product-interfaces';
import { NotFoundError } from '../errors';

const productService = {
  getAllProducts: async () => {
    const products = await Product.find({}).sort('-createdAt');
    return products;
  },

  createProduct: async (product: IProduct) => {
    const newProduct = await Product.create(product);

    return newProduct;
  },

  getOneProduct: async (id: mongoose.Types.ObjectId) => {
    const product = await Product.findById(id);

    if (!product) throw new NotFoundError(`Product with id: ${id} not found`);

    return product;
  },

  updateProduct: async (
    id: mongoose.Types.ObjectId,
    updates: IUpdateProduct
  ) => {
    const updatedProduct = Product.findByIdAndUpdate(id, updates, {
      runValidators: true,
      new: true,
    });

    if (!updatedProduct)
      throw new NotFoundError(`Product with id: ${id} not found`);

    return updatedProduct;
  },

  deleteProduct: async (id: mongoose.Types.ObjectId) => {
    const result = await Product.findByIdAndDelete(id);

    if (!result) throw new NotFoundError(`Product with id: ${id} not found`);

    return result;
  },

  getAllTags: async (): Promise<string[]> => {
    const products = await Product.find({});

    const uniqueTags = _.uniq(products.flatMap((product) => product.tags));

    return uniqueTags;
  },
};

export default productService;
