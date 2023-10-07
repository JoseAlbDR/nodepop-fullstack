import express from 'express';

import productController from '../controllers/productController';

import {
  validateQueryParam,
  validateUploadedFiles,
  validateProductCreation,
  validateIdParam,
  validateProductUpdate,
} from '../middleware/validationMiddleware';
import { authorizePermissions } from '../middleware/authMiddleware';
import upload from '../middleware/multerMiddleware';
import { checkTestUser } from '../middleware/checkTestUserMiddleware';

const router = express.Router();

// Route for retrieving all products and creating a new product
router
  .route('/')
  .get(
    authorizePermissions('user', 'admin', 'tester'),
    validateQueryParam,
    productController.getAllProducts
  )
  .post(
    checkTestUser,
    authorizePermissions('user', 'admin'),
    upload('products').single('image'),
    validateUploadedFiles,
    validateProductCreation,
    productController.createProduct
  );

// Route for retrieving favorite products
router.get(
  '/favorites',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  productController.getFavoriteProducts
);

// Route for retrieving user's products
router.get('/user-products', [
  authorizePermissions('user', 'admin', 'tester'),
  productController.getUserProducts,
]);

// Route for retrieving product statistics
router.route('/stats').get(productController.showStats);

// Route for retrieving all product tags
router.get('/tags', [
  authorizePermissions('user', 'admin', 'tester'),
  productController.getAllTags,
]);

// Route for updating and deleting a specific product
router
  .route('/:id([0-9a-fA-F]{24})')
  .get(validateIdParam, productController.getOneProduct)
  .patch(
    checkTestUser,
    authorizePermissions('user', 'admin'),
    upload('products').single('image'),
    validateUploadedFiles,
    validateProductUpdate,
    validateIdParam,
    productController.updateProduct
  )
  .delete(
    checkTestUser,
    authorizePermissions('user', 'admin'),
    validateIdParam,
    productController.deleteProduct
  );

export default router;
