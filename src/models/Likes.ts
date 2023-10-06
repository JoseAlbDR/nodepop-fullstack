import mongoose from 'mongoose';

type AggResult = { _id: null; likes: number };

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
      async calculateLikes(
        product: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
      ) {
        const result: AggResult[] = await this.aggregate([
          { $match: { product } },
          {
            $group: {
              _id: null,
              likes: { $sum: 1 },
            },
          },
        ]);
        await mongoose.model('Product').findOneAndUpdate(
          { _id: product },
          {
            likes: result[0]?.likes || 0,
          }
        );
      },
    },
  }
);

LikesSchema.post('save', async function () {
  await Likes.calculateLikes(this.product);
});

LikesSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function () {
    await Likes.calculateLikes(this.product);
  }
);

LikesSchema.index({ product: 1, user: 1 }, { unique: true });

export const Likes = mongoose.model('Likes', LikesSchema);
