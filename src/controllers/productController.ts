import { Request, Response } from 'express';
import productService from '../services/productService';
import { StatusCodes } from 'http-status-codes';

const productController = {
  getAllProducts: async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();

    res.status(StatusCodes.OK).json({ products });
  },
};

export default productController;
