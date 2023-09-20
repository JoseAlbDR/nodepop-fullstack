// Packages
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Services
import productService from '../services/productService';

// DTOS, Interfaces
import { CreateProductDTO } from '../dto/createProduct';
import { UpdateProductDTO } from '../dto/updateProduct';
import { ProductIDParam } from '../types/productInterfaces';

const productController = {
  getAllProducts: async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();

    res.status(StatusCodes.OK).json({ products });
  },

  createProduct: async (req: CreateProductDTO, res: Response) => {
    const product = await productService.createProduct(req.body);

    res.status(StatusCodes.CREATED).json({ msg: 'product created', product });
  },

  getOneProduct: async (req: ProductIDParam, res: Response) => {
    const { id } = req.params;

    const product = await productService.getOneProduct(id);

    res.status(StatusCodes.OK).json({ product });
  },

  updateProduct: async (req: UpdateProductDTO, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await productService.updateProduct(id, updates);

    res
      .status(StatusCodes.OK)
      .json({ msg: 'product updated', product: updatedProduct });
  },

  deleteProduct: async (req: ProductIDParam, res: Response) => {
    const { id } = req.params;

    const removedProduct = await productService.deleteProduct(id);

    res
      .status(StatusCodes.OK)
      .json({ msg: 'product deleted', product: removedProduct });
  },

  getAllTags: async (_req: Request, res: Response) => {
    const tags = await productService.getAllTags();

    res.status(StatusCodes.OK).json({ tags });
  },
};

export default productController;
