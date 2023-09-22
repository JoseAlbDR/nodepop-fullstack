import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { RegisterUserDTO } from '../dto/registerUserDto';
import { StatusCodes } from 'http-status-codes';
import { LoginUserDTO } from '../dto/loginUserDto';

export const authController = {
  register: async (req: RegisterUserDTO, res: Response) => {
    await authService.register(req.body);

    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
  },

  login: async (req: LoginUserDTO, res: Response) => {
    const token = await authService.login(req.body);

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

    res.status(StatusCodes.OK).json({ msg: 'user logged out' });
  },

  logout: async (_req: Request, res: Response) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(StatusCodes.OK).json({ msg: 'user logged out' });
  },
};
