import express from 'express';
import { likesController } from '../controllers/likesController';

const router = express.Router();

router.post('/', likesController.addLike);
router.delete('/:id', likesController.deleteLike);

export default router;
