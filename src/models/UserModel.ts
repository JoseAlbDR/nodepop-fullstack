import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { hashPassword } from '../utils/hashPasswordUtil';

// Define the User schema
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
      // Method to check if a given password matches the stored password
      async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password);
      },
    },
  }
);

// Hash the password before saving it
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await hashPassword(this.password);
});

// Delete associated products when a user is deleted
UserSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (this) {
    await this.$model('Product').deleteMany({ createdBy: this._id });
  }
);

// Create the User model based on the schema
export const User = mongoose.model('User', UserSchema);
