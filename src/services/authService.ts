import { NotFoundError } from '../errors';
import { User } from '../models/UserModel';
import { ILoginUser, IUser } from '../types/authInterfaces';
import { UnauthenticatedError } from '../errors/unauthenticatedError';

export const authService = {
  register: async (user: IUser) => {
    const isFirstAccount = (await User.countDocuments({})) === 0;

    const role = isFirstAccount ? 'admin' : 'user';
    user.role = role;
    const response = await User.create(user);

    return response;
  },

  login: async (loginData: ILoginUser) => {
    const { email, password } = loginData;
    const user = await User.findOne({ email: email });

    if (!user)
      throw new NotFoundError(`User with email ${loginData.email} not found`);

    const isPasswordCorrect = await user.checkPassword(password);

    if (!isPasswordCorrect)
      throw new UnauthenticatedError('Incorrect password');

    return user;
  },
};
