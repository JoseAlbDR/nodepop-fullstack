import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { IProduct } from '../types/productInterfaces';
import { randomBoolean } from '../utils/randomBoolean';
import { getRandomTags } from '../utils/randomTags';
import populateService from '../services/populateService';
import { StatusCodes } from 'http-status-codes';

export const populateController = {
  populateDatabase: async (req: Request, res: Response) => {
    const n = !isNaN(+req.params.n) ? +req.params.n : 10;

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
