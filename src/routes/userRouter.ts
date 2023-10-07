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

// Route to get the current user
router.get('/current-user', userController.getCurrentUser);

// Route to update user information, including avatar
router.patch(
  '/update-user',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  upload('avatar').single('avatar'),
  validateUploadedFiles,
  validateUpdateUser,
  userController.updateUser
);

// Route to update the user's password
router.post(
  '/update-password',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  validateChangePassword,
  userController.changePassword
);

// Route to get application statistics (admin only)
router.get('/admin/app-stats', [
  checkTestUser,
  authorizePermissions('admin'),
  userController.getApplicationStats,
]);

// Route to delete a user's account
router.delete(
  '/delete-user',
  checkTestUser,
  authorizePermissions('user', 'admin'),
  userController.deleteUser
);

export default router;
