import mongoose from 'mongoose';
import { User } from '../models/UserModel';
import { IUpdateUser } from '../types/userInterfaces';
import { NotFoundError } from '../errors';
import { Product } from '../models/ProductModel';

const userService = {
  getCurrentUser: async (
    userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
  ) => {
    const response = await User.findById(userId).select('-password');

    if (!response)
      throw new NotFoundError(
        `User with ${(
          userId as mongoose.Types.ObjectId
        ).toString()} does not found`
      );

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

    if (!result)
      throw new NotFoundError(
        `User ${(userId as mongoose.Types.ObjectId).toString()} does not exist`
      );

    return result;
  },

  getApplicationStats: async () => {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();

    return { users, products };
  },
};

export default userService;