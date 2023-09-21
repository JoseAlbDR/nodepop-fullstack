import express from 'express';
import { populateController } from '../controllers/populateController';
import { validatePopulateParam } from '../middleware/validation';

const router = express.Router();

router
  .route(['/', '/:n'])
  .get(validatePopulateParam, populateController.populateDatabase);

export default router;
