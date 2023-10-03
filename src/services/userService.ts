import mongoose from 'mongoose';

import { User } from '../models/UserModel';
import { IUpdateUser } from '../types/userInterfaces';
import { NotFoundError, UnauthenticatedError } from '../errors';
import { Product } from '../models/ProductModel';

const userService = {
  getCurrentUser: async (
    userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
  ) => {
    const response = await User.findById(userId).select('-password');

    if (!response) throw new NotFoundError(`User not found`);

    return response;
  },

  updateUser: async (
    userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>,
    updates: IUpdateUser
  ) => {
    const result = await User.findByIdAndUpdate(userId, updates, {
      runValidators: true,
      new: true,
    }).select('-password');

    if (!result) throw new NotFoundError(`User not found`);

    return result;
  },

  getApplicationStats: async () => {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();

    return { users, products };
  },

  updatePassword: async (
    oldPassword: string,
    newPassword: string,
    userId: mongoose.Types.ObjectId
  ) => {
    const user = await User.findById(userId);

    if (user) {
      const isPasswordValid = await user.checkPassword(oldPassword);
      if (!isPasswordValid) throw new UnauthenticatedError('Invalid password');
      user.password = newPassword;
      await user.save();
    }
  },
};

export default userService;
