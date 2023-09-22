import { Response } from 'express';
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

    res.status(StatusCodes.OK).json({ token });
  },
};
