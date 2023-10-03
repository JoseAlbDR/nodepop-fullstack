import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import userService from '../services/userService';
import { UpdateUserDTO } from '../dtos/updateUserDto';
import { removeImage, getImagePath } from '../utils';
import { UpdatePasswordDTO } from '../dtos/updatePasswordDto';
import { BadRequestError } from '../errors';

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
      await removeImage(user.avatar!, req.user.userId.toString(), 'avatar');

      // Generate new image path
      const filePath = req.file.path;
      updates.avatar = getImagePath(filePath, user._id.toString(), 'avatar');
    }

    // Update User
    await userService.updateUser(req.user.userId, updates);

    res.status(StatusCodes.OK).json({ msg: 'user updated' });
  },

  getApplicationStats: async (_req: Request, res: Response) => {
    const { users, products } = await userService.getApplicationStats();

    res.status(StatusCodes.OK).json({ users, products });
  },

  updatePassword: async (req: UpdatePasswordDTO, res: Response) => {
    const { oldPassword, newPassword, repeatNewPassword } = req.body;

    console.log(req.body);

    if (oldPassword === newPassword) {
      throw new BadRequestError('Can not repeat same password');
    }

    if (newPassword !== repeatNewPassword)
      throw new BadRequestError('New password do not match');

    await userService.updatePassword(oldPassword, newPassword, req.user.userId);

    res.status(StatusCodes.OK).json({ msg: 'password updated' });
  },
};

export default userController;
