import { User } from '../models/UserModel';
import { IUser } from '../types/authInterfaces';
import bcrypt from 'bcryptjs';

export const authService = {
  register: async (user: IUser) => {
    const isFirstAccount = (await User.countDocuments({})) === 0;

    const role = isFirstAccount ? 'admin' : 'user';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    user.role = role;

    const response = await User.create(user);

    return response;
  },

  login: async () => {
    return 'login';
  },
};
