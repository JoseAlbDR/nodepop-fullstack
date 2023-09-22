import express from 'express';
import { authController } from '../controllers/authController';
import {
  validateRegisterUser,
  validateLoginUser,
} from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/login', validateLoginUser, authController.login);
router.post('/register', validateRegisterUser, authController.register);

export default router;
