import express from 'express';

import { populateController } from '../controllers/populateController';
import { validatePopulateParam } from '../middleware/validationMiddleware';
import { authorizePermissions } from '../middleware/authMiddleware';

const router = express.Router();

// Route to populate the database with test data
router
  .route('/:n?')
  .post(
    authorizePermissions('tester', 'admin'),
    validatePopulateParam,
    populateController.populateDatabase
  );

export default router;
