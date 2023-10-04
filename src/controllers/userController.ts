import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import userService from '../services/userService';
import { UpdateUserDTO } from '../dtos/updateUserDto';
import { removeImage, getImagePath } from '../utils';
import { UpdatePasswordDTO } from '../dtos/updatePasswordDto';

const userController = {
  getCurrentUser: async (req: Request, res: Response) => {
    const { userId } = req.user;

    const user = await userService.getCurrentUser(userId);

    res.status(StatusCodes.OK).json({ user });
  },

  updateUser: async (req: UpdateUserDTO, res: Response) => {
    const { userId } = req.user;

    // Remove password just in case...
    const updates = { ...req.body };
    delete updates.password;

    if (req.file) {
      // Remove previous image
      const user = await userService.getCurrentUser(userId);
      await removeImage(user.avatar!, userId, 'avatar');

      // Generate new image path
      const filePath = req.file.path;
      updates.avatar = getImagePath(filePath, user._id, 'avatar');
    }

    // Update User
    await userService.updateUser(req.user.userId, updates);

    res.status(StatusCodes.OK).json({ msg: 'user updated' });
  },

  getApplicationStats: async (_req: Request, res: Response) => {
    const { users, products } = await userService.getApplicationStats();

    res.status(StatusCodes.OK).json({ users, products });
  },

  changePassword: async (req: UpdatePasswordDTO, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.user;

    await userService.changePassword(oldPassword, newPassword, userId);

    res.status(StatusCodes.OK).json({ msg: 'password updated' });
  },

  deleteUser: async (req: Request, res: Response) => {
    const { email } = req.user;

    await userService.deleteAccount(email);

    res.status(StatusCodes.OK).json({ msg: 'account successfully deleted' });
  },
};

export default userController;
