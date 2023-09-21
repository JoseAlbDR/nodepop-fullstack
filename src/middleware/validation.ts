import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors';
import { TAGS } from '../utils/constants';

const requestValidator = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg as string);
    throw new BadRequestError(errorMessages.join(', '));
  }
  next();
};

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
        `Invalid tags: ${value}, tags must be an array of strings with any combination of: ${TAGS}`
    ),

  requestValidator,
];