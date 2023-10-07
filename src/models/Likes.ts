import mongoose from 'mongoose';

// Define the structure of the result obtained from aggregation
type AggResult = { _id: null; numOfLikes: number };

// Define the schema for the Likes collection
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
  {
    timestamps: true,
    statics: {
      // Calculate and update the total number of likes for a product
      async calculateLikes(
        product: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
      ) {
        // Use aggregation to count the likes for a specific product
        const result: AggResult[] = await this.aggregate([
          { $match: { product } },
          {
            $group: {
              _id: null,
              numOfLikes: { $sum: 1 },
            },
          },
        ]);

        // Update the corresponding product's numOfLikes field
        await mongoose.model('Product').findOneAndUpdate(
          { _id: product },
          {
            numOfLikes: result[0]?.numOfLikes || 0,
          }
        );
      },
    },
  }
);

// Create an index to ensure the uniqueness of the combination of product and user
LikesSchema.index({ product: 1, user: 1 }, { unique: true });

// Trigger the calculateLikes function after a new like is saved
LikesSchema.post('save', async function () {
  await Likes.calculateLikes(this.product);
});

// Trigger the calculateLikes function after a like is deleted
LikesSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function () {
    await Likes.calculateLikes(this.product);
  }
);

// Create the Likes model based on the schema
export const Likes = mongoose.model('Like', LikesSchema);
