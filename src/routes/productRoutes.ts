import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router.route('/:id').get(productController.getOneProduct);
export default router;
