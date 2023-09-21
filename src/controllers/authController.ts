import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { RegisterUserDTO } from '../dto/registerUserDto';
import { StatusCodes } from 'http-status-codes';

export const authController = {
  register: async (req: RegisterUserDTO, res: Response) => {
    const user = await authService.register(req.body);

    res.status(StatusCodes.CREATED).json({ msg: 'user created', user });
  },

  login: async (_req: Request, res: Response) => {
    res.send(authService.login());
  },
};
