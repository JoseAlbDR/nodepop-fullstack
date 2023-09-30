import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import userService from '../services/userService';
import { UpdateUserDTO } from '../dtos/updateUserDto';
import { removeImage, getImagePath } from '../utils';

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
      await removeImage(user.avatar!, 'users');

      // Generate new image path
      const protocol = req.protocol;
      const host = req.get('host')!;
      const filePath = req.file.path;
      updates.avatar = getImagePath(protocol, host, filePath, 'users');
    }

    // Update User
    await userService.updateUser(req.user.userId, updates);

    res.status(StatusCodes.OK).json({ msg: 'user updated' });
  },

  getApplicationStats: async (_req: Request, res: Response) => {
    const { users, products } = await userService.getApplicationStats();

    res.status(StatusCodes.OK).json({ users, products });
  },
};

export default userController;
