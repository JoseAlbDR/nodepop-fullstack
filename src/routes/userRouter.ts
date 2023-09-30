import express from 'express';

import userController from '../controllers/userController';

import {
  validateUpdateUser,
  validateUploadedFiles,
} from '../middleware/validationMiddleware';
import { authorizePermissions } from '../middleware/authMiddleware';
import upload from '../middleware/multerMiddleware';
import { checkTestUser } from '../middleware/checkTestUserMiddleware';

const router = express.Router();

router.get('/current-user', userController.getCurrentUser);
router.patch(
  '/update-user',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  upload('users').single('avatar'),
  validateUploadedFiles,
  validateUpdateUser,
  userController.updateUser
);
router.get('/admin/app-stats', [
  authorizePermissions('admin'),
  userController.getApplicationStats,
]);

export default router;
