import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import productService from '../services/productService';

import { CreateProductDTO } from '../dtos/createProductDto';
import { UpdateProductDTO } from '../dtos/updateProductDto';
import { getImagePath, getMinMaxPrices, removeImage } from '../utils';
import { getQueryParams } from '../utils/getQueryParamsUtil';
import { MinMax } from '../utils/getMinMaxPricesUtil';

const productController = {
  getAllProducts: async (req: Request, res: Response) => {
    console.log(req.query);

    const {
      result: queryResult,
      queryObject,
      page,
      limit,
    } = getQueryParams(req.query);

    const totalProducts = await productService.countProducts(queryObject);

    const products = await queryResult;
    const numOfPages = Math.ceil(totalProducts / limit);

    const { minPrice, maxPrice } = (await getMinMaxPrices()) as MinMax;

    res.status(StatusCodes.OK).json({
      totalProducts,
      minPrice,
      maxPrice,
      numOfPages,
      currentPage: page,
      products,
      limit: limit || 10,
    });
  },

  getUserProducts: async (req: Request, res: Response) => {
    const { userId } = req.user;

    const {
      result: queryResult,
      queryObject,
      page,
      limit,
    } = getQueryParams(req.query, userId);

    const totalProducts = await productService.countProducts(
      queryObject,
      userId
    );

    const products = await queryResult;
    const numOfPages = Math.ceil(totalProducts / limit);

    const { minPrice, maxPrice } = (await getMinMaxPrices(userId)) as MinMax;

    res.status(StatusCodes.OK).json({
      totalProducts,
      minPrice,
      maxPrice,
      numOfPages,
      currentPage: page,
      products,
      limit: limit || 10,
    });
  },

  createProduct: async (req: CreateProductDTO, res: Response) => {
    const product = req.body;
    let image;

    product.createdBy = req.user.userId;

    if (!req.file) {
      image =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/no-image-available.webp'
          : '/no-image-available.webp';
    } else {
      const filePath = req.file.path;
      console.log('filepath ', filePath);
      image = getImagePath(filePath, req.user.userId.toString(), 'products');
      console.log('imagepath ', image);
    }

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

    if (req.file) {
      // Remove previous image
      const product = await productService.getOneProduct(productId);

      if (product)
        await removeImage(
          product.image!,
          req.user.userId.toString(),
          'products'
        );

      // Create new image path
      const filePath = req.file.path;

      updates.image = getImagePath(
        filePath,
        req.user.userId.toString(),
        'products'
      );
    }

    // Update product
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      updates
    );

    res
      .status(StatusCodes.OK)
      .json({ msg: 'product updated', product: updatedProduct });
  },

  deleteProduct: async (req: Request, res: Response) => {
    const { id: productId } = req.params;

    // Delete previous image
    const removedProduct = await productService.deleteProduct(productId);

    if (removedProduct)
      await removeImage(
        removedProduct.image!,
        req.user.userId.toString(),
        'products'
      );

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
