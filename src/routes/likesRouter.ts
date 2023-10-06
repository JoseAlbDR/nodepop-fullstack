import express from 'express';
import { likesController } from '../controllers/likesController';
import {
  validateAddLike,
  validateIdParam,
} from '../middleware/validationMiddleware';
import { checkTestUser } from '../middleware/checkTestUserMiddleware';
import { authorizePermissions } from '../middleware/authMiddleware';

const router = express.Router();

router.post(
  '/',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  validateAddLike,
  likesController.addLike
);

router.delete(
  '/:id',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  validateIdParam,
  likesController.deleteLike
);

export default router;
