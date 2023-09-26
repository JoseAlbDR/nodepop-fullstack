import express from 'express';
import { populateController } from '../controllers/populateController';
import { validatePopulateParam } from '../middleware/validationMiddleware';
import { authorizePermissions } from '../middleware/authMiddleware';
import { checkTestUser } from '../middleware/checkTestUserMiddleware';

const router = express.Router();

router
  .route('/:n?')
  .post(
    checkTestUser,
    authorizePermissions('user', 'admin'),
    validatePopulateParam,
    populateController.populateDatabase
  );

export default router;
