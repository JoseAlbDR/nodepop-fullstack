import mongoose from 'mongoose';

const LikesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

LikesSchema.index({ product: 1, user: 1 }, { unique: true });


