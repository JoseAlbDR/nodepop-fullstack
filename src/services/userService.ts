import mongoose from 'mongoose';

import { User } from '../models/UserModel';
import { IUpdateUser } from '../types/userInterfaces';
import { BadRequestError, NotFoundError } from '../errors';
import { Product } from '../models/ProductModel';
import { deleteUserFolder } from '../utils/deleteUserFolderUtil';

const userService = {
  /**
   * Get the current user by their user ID.
   * @param {mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>} userId - The user's ID.
   * @returns {Promise<User>} - The user object without the password.
   * @throws {NotFoundError} - If the user is not found.
   */
  getCurrentUser: async (
    userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>
  ) => {
    const response = await User.findById(userId).select('-password');

    if (!response) throw new NotFoundError(`User not found`);

    return response;
  },

  /**
   * Update user information for the specified user.
   * @param {mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>} userId - The user's ID.
   * @param {IUpdateUser} updates - The updates to apply to the user.
   * @returns {Promise<User>} - The updated user object without the password.
   * @throws {NotFoundError} - If the user is not found.
   */
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

  /**
   * Get statistics about the application, including the number of users and products.
   * @returns {Promise<{ users: number, products: number }>} - Object containing the user and product counts.
   */
  getApplicationStats: async () => {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();

    return { users, products };
  },

  /**
   * Change the password for a user.
   * @param {string} oldPassword - The user's old password.
   * @param {string} newPassword - The new password to set.
   * @param {mongoose.Types.ObjectId} userId - The user's ID.
   * @throws {BadRequestError} - If the old password is incorrect.
   */
  changePassword: async (
    oldPassword: string,
    newPassword: string,
    userId: mongoose.Types.ObjectId
  ) => {
    const user = await User.findById(userId);

    if (user) {
      const isPasswordValid = await user.checkPassword(oldPassword);
      if (!isPasswordValid) throw new BadRequestError('Invalid password');
      user.password = newPassword;
      await user.save();
    }
  },

  /**
   * Delete a user's account by their email.
   * @param {string} email - The user's email address.
   * @throws {NotFoundError} - If the user is not found.
   */
  deleteAccount: async (email: string) => {
    const user = await User.findOne({ email: email });

    if (!user) throw new NotFoundError('User not found');

    await deleteUserFolder(user._id);
    await user.deleteOne();
  },
};

export default userService;
