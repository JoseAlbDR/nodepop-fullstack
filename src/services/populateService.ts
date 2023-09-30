import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { Product } from '../models/ProductModel';
import { IProduct } from '../types/productInterfaces';
import {
  getRandomBoolean,
  getRandomDateLast6Months,
  getRandomTags,
} from '../utils';

const populateService = {
  populateDatabase: async (n: number, userId: mongoose.Types.ObjectId) => {
    await Product.deleteMany({ createdBy: userId });

    const products: IProduct[] = [];

    for (let i = 0; i < n; i++) {
      const name = faker.commerce.product();
      const image = faker.image.urlLoremFlickr({
        width: 333,
        height: 250,
        category: name,
      });
      const price = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
      const onSale = getRandomBoolean();
      const tags = getRandomTags(Math.floor(Math.random() * 4) + 1);
      const createdAt = getRandomDateLast6Months();
      const product = {
        name,
        onSale,
        price,
        image,
        tags,
        createdBy: userId,
        createdAt,
      };
      products.push(product);
    }

    const createdProducts = await Product.insertMany(products);

    return createdProducts;
  },
};

export default populateService;
