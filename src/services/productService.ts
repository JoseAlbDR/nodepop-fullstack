// Packages
import _ from 'lodash';

// Model, interfaces
import { Product } from '../models/Product';
import { IProduct, IUpdateProduct } from '../types/productInterfaces';

// Errors
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

  getOneProduct: async (id: string) => {
    const result = await Product.findById(id);

    if (!result) throw new NotFoundError(`Product with id: ${id} not found`);

    return result;
  },

  updateProduct: async (id: string, updates: IUpdateProduct) => {
    const result = Product.findByIdAndUpdate(id, updates, {
      runValidators: true,
      new: true,
    });

    if (!result) throw new NotFoundError(`Product with id: ${id} not found`);

    return result;
  },

  deleteProduct: async (id: string) => {
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
