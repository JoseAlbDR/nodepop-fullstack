// Packages
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Services
import productService from '../services/productService';

// DTOS, Interfaces
import { CreateProductDTO } from '../dto/createProductDto';
import { UpdateProductDTO } from '../dto/updateProductDto';

const productController = {
  getAllProducts: async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();

    res.status(StatusCodes.OK).json({ products });
  },

  getUserProdcuts: async (req: Request, res: Response) => {
    const products = await productService.getUserProducts(req.user.userId);

    res.status(StatusCodes.OK).json({ products });
  },

  createProduct: async (req: CreateProductDTO, res: Response) => {
    req.body.createdBy = req.user.userId;
    const product = await productService.createProduct(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'product created', product });
  },

  getOneProduct: async (req: Request, res: Response) => {
    console.log({ id: req.params.id });
    const product = await productService.getOneProduct(req.params.id);

    res.status(StatusCodes.OK).json({ product });
  },

  updateProduct: async (req: UpdateProductDTO, res: Response) => {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );

    res
      .status(StatusCodes.OK)
      .json({ msg: 'product updated', product: updatedProduct });
  },

  deleteProduct: async (req: Request, res: Response) => {
    const removedProduct = await productService.deleteProduct(req.params.id);

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
