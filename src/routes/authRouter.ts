import express from 'express';
import rateLimiter from 'express-rate-limit';

import { authController } from '../controllers/authController';
import {
  validateRegisterUser,
  validateLoginUser,
} from '../middleware/validationMiddleware';

const router = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes' },
});

router.post('/login', apiLimiter, validateLoginUser, authController.login);
router.post(
  '/register',
  apiLimiter,
  validateRegisterUser,
  authController.register
);
router.get('/logout', authController.logout);

export default router;
