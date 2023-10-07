import express from 'express';
import { likesController } from '../controllers/likesController';
import { validateAddLike } from '../middleware/validationMiddleware';
import { checkTestUser } from '../middleware/checkTestUserMiddleware';
import { authorizePermissions } from '../middleware/authMiddleware';

const router = express.Router();

// Route to add a like to a product
router.post(
  '/',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  validateAddLike,
  likesController.addLike
);

// Route to unlike a product
router.delete(
  '/:id',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  likesController.deleteLike
);

export default router;
