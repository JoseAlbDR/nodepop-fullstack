import express from 'express';
import productController from '../controllers/productController';
import uploadsController from '../controllers/uploadsController';

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router.get('/tags', productController.getAllTags);
router.post('/uploadImage', uploadsController.uploadProductImage);

router
  .route('/:id')
  .get(productController.getOneProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
