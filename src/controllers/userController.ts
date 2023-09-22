import { Request, Response } from 'express';
import userService from '../services/userService';
import { StatusCodes } from 'http-status-codes';

const userController = {
  getCurrentUser: async (req: Request, res: Response) => {
    const user = await userService.getCurrentUser(req.user.userId);

    res.status(StatusCodes.OK).json({ msg: user });
  },

  updateUser: async (_req: Request, res: Response) => {
    const user = await userService.updateUser();

    res.status(StatusCodes.OK).json({ msg: user });
  },

  getApplicationStats: async (_req: Request, res: Response) => {
    const stats = await userService.getApplicationStats();

    res.status(StatusCodes.OK).json({ msg: stats });
  },
};

export default userController;
