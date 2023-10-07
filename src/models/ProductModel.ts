import mongoose from 'mongoose';
import { TAGS } from '../utils/constantsUtil';

// Define the schema for the Product collection
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
        // Validate that all tags in the array are included in the TAGS constant
        validator: (tags: string[]) => {
          return tags.every((tag) => TAGS.includes(tag));
        },
      },
    },
    numOfLikes: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Create a virtual field 'likes' to populate likes associated with a product
ProductSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

// Delete associated likes when a product is deleted
ProductSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (this) {
    await this.$model('Like').deleteMany({ product: this._id });
  }
);

// Create the Product model based on the schema
export const Product = mongoose.model('Product', ProductSchema);
