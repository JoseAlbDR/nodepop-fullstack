import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/showMe', userController.getCurrentUser);
router.patch('/updateUser', userController.updateUser);
router.get('/stats', userController.getApplicationStats);

export default router;
