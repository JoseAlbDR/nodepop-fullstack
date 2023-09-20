import { Product } from '../models/Product';
import { IProduct } from '../types/product-interfaces';

const productService = {
  getAllProducts: async () => {
    const products = await Product.find({}).sort('-createdAt');
    return products;
  },

  createProduct: async (product: IProduct) => {
    const newProduct = await Product.create(product);

    return newProduct;
  },
};

export default productService;
