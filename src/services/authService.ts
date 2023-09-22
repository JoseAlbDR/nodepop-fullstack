import { User } from '../models/UserModel';
import { IUser } from '../types/authInterfaces';
import { hashPassword } from '../utils/hashPassword';

export const authService = {
  register: async (user: IUser) => {
    const isFirstAccount = (await User.countDocuments({})) === 0;

    const role = isFirstAccount ? 'admin' : 'user';

    user.password = await hashPassword(user.password);
    user.role = role;

    const response = await User.create(user);

    return response;
  },

  login: async () => {
    return 'login';
  },
};
