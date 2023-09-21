import express from 'express';
import productController from '../controllers/productController';
import uploadsController from '../controllers/uploadsController';
import { validateProductCreation } from '../middleware/validation';

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(validateProductCreation, productController.createProduct);

router.get('/tags', productController.getAllTags);
router.post('/uploadImage', uploadsController.uploadProductImage);

router
  .route('/:id')
  .get(productController.getOneProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
