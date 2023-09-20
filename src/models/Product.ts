import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    image: {
      type: String,
      required: [true, 'Photo is required'],
    },
    tags: {
      type: [String],
      required: [true, 'Tag is required'],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', ProductSchema);
