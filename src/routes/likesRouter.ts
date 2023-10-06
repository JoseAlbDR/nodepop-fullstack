import express from 'express';
import { likesController } from '../controllers/likesController';

const router = express.Router();

router.post('/add', likesController.addLike);

export default router;
