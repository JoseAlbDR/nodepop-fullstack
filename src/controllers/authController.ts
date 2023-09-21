import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
  register: async (_req: Request, res: Response) => {
    res.send(authService.register());
  },

  login: async (_req: Request, res: Response) => {
    res.send(authService.login());
  },
};
