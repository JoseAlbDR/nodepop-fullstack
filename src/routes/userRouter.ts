import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/current-user', userController.getCurrentUser);
router.patch('/update-user', userController.updateUser);
router.get('/admin/app-stats', userController.getApplicationStats);

export default router;
