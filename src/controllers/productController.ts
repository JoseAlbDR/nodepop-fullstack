import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import productService from '../services/productService';

import { CreateProductDTO } from '../dtos/createProductDto';
import { UpdateProductDTO } from '../dtos/updateProductDto';
import { getImagePath, getMinMaxPrices, removeImage } from '../utils';
import { getQueryParams } from '../utils/getQueryParamsUtil';
import { MinMax } from '../utils/getMinMaxPricesUtil';

const productController = {
  /**
   * Get all products based on query parameters.
   *
   * @param {Request} req - The HTTP request object containing query parameters.
   * @param {Response} res - The HTTP response object to send the response.
   */
  getAllProducts: async (req: Request, res: Response) => {
    // Extract query parameters and pagination details
    const {
      result: queryResult,
      queryObject,
      page,
      limit,
    } = getQueryParams(req.query);

    // Count total products based on query parameters
    const totalProducts = await productService.countProducts(queryObject);

    // Retrieve products based on query
    const products = await queryResult;

    // Calculate the number of pages based on total products and pagination limit
    const numOfPages = Math.ceil(totalProducts / limit);

    // Get min and max prices for products
    const { minPrice, maxPrice } = (await getMinMaxPrices()) as MinMax;

    // Send a success response with product details and pagination information
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

  /**
   * Get products created by a specific user.
   *
   * @param {Request} req - The HTTP request object containing user information.
   * @param {Response} res - The HTTP response object to send the response.
   */
  getUserProducts: async (req: Request, res: Response) => {
    // Get user ID from the request's user information
    const { userId } = req.user;

    // Extract query parameters and pagination details for user-specific products
    const {
      result: queryResult,
      queryObject,
      page,
      limit,
    } = getQueryParams(req.query, userId);

    // Count total user-specific products based on query parameters
    const totalProducts = await productService.countProducts(
      queryObject,
      userId
    );

    // Retrieve user-specific products based on query
    const products = await queryResult;

    // Calculate the number of pages based on total user-specific products and pagination limit
    const numOfPages = Math.ceil(totalProducts / limit);

    // Get min and max prices for user-specific products
    const { minPrice, maxPrice } = (await getMinMaxPrices(userId)) as MinMax;

    // Send a success response with user-specific product details and pagination information
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

  /**
   * Create a new product.
   *
   * @param {Request} req - The HTTP request object containing product information.
   * @param {Response} res - The HTTP response object to send the response.
   */
  createProduct: async (req: CreateProductDTO, res: Response) => {
    // Extract product details from the request body
    const product = req.body;

    // Get user ID from the request's user information
    const { userId } = req.user;

    let image;

    // Set the user who created the product
    product.createdBy = req.user.userId;

    // Check if an image file was uploaded
    if (!req.file) {
      // Use a default image URL if no image was provided
      image =
        process.env.NODE_ENV === 'development'
          ? `http://localhost:${process.env.PORT}/no-image-available.webp`
          : '/no-image-available.webp';
    } else {
      // Get the file path of the uploaded image
      const filePath = req.file.path;

      // Set the image URL based on the file path
      image = getImagePath(filePath, userId, 'products');
    }

    // Create a new product with the provided details
    const newProduct = await productService.createProduct({
      ...product,
      image,
    });

    // Send a success response indicating that the product was created
    res
      .status(StatusCodes.CREATED)
      .json({ msg: 'product created', newProduct });
  },

  /**
   * Get details of a single product by its ID.
   *
   * @param {Request} req - The HTTP request object containing the product ID.
   * @param {Response} res - The HTTP response object to send the response.
   */
  getOneProduct: async (req: Request, res: Response) => {
    // Extract the product ID from the request parameters
    const { id: productId } = req.params;

    // Retrieve product details by its ID
    const product = await productService.getOneProduct(productId);

    // Send a success response with the product details
    res.status(StatusCodes.OK).json({ product });
  },

  /**
   * Update an existing product by its ID.
   *
   * @param {Request} req - The HTTP request object containing the product ID and updates.
   * @param {Response} res - The HTTP response object to send the response.
   */
  updateProduct: async (req: UpdateProductDTO, res: Response) => {
    // Extract the product ID from the request parameters
    const { id: productId } = req.params;

    // Get user ID from the request's user information
    const { userId } = req.user;

    // Extract updates from the request body
    const updates = req.body;

    // Retrieve the current product details by its ID
    const product = await productService.getOneProduct(productId);

    // Check if a new image file was uploaded
    if (req.file) {
      // If a new image was uploaded, remove the previous product image
      if (product) await removeImage(product.image!, userId, 'products');

      // Create a new image path based on the uploaded file
      const filePath = req.file.path;

      // Set the image URL in the updates object
      updates.image = getImagePath(filePath, userId, 'products');
    }

    // Update the product with the provided ID and updates
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      updates
    );

    // Send a success response indicating that the product was updated
    res
      .status(StatusCodes.OK)
      .json({ msg: 'product updated', product: updatedProduct });
  },

  /**
   * Delete a product by its ID.
   *
   * @param {Request} req - The HTTP request object containing the product ID.
   * @param {Response} res - The HTTP response object to send the response.
   */
  deleteProduct: async (req: Request, res: Response) => {
    // Extract the product ID from the request parameters
    const { id: productId } = req.params;

    // Get user ID from the request's user information
    const { userId } = req.user;

    // Delete the product by its ID and get the removed product details
    const removedProduct = await productService.deleteProduct(productId);

    // If a product was removed, also remove its image
    if (removedProduct)
      await removeImage(removedProduct.image!, userId, 'products');

    // Send a success response indicating that the product was deleted
    res
      .status(StatusCodes.OK)
      .json({ msg: 'product deleted', product: removedProduct });
  },

  /**
   * Get a list of all product tags.
   *
   * @param {Request} _req - The HTTP request object (unused).
   * @param {Response} res - The HTTP response object to send the response.
   */
  getAllTags: async (_req: Request, res: Response) => {
    // Retrieve a list of all product tags from the productService
    const tags = await productService.getAllTags();

    // Send a success response with the list of tags
    res.status(StatusCodes.OK).json({ tags });
  },

  /**
   * Show statistics related to the current user's products.
   *
   * @param {Request} req - The HTTP request object containing the user's information.
   * @param {Response} res - The HTTP response object to send the response.
   */
  showStats: async (req: Request, res: Response) => {
    // Retrieve default statistics related to the current user's products
    const defaultStats = await productService.showStats(req.user.userId);

    // Send a success response with the default statistics
    res.status(StatusCodes.OK).json(defaultStats);
  },

  /**
   * Get a list of favorite products for the current user.
   *
   * @param {Request} req - The HTTP request object containing the user's information.
   * @param {Response} res - The HTTP response object to send the response.
   */
  getFavoriteProducts: async (req: Request, res: Response) => {
    // Extract the user ID from the request's user information
    const { userId } = req.user;

    // Get query parameters for pagination (page and limit)
    const { page, limit } = getQueryParams(req.query);

    // Retrieve a list of favorite products for the current user
    const products = await productService.getFavoriteProducts(userId);

    // Calculate the number of pages based on the product count and limit
    const numOfPages = Math.ceil(products.length / limit);

    // Send a success response with the list of favorite products and pagination details
    res.status(StatusCodes.OK).json({
      numOfPages,
      totalProducts: products.length,
      currentPage: page,
      products,
      limit: limit || 5,
    });
  },
};

export default productController;
