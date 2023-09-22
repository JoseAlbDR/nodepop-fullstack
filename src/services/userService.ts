import mongoose from 'mongoose';
import { User } from '../models/UserModel';
import { IUpdateUser } from '../types/userInterfaces';
import { NotFoundError } from '../errors';

const userService = {
  getCurrentUser: async (
    userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
  ) => {
    const response = await User.findById(userId).select('-password');
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
    return 'application stats';
  },
};

export default userService;
