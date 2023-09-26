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
  }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await hashPassword(this.password);
});

export const User = mongoose.model('User', UserSchema);
