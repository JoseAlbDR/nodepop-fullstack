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

router.get('/user-products', [
  authorizePermissions('user', 'admin', 'tester'),
  productController.getUserProducts,
]);

router.route('/stats').get(productController.showStats);

router.get('/tags', [
  authorizePermissions('user', 'admin', 'tester'),
  productController.getAllTags,
]);

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
