import express from 'express';
import rateLimiter from 'express-rate-limit';

import { authController } from '../controllers/authController';
import {
  validateRegisterUser,
  validateLoginUser,
} from '../middleware/validationMiddleware';

const router = express.Router();

// Rate limiter middleware to limit the number of requests from an IP address
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes' },
});

// Route to handle user login with rate limiting and validation middleware
router.post('/login', apiLimiter, validateLoginUser, authController.login);

// Route to handle user registration with rate limiting and validation middleware
router.post(
  '/register',
  apiLimiter,
  validateRegisterUser,
  authController.register
);

// Route to handle user logout
router.get('/logout', authController.logout);

export default router;
