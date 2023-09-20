import { Request, Response } from 'express';
import productService from '../services/productService';
import { StatusCodes } from 'http-status-codes';
import { CreateProductDTO } from '../dto/create-product.dto';

const productController = {
  getAllProducts: async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();

    res.status(StatusCodes.OK).json({ products });
  },

  createProduct: async (req: CreateProductDTO, res: Response) => {
    const product = await productService.createProduct(req.body);

    res.status(StatusCodes.OK).json(product);
  },
};

export default productController;
