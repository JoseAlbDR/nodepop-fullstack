import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors';
import { validateProductGetDeleteUpdate } from '../utils/validateProductGetDeleteUpdate';
import { tagsValidationMessage, validateSort, validateTags } from '../utils';

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

    // If error starts with "Product" means that is a NotFoundError
    if (errorMessages[0].startsWith('Product'))
      throw new NotFoundError(errorMessages.join(', '));

    // If error starts with "Not authorized" means that is a UnauthorizedError
    if (errorMessages[0].startsWith('Not authorized'))
      throw new UnauthorizedError(errorMessages.join(', '));

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
  if (!req.file || Object.keys(req.file).length === 0) {
    throw new BadRequestError('No file uploaded');
  }

  const image = req.file;

  if (!image.mimetype.startsWith('image')) {
    throw new BadRequestError('File has to be an image');
  }

  // 1MB max image size
  const maxSize = 1024 * 1024;

  if (image.size > maxSize) {
    throw new BadRequestError('File has to be smaller than 1MB');
  }

  req.file = image;

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
    .custom(
      async (value: string, { req }) =>
        await validateProductGetDeleteUpdate(value, req)
    ),
  requestValidator,
];

const priceRegex = /^(?:-?\d+-\d+|-?\d+|\d+-|\d+)$/;

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
    .withMessage('onSale can not be empty'),

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
    .withMessage('tags can not be empty')
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
    .isFloat({ min: 0 })
    .withMessage('price must be a positive number'),

  body('tags')
    .notEmpty()
    .withMessage('tags is required')
    .custom((tags: string[]) => validateTags(tags))
    .withMessage(tagsValidationMessage),

  requestValidator,
];

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

// Auth validation
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
    // .isStrongPassword({
    //   minLength: 8,
    //   // minUppercase: 1,
    //   // minNumbers: 1,
    //   // minLowercase: 1,
    //   // minSymbols: 1,
    // })
    .withMessage('Password must be at least 8 characters long'),
  // .withMessage(
  //   `Password must be at least 8 characters long and contains: one uppercase letter, one
  //   lowercase letter, one number and one symbol`
  // ),

  body('location')
    .trim()
    .optional()
    .notEmpty()
    .withMessage('location cannot be empty')
    .isString()
    .withMessage('location must be a string'),

  requestValidator,
];

export const validateLoginUser = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be a valid email address'),

  body('password').trim().notEmpty().withMessage('password is required'),
  // .isStrongPassword({
  //   minLength: 8,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minLowercase: 1,
  //   minSymbols: 1,
  // })
  // .withMessage(
  //   `Password must be at least 8 characters long and contains: one uppercase letter, one lowercase letter, one number and one symbol`
  // ),

  requestValidator,
];

// User Validation
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
