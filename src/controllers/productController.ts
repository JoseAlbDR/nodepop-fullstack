// Packages
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Services
import productService from '../services/productService';

// DTOS, Interfaces
import { CreateProductDTO } from '../dtos/createProductDto';
import { UpdateProductDTO } from '../dtos/updateProductDto';
import { deleteFile, getImagePath } from '../utils';

const productController = {
  getAllProducts: async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();

    res.status(StatusCodes.OK).json({ products });
  },

  getUserProducts: async (req: Request, res: Response) => {
    const products = await productService.getUserProducts(req.user.userId);

    res.status(StatusCodes.OK).json({ products });
  },

  createProduct: async (req: CreateProductDTO, res: Response) => {
    req.body.createdBy = req.user.userId;

    console.log(req.body.tags);

    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT;
    const filePath = req.file!.path;

    const image = getImagePath(protocol, host, port, filePath, 'products');

    const product = await productService.createProduct({ ...req.body, image });
    res.status(StatusCodes.CREATED).json({ msg: 'product created', product });
  },

  getOneProduct: async (req: Request, res: Response) => {
    const product = await productService.getOneProduct(req.params.id);

    res.status(StatusCodes.OK).json({ product });
  },

  updateProduct: async (req: UpdateProductDTO, res: Response) => {
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT;
    const filePath = req.file!.path;

    // Generate image path to store in server
    const image = getImagePath(protocol, host, port, filePath, 'products');

    // Delete Previous image
    const product = await productService.getOneProduct(req.params.id);
    // Check if image is from populate (not uploaded in server)
    if (!product?.image.startsWith('https')) {
      const imagePath = product?.image.split('/').at(-1);
      if (imagePath) await deleteFile(imagePath);
    }

    // Update product
    const updatedProduct = await productService.updateProduct(req.params.id, {
      ...req.body,
      image,
    });

    res
      .status(StatusCodes.OK)
      .json({ msg: 'product updated', product: updatedProduct });
  },

  deleteProduct: async (req: Request, res: Response) => {
    // Delete previus image
    const removedProduct = await productService.deleteProduct(req.params.id);
    // Check if image is from populate (not uploaded in server)
    if (!removedProduct?.image.startsWith('https')) {
      const imagePath = removedProduct?.image.split('/').at(-1);
      if (imagePath) await deleteFile(imagePath);
    }

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
