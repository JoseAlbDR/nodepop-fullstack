import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError } from '../errors';
import { TAGS } from '../utils/constants';
import { Product } from '../models/ProductModel';
import { UploadedFile } from 'express-fileupload';
import mongoose from 'mongoose';

export const requestValidator = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg as string);
    if (errorMessages[0].startsWith('Product')) {
      throw new NotFoundError(errorMessages.join(', '));
    }
    throw new BadRequestError(errorMessages.join(', '));
  }
  next();
};

// Upload image file
export const validateUploadedFiles = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new BadRequestError('No file uploaded');
  }

  const image = req.files.image as UploadedFile;

  if (!image.mimetype.startsWith('image')) {
    throw new BadRequestError('File has to be an image');
  }

  // 1MB max image size
  const maxSize = 1024 * 1024;

  if (image.size > maxSize) {
    throw new BadRequestError('File has to be smaller than 1MB');
  }

  next();
};

// Populate param
export const validatePopulateParam = [
  param('n')
    .optional()
    .isNumeric()
    .isFloat({ min: 1 })
    .withMessage('n must be a positive number'),
  requestValidator,
];

// Product params, create and update
export const validateIdParam = [
  param('id')
    .notEmpty()
    .withMessage('id cannot be empty')
    .custom(async (value: string) => {
      const isValid = mongoose.Types.ObjectId.isValid(value);

      if (!isValid)
        throw new BadRequestError(`${value} is not a valid MongoDB id`);

      const result = await Product.findById(value);

      if (!result)
        throw new NotFoundError(`Product with id: ${value} not found`);
    }),
  requestValidator,
];

export const validateProductCreation = [
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters'),

  body('onSale')
    .notEmpty()
    .withMessage('onSale is required')
    .isBoolean()
    .withMessage('onSale must be a boolean'),

  body('price')
    .notEmpty()
    .withMessage('price is required')
    .isFloat({ min: 0 })
    .withMessage('price must be a positive number'),

  body('image')
    .notEmpty()
    .withMessage('image is required')
    .isString()
    .withMessage('image must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('image must be between 3 and 50 characters'),

  body('tags')
    .notEmpty()
    .withMessage('tags is required')
    .custom((tags) => {
      // Validate array
      if (!Array.isArray(tags)) return false;
      // Validate tags in array
      const allTagsValid = tags.every((tag: string) => TAGS.includes(tag));
      if (!allTagsValid) return false;
      return true;
    })
    .withMessage(
      (value) =>
        `Invalid tags: ${value}, tags must be an array of strings with any combination of: ${TAGS.join(
          ', '
        )}`
    ),

  requestValidator,
];

export const validateProductUpdate = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters'),

  body('onSale')
    .optional()
    .notEmpty()
    .withMessage('onSale is required')
    .isBoolean()
    .withMessage('onSale must be a boolean'),

  body('price')
    .optional()
    .notEmpty()
    .withMessage('price is required')
    .isFloat({ min: 0 })
    .withMessage('price must be a positive number'),

  body('image')
    .optional()
    .notEmpty()
    .withMessage('image is required')
    .isString()
    .withMessage('image must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('image must be between 3 and 50 characters'),

  body('tags')
    .optional()
    .notEmpty()
    .withMessage('tags is required')
    .custom((tags) => {
      // Validate array
      if (!Array.isArray(tags)) return false;
      // Validate tags in array
      const allTagsValid = tags.every((tag: string) => TAGS.includes(tag));
      if (!allTagsValid) return false;
      return true;
    })
    .withMessage(
      (value) =>
        `Invalid tags: ${value}, tags must be an array of strings with any combination of: ${TAGS.join(
          ', '
        )}`
    ),

  requestValidator,
];
