import mongoose from 'mongoose';
import { TAGS } from '../utils/constantsUtil';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      index: true,
    },
    onSale: {
      type: Boolean,
      default: false,
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      index: true,
    },
    image: {
      type: String,
    },
    tags: {
      type: [String],
      index: true,
      required: [true, 'Tag is required'],
      validate: {
        validator: (tags: string[]) => {
          return tags.every((tag) => TAGS.includes(tag));
        },
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', ProductSchema);
