import { Response } from 'express';
import { faker } from '@faker-js/faker';
import { IProduct } from '../types/productInterfaces';
import { randomBoolean } from '../utils/randomBoolean';
import { getRandomTags } from '../utils/randomTags';
import populateService from '../services/populateService';
import { StatusCodes } from 'http-status-codes';

interface PopulateNumParam {
  params: { n: number };
}

export const populateController = {
  populateDatabase: async (req: PopulateNumParam, res: Response) => {
    const { n } = req.params;
    const products: IProduct[] = [];

    for (let i = 0; i < n; i++) {
      const name = faker.commerce.product();
      const image = faker.image.urlLoremFlickr({ category: name });
      const price = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
      const onSale = randomBoolean();
      const tags = getRandomTags(2);
      const product = {
        name,
        onSale,
        price,
        image,
        tags,
      };
      products.push(product);
    }

    const createdProducts = await populateService.populateDatabase(products);

    res.status(StatusCodes.CREATED).json({ products: createdProducts });
  },
};
