import mongoose from 'mongoose';
import { Product } from '../models/ProductModel';

/**
 * Get the minimum and maximum prices of products optionally filtered by a user ID.
 *
 * @param {mongoose.Types.ObjectId} userId - (Optional) The ID of the user to filter products by.
 * @returns {Promise<MinMax>} An object containing the minimum and maximum prices.
 * @throws {Error} Throws an error if there's an issue with the database query.
 */
export interface MinMax {
  minPrice: number;
  maxPrice: number;
}

export const getMinMaxPrices = async (userId?: mongoose.Types.ObjectId) => {
  try {
    // Define the filter criteria based on the user ID (if provided)
    const createdBy = userId
      ? { createdBy: new mongoose.Types.ObjectId(userId.toString()) }
      : {};

    // Use the aggregation pipeline to calculate min and max prices
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

    // Check if there are results, and return the min and max prices
    if (result.length > 0) {
      const { minPrice, maxPrice } = result[0];
      return { minPrice, maxPrice };
    } else {
      // Return default values if no results found
      return { minPrice: 0, maxPrice: 0 };
    }
  } catch (err) {
    // Log and rethrow any errors encountered during the database query
    console.error(err);
    throw err;
  }
};
