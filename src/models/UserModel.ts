import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { hashPassword } from '../utils/hashPasswordUtil';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: [true, 'password is required'] },
    lastName: {
      type: String,
      default: 'last name',
    },
    location: {
      type: String,
      default: 'my city',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'tester'],
      default: 'user',
    },
    avatar: {
      type: String,
    },
    avatarPublicId: String,
  },
  {
    timestamps: true,

    methods: {
      async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password);
      },
    },
    statics: {
      async calculateLikes(product: mongoose.Types.ObjectId) {
        const result = await this.aggregate([
          { $match: { product } },
          {
            $group: {
              _id: null,
              likes: { $sum: 1 },
            },
          },
        ]);
        console.log(result);
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

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await hashPassword(this.password);
});

UserSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (this) {
    await this.$model('Product').deleteMany({ createdBy: this._id });
  }
);

export const User = mongoose.model('User', UserSchema);
