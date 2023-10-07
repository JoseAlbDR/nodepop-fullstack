import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import userService from '../services/userService';
import { UpdateUserDTO } from '../dtos/updateUserDto';
import { removeImage, getImagePath } from '../utils';
import { UpdatePasswordDTO } from '../dtos/updatePasswordDto';
import { authController } from './authController';

const userController = {
  /**
   * Get the current user's profile information.
   *
   * @param {Request} req - The HTTP request object containing the user's information.
   * @param {Response} res - The HTTP response object to send the user's profile information.
   */
  getCurrentUser: async (req: Request, res: Response) => {
    // Extract the user ID from the request's user information
    const { userId } = req.user;

    // Retrieve the current user's profile information from the userService
    const user = await userService.getCurrentUser(userId);

    // Send a success response with the user's profile information
    res.status(StatusCodes.OK).json({ user });
  },

  /**
   * Update the current user's profile information.
   *
   * @param {UpdateUserDTO} req - The HTTP request object containing the updated user data.
   * @param {Response} res - The HTTP response object to send the response.
   */
  updateUser: async (req: UpdateUserDTO, res: Response) => {
    // Extract the user ID from the request's user information
    const { userId } = req.user;

    // Remove the password field from the updates (as a precaution)
    const updates = { ...req.body };
    delete updates.password;

    if (req.file) {
      // Remove the previous user avatar (image)
      const user = await userService.getCurrentUser(userId);
      await removeImage(user.avatar!, userId, 'avatar');

      // Generate a new image path based on the provided image file
      const filePath = req.file.path;
      updates.avatar = getImagePath(filePath, user._id, 'avatar');
    }

    // Update the user's profile information
    await userService.updateUser(req.user.userId, updates);

    // Send a success response with a message indicating the user's profile was updated
    res.status(StatusCodes.OK).json({ msg: 'user updated' });
  },

  /**
   * Get application statistics including user and product counts.
   *
   * @param {Request} _req - The HTTP request object (unused).
   * @param {Response} res - The HTTP response object to send the application statistics.
   */
  getApplicationStats: async (_req: Request, res: Response) => {
    // Retrieve application statistics including user and product counts from the userService
    const { users, products } = await userService.getApplicationStats();

    // Send a success response with the application statistics
    res.status(StatusCodes.OK).json({ users, products });
  },

  /**
   * Change the current user's password.
   *
   * @param {UpdatePasswordDTO} req - The HTTP request object containing old and new passwords.
   * @param {Response} res - The HTTP response object to send the response.
   */
  changePassword: async (req: UpdatePasswordDTO, res: Response) => {
    // Extract the old password and new password from the request body
    const { oldPassword, newPassword } = req.body;

    // Extract the user ID from the request's user information
    const { userId } = req.user;

    // Call the userService to change the user's password
    await userService.changePassword(oldPassword, newPassword, userId);

    // Send a success response with a message indicating the password was updated
    res.status(StatusCodes.OK).json({ msg: 'password updated' });
  },

  /**
   * Delete the current user's account.
   *
   * @param {Request} req - The HTTP request object containing the user's email.
   * @param {Response} res - The HTTP response object to send the response.
   */
  deleteUser: async (req: Request, res: Response) => {
    // Extract the user's email from the request's user information
    const { email } = req.user;

    // Call the userService to delete the user's account
    await userService.deleteAccount(email);

    // Call the logout method from the authController to log out the user
    await authController.logout(req, res);
  },
};

export default userController;
