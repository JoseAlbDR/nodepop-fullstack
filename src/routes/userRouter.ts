import express from 'express';

import userController from '../controllers/userController';

import {
  validateChangePassword,
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
  upload('avatar').single('avatar'),
  validateUploadedFiles,
  validateUpdateUser,
  userController.updateUser
);
router.post(
  '/update-password',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  validateChangePassword,
  userController.changePassword
);
router.get('/admin/app-stats', [
  checkTestUser,
  authorizePermissions('admin'),
  userController.getApplicationStats,
]);
router.delete(
  '/:email',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  userController.deleteUser
);

export default router;
