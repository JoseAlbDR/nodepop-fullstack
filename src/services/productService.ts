// Packages
import _ from 'lodash';

// Model, interfaces
import { Product } from '../models/ProductModel';
import { IProduct, IUpdateProduct } from '../types/productInterfaces';

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
    return result;
  },

  updateProduct: async (id: string, updates: IUpdateProduct) => {
    const result = Product.findByIdAndUpdate(id, updates, {
      runValidators: true,
      new: true,
    });
    return result;
  },

  deleteProduct: async (id: string) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
  },

  getAllTags: async (): Promise<string[]> => {
    const result = await Product.find({});
    const uniqueTags = _.uniq(result.flatMap((item) => item.tags));
    return uniqueTags;
  },
};

export default productService;
