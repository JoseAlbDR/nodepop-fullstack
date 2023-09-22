import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
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
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
