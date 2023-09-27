import mongoose from 'mongoose';
import { Product } from '../models/ProductModel';

export interface MinMax {
  minPrice: number;
  maxPrice: number;
}

export const getMinMaxPrices = async (userId?: mongoose.Types.ObjectId) => {
  try {
    const createdBy = userId
      ? { createdBy: new mongoose.Types.ObjectId(userId.toString()) }
      : {};
    const result: MinMax[] = await Product.aggregate([
      {
        $match: createdBy,
      },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    if (result.length > 0) {
      const { minPrice, maxPrice } = result[0];
      return { minPrice, maxPrice };
    } else {
      return { minPrice: 0, maxPrice: 0 };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
