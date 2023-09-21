import express from 'express';
import productController from '../controllers/productController';
import uploadsController from '../controllers/uploadsController';
import {
  validateProductCreation,
  validateIdParam,
  validateProductUpdate,
} from '../middleware/validationMiddleware';

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(validateProductCreation, productController.createProduct);

router.get('/tags', productController.getAllTags);
router.post('/uploadImage', uploadsController.uploadProductImage);

router
  .route('/:id')
  .get(validateIdParam, productController.getOneProduct)
  .patch(
    validateProductUpdate,
    validateIdParam,
    productController.updateProduct
  )
  .delete(validateIdParam, productController.deleteProduct);

export default router;
