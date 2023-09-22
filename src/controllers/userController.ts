import { Request, Response } from 'express';
import userService from '../services/userService';
import { StatusCodes } from 'http-status-codes';
import { UpdateUserDTO } from '../dtos/updateUserDto';

const userController = {
  getCurrentUser: async (req: Request, res: Response) => {
    const user = await userService.getCurrentUser(req.user.userId);

    res.status(StatusCodes.OK).json({ msg: user });
  },

  updateUser: async (req: UpdateUserDTO, res: Response) => {
    const user = await userService.updateUser(req.user.userId, req.body);

    res.status(StatusCodes.OK).json({ msg: user });
  },

  getApplicationStats: async (_req: Request, res: Response) => {
    const stats = await userService.getApplicationStats();

    res.status(StatusCodes.OK).json({ msg: stats });
  },
};

export default userController;
