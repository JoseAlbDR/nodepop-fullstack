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
  /**
   * Populate the database with randomly generated products for a user.
   *
   * @param {number} n - The number of products to generate and insert into the database.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user associated with the products.
   * @returns {Promise<IProduct[]>} An array of the created products.
   */
  populateDatabase: async (n: number, userId: mongoose.Types.ObjectId) => {
    // Delete existing products created by the user
    await Product.deleteMany({ createdBy: userId });

    const products: IProduct[] = [];

    // Generate and add 'n' products to the array
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
        numOfLikes: 0,
      };
      products.push(product);
    }

    // Insert the generated products into the database
    const createdProducts = await Product.insertMany(products);

    return createdProducts;
  },
};

export default populateService;
