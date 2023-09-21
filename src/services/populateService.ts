import { Product } from '../models/Product';
import { IProduct } from '../types/productInterfaces';

const populateService = {
  populateDatabase: async (products: IProduct[]) => {
    await Product.deleteMany();

    const createdProducts = await Product.insertMany(products);

    return createdProducts;
  },
};

export default populateService;