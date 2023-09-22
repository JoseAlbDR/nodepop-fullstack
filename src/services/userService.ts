import mongoose from 'mongoose';
import { User } from '../models/UserModel';

const userService = {
  getCurrentUser: async (
    userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
  ) => {
    const response = await User.findById(userId).select('-password');
    return response;
  },

  updateUser: async () => {
    return 'update user';
  },

  getApplicationStats: async () => {
    return 'application stats';
  },
};

export default userService;
