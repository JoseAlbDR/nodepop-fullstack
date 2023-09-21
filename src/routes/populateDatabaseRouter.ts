import express from 'express';
import { populateController } from '../controllers/populateController';
import { validatePopulateParam } from '../middleware/validationMiddleware';

const router = express.Router();

router
  .route('/:n?')
  .post(validatePopulateParam, populateController.populateDatabase);

export default router;
