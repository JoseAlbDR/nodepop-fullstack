import { Request } from 'express';
import mongoose from 'mongoose';

export interface AddLikeDTO extends Request {
  body: { productId: mongoose.Types.ObjectId };
}
