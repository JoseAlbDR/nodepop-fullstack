import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors';
import { validateProductGetDeleteUpdate } from '../utils/validateProductGetDeleteUpdate';
import { tagsValidationMessage, validateSort, validateTags } from '../utils';

// Middleware to validate request data and handle validation errors
export const requestValidator = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages: string[] = errors
      .array()
      .map((error) => error.msg as string);

    // If error starts with "Product" means that it is a NotFoundError
    if (errorMessages[0].startsWith('Product'))
      throw new NotFoundError(errorMessages.join(', '));

    // If error starts with "Not authorized" means that it is an UnauthorizedError
    if (errorMessages[0].startsWith('Not authorized'))
      throw new UnauthorizedError(errorMessages.join(', '));

    throw new BadRequestError(errorMessages.join(', '));
  }
  next();
};

// Middleware to validate uploaded image files
export const validateUploadedFiles = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log('FILES:', req.file);

  if (!req.file || Object.keys(req.file).length === 0) {
    return next();
    // throw new BadRequestError('No file uploaded');
  }

  const image = req.file;

  if (!image.mimetype.startsWith('image')) {
    throw new BadRequestError('File has to be an image');
  }

  // 1MB max image size
  const maxSize = 1024 * 1024;

  if (image.size > maxSize) {
    throw new BadRequestError('File has to be smaller than 0.5MB');
  }

  req.file = image;

  next();
};

// Middleware to validate the "n" parameter for populating
export const validatePopulateParam = [
  param('n')
    .optional()
    .isNumeric()
    .isFloat({ min: 1 })
    .withMessage('n must be a positive number'),
  requestValidator,
];

// Middleware to validate parameters for product operations (get, delete, update)
export const validateIdParam = [
  param('id')
    .notEmpty()
    .withMessage('id cannot be empty')
    .custom(
      async (value: string, { req }) =>
        await validateProductGetDeleteUpdate(value, req)
    ),
  requestValidator,
];

// Regular expression to validate the price parameter in query
const priceRegex = /^(?:-?\d+-\d+|-?\d+|\d+-|\d+)$/;

// Middleware to validate query parameters for product retrieval
export const validateQueryParam = [
  query('name')
    .trim()
    .optional()
    .isString()
    .withMessage('name must be a string'),

  query('onSale')
    .trim()
    .optional()
    .notEmpty()
    .withMessage('onSale cannot be empty'),

  query('price')
    .trim()
    .optional()
    .matches(priceRegex)
    .withMessage(
      (value) =>
        `Incorrect price: ${value}. Price should be in the format: price=number-number, price=number, price=-number, or price=number-`
    ),

  query('tags')
    .trim()
    .optional()
    .notEmpty()
    .withMessage('tags cannot be empty')
    .custom((tags: string[]) => validateTags(tags))
    .withMessage(tagsValidationMessage),

  query('sort')
    .trim()
    .optional()
    .default('latest')
    .custom((sort: string) => validateSort(sort))
    .withMessage(
      (value) =>
        `Incorrect sort: ${value}. Allowed values: oldest, latest, a-z, z-a, lowest, highest `
    ),

  requestValidator,
];

// Middleware to validate request body for creating a product
export const validateProductCreation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters'),

  body('onSale')
    .trim()
    .notEmpty()
    .withMessage('onSale is required')
    .isBoolean()
    .withMessage('onSale must be a boolean'),

  body('price')
    .trim()
    .notEmpty()
    .withMessage('price is required')
    .isFloat({ min: 0, max: 100000 })
    .withMessage('price must be between 0 and 100000'),

  body('tags')
    .notEmpty()
    .withMessage('tags is required')
    .custom((tags: string[]) => validateTags(tags))
    .withMessage(tagsValidationMessage),

  requestValidator,
];

// Middleware to validate request body for updating a product
export const validateProductUpdate = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters'),

  body('onSale')
    .trim()
    .notEmpty()
    .withMessage('onSale is required')
    .isBoolean()
    .withMessage('onSale must be a boolean'),

  body('price')
    .trim()
    .notEmpty()
    .withMessage('price is required')
    .isFloat({ min: 0 })
    .withMessage('price must be a positive number'),

  body('tags')
    .notEmpty()
    .withMessage('tags is required')
    .custom((tags: string[]) => validateTags(tags))
    .withMessage(tagsValidationMessage),

  requestValidator,
];

// Middleware to validate request body for registering a user
export const validateRegisterUser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long'),

  body('lastName')
    .trim()
    .optional()
    .notEmpty()
    .withMessage('last name cannot be empty')
    .isString()
    .withMessage('last name must be a string'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be a valid email address'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),

  body('location')
    .trim()
    .optional()
    .notEmpty()
    .withMessage('location cannot be empty')
    .isString()
    .withMessage('location must be a string'),

  requestValidator,
];

// Middleware to validate request body for user login
export const validateLoginUser = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be a valid email address'),

  body('password').trim().notEmpty().withMessage('password is required'),

  requestValidator,
];

// Middleware to validate request body for updating user details
export const validateUpdateUser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('last name cannot be empty')
    .isString()
    .withMessage('last name must be a string'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be a valid email address'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('location cannot be empty')
    .isString()
    .withMessage('location must be a string'),

  requestValidator,
];

// Middleware to validate request body for changing user's password
export const validateChangePassword = [
  body('oldPassword')
    .trim()
    .notEmpty()
    .withMessage('old password is required')
    .isString()
    .withMessage('old password must be a string')
    .isLength({ min: 8 })
    .withMessage('old password must be at least 8 characters long'),

  body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('new password is required')
    .isString()
    .withMessage('new password must be a string')
    .isLength({ min: 8 })
    .withMessage('new password must be at least 8 characters long')
    .custom((value, { req }) => {
      if (value === req.body.oldPassword) {
        throw new BadRequestError('Cannot repeat the same password');
      }
      return true;
    }),

  body('repeatNewPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new BadRequestError('Passwords do not match');
    }
    return true;
  }),

  requestValidator,
];

// Middleware to validate request body for adding a like to a product
export const validateAddLike = [
  body('productId')
    .trim()
    .notEmpty()
    .withMessage('product id is required')
    .isMongoId()
    .withMessage('product id has to be a MongoId'),

  requestValidator,
];
