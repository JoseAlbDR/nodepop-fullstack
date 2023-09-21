import express from 'express';
import { authController } from '../controllers/authController';
import { validateRegisterUser } from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', validateRegisterUser, authController.register);

export default router;
