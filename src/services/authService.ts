import { User } from '../models/UserModel';
import { IUser } from '../types/authInterfaces';

export const authService = {
  register: async (user: IUser) => {
    const isFirstAccount = (await User.countDocuments({})) === 0;

    const role = isFirstAccount ? 'admin' : 'user';

    user.role = role;

    const response = await User.create(user);

    return response;
  },

  login: async () => {
    return 'login';
  },
};
