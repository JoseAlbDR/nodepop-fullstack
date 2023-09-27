// Packages
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Services
import productService from '../services/productService';

// DTOS, Interfaces
import { CreateProductDTO } from '../dtos/createProductDto';
import { UpdateProductDTO } from '../dtos/updateProductDto';
import { getImagePath, removeImage } from '../utils';
import { IProductQuery } from '../types/queryInterfaces';

const productController = {
  getAllProducts: async (req: Request, res: Response) => {
    const { name, tags, onSale, price, sort } = req.query as IProductQuery;

    let { skip, limit } = req.query as IProductQuery;

    const queryObject: IProductQuery = {};

    // Filter by name
    if (name && typeof name === 'string') {
      queryObject.name = {
        $regex: name,
        $options: 'i',
      };
    }

    // Filter by tag
    if (tags && typeof tags === 'string') {
      const tagArray = tags.split(',');
      queryObject.tags = {
        $in: tagArray,
      };
    }

    // Filter by sale type
    if (onSale && typeof onSale === 'string') {
      queryObject.onSale = onSale === 'true' ? true : false;
      console.log(queryObject.onSale);
    }

    // Filter by price
    if (price && typeof price === 'string') {
      const [min, max] = price.split('-');
      if (min && max) queryObject.price = { $gte: min, $lte: max };
      if (price.startsWith('-')) queryObject.price = { $lte: max };
      if (price.endsWith('-')) queryObject.price = { $gte: min };
      if (max === undefined) queryObject.price = { $eq: min };
    }

    let result = productService.getAllProducts(queryObject);

    // Sort results
    if (sort) {
      switch (sort) {
        case 'oldest':
          result = result.sort('createdAt');
          break;
        case 'latest':
          result = result.sort('-createdAt');
          break;
        case 'a-z':
          result = result.sort('name');
          break;
        case 'z-a':
          result = result.sort('-name');
          break;
        case 'lowest':
          result = result.sort('price');
          break;
        case 'highest':
          result = result.sort('-price');
          break;
        default:
          result = result.sort('createdAt');
      }
    }

    // Pagination
    const page = +skip! || 1;
    limit = +limit! || 10;
    skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(StatusCodes.OK).json({ products });
  },

  getUserProducts: async (req: Request, res: Response) => {
    const { userId } = req.user;

    const products = await productService.getUserProducts(userId);

    res.status(StatusCodes.OK).json({ products });
  },

  createProduct: async (req: CreateProductDTO, res: Response) => {
    const product = req.body;

    product.createdBy = req.user.userId;

    const protocol = req.protocol;
    const host = req.get('host')!;
    const filePath = req.file!.path;

    const image = getImagePath(protocol, host, filePath, 'products');

    const newProduct = await productService.createProduct({
      ...product,
      image,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ msg: 'product created', newProduct });
  },

  getOneProduct: async (req: Request, res: Response) => {
    const { id: productId } = req.params;

    const product = await productService.getOneProduct(productId);

    res.status(StatusCodes.OK).json({ product });
  },

  updateProduct: async (req: UpdateProductDTO, res: Response) => {
    const { id: productId } = req.params;
    const updates = req.body;

    const protocol = req.protocol;
    const host = req.hostname;
    const filePath = req.file!.path;

    // Generate image path to store in server
    const image = getImagePath(protocol, host, filePath, 'products');

    // Delete Previous image
    const product = await productService.getOneProduct(productId);
    // Check if image is from populate (not uploaded in server)

    if (product) await removeImage(product.image);

    // Update product
    const updatedProduct = await productService.updateProduct(req.params.id, {
      ...updates,
      image,
    });

    res
      .status(StatusCodes.OK)
      .json({ msg: 'product updated', product: updatedProduct });
  },

  deleteProduct: async (req: Request, res: Response) => {
    const { id: productId } = req.params;

    // Delete previus image
    const removedProduct = await productService.deleteProduct(productId);

    if (removedProduct) await removeImage(removedProduct.image);

    res
      .status(StatusCodes.OK)
      .json({ msg: 'product deleted', product: removedProduct });
  },

  getAllTags: async (_req: Request, res: Response) => {
    const tags = await productService.getAllTags();

    res.status(StatusCodes.OK).json({ tags });
  },

  showStats: async (req: Request, res: Response) => {
    const defaultStats = await productService.showStats(req.user.userId);

    res.status(StatusCodes.OK).json(defaultStats);
  },
};

export default productController;
