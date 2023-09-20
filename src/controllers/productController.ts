import { Request, Response } from 'express';
import productService from '../services/productService';
import { StatusCodes } from 'http-status-codes';
import { CreateProductDTO } from '../dto/create-product.dto';
import { GetOneProductDTO } from '../dto/get-one-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';

const productController = {
  getAllProducts: async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();

    res.status(StatusCodes.OK).json({ products });
  },

  createProduct: async (req: CreateProductDTO, res: Response) => {
    const product = await productService.createProduct(req.body);

    res.status(StatusCodes.OK).json(product);
  },

  getOneProduct: async (req: GetOneProductDTO, res: Response) => {
    const { id } = req.params;

    const product = await productService.getOneProduct(id);

    res.status(StatusCodes.OK).json(product);
  },

  updateProduct: async (req: UpdateProductDTO, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await productService.updateProduct(id, updates);

    res.status(StatusCodes.OK).json(updatedProduct);
  },

  deleteProduct: async (req: GetOneProductDTO, res: Response) => {
    const { id } = req.params;

    await productService.deleteProduct(id);

    res.status(StatusCodes.OK).json({ message: 'Success!' });
  },

  getAllTags: async (_req: Request, res: Response) => {
    const tags = await productService.getAllTags();

    res.status(StatusCodes.OK).json({ tags });
  },
};

export default productController;
