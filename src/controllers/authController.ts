import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { authService } from '../services/authService';
import { RegisterUserDTO } from '../dtos/registerUserDto';
import { LoginUserDTO } from '../dtos/loginUserDto';

export const authController = {
  /**
   * Register a new user.
   *
   * @param {Request} req - The HTTP request object containing user registration data.
   * @param {Response} res - The HTTP response object to send the response.
   */
  register: async (req: RegisterUserDTO, res: Response) => {
    const user = req.body;

    // Call the authService to register the user
    await authService.register(user);

    // Send a success response with a status code of 201 (Created)
    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
  },

  /**
   * Log in a user.
   *
   * @param {Request} req - The HTTP request object containing user login data.
   * @param {Response} res - The HTTP response object to send the response.
   */
  login: async (req: LoginUserDTO, res: Response) => {
    const loginData = req.body;

    // Call the authService to log in the user and retrieve a token
    const token = await authService.login(loginData);

    const oneDay = 1000 * 60 * 60 * 24;

    // Set a cookie with the authentication token for the user
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

    // Send a success response with a status code of 200 (OK)
    res.status(StatusCodes.OK).json({ msg: 'user logged in' });
  },

  /**
   * Log out a user.
   *
   * @param {Request} _req - The HTTP request object (not used in this function).
   * @param {Response} res - The HTTP response object to send the response.
   */
  logout: async (_req: Request, res: Response) => {
    // Clear the user's authentication token cookie to log them out
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    // Send a success response with a status code of 200 (OK)
    res.status(StatusCodes.OK).json({ msg: 'user logged out' });
  },
};
