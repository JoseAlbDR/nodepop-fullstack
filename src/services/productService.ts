import { Product } from '../models/Product';

const productService = {
  getAllProducts: async () => {
    const products = await Product.find({});
    return products;
  },
};

export default productService;
