import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { authService } from '../services/authService';
import { RegisterUserDTO } from '../dtos/registerUserDto';
import { LoginUserDTO } from '../dtos/loginUserDto';

export const authController = {
  register: async (req: RegisterUserDTO, res: Response) => {
    const user = req.body;

    await authService.register(user);

    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
  },

  login: async (req: LoginUserDTO, res: Response) => {
    const loginData = req.body;

    const token = await authService.login(loginData);

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

    res.status(StatusCodes.OK).json({ msg: 'user logged in' });
  },

  logout: async (_req: Request, res: Response) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(StatusCodes.OK).json({ msg: 'user logged out' });
  },
};
