import express from 'express';
import { populateController } from '../controllers/populateController';

const router = express.Router();

router.get('/:n', populateController.populateDatabase);

export default router;
