import mongoose from 'mongoose';
import { Product } from '../models/Product';
import { IProduct } from '../types/product-interfaces';
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
};

export default productService;
