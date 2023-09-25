import { Request, Response } from 'express';
import userService from '../services/userService';
import { StatusCodes } from 'http-status-codes';
import { UpdateUserDTO } from '../dtos/updateUserDto';

const userController = {
  getCurrentUser: async (req: Request, res: Response) => {
    const user = await userService.getCurrentUser(req.user.userId);

    res.status(StatusCodes.OK).json({ user });
  },

  updateUser: async (req: UpdateUserDTO, res: Response) => {
    // Remove password just in case...
    console.log(req.file);
    const obj = { ...req.body };
    delete obj.password;

    await userService.updateUser(req.user.userId, obj);

    res.status(StatusCodes.OK).json({ msg: 'user updated' });
  },

  getApplicationStats: async (_req: Request, res: Response) => {
    const { users, products } = await userService.getApplicationStats();

    res.status(StatusCodes.OK).json({ users, products });
  },
};

export default userController;
