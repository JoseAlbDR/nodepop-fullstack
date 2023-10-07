import { User } from '../models/UserModel';
import { ILoginUser, IUser } from '../types/authInterfaces';
import { UnauthenticatedError } from '../errors/unauthenticatedError';
import { createFolder, createJWT } from '../utils';
import populateService from './populateService';

export const authService = {
  /**
   * Register a new user and assign a role based on whether it's the first account or not.
   *
   * @param {IUser} user - The user data to register.
   * @returns {Promise<IUser>} The created user.
   */
  register: async (user: IUser) => {
    // Check if this is the first account to determine the role
    const isFirstAccount = (await User.countDocuments({})) === 1;
    const role = isFirstAccount ? 'admin' : 'user';
    user.role = role;

    // Create the user
    const response = await User.create(user);

    // Create a folder for the user
    await createFolder(response._id.toString());

    return response;
  },

  /**
   * Authenticate a user based on login data (email and password) and return a JWT token.
   *
   * @param {ILoginUser} loginData - The login data containing email and password.
   * @returns {Promise<string>} A JWT token for the authenticated user.
   * @throws {UnauthenticatedError} Throws an error if authentication fails.
   */
  login: async (loginData: ILoginUser) => {
    const { email, password } = loginData;

    // Find the user by email
    const user = await User.findOne({ email: email });

    if (!user)
      throw new UnauthenticatedError(
        `User with email ${loginData.email} not found`
      );

    // Populate the database with test data if the user has the 'tester' role
    if (user?.role === 'tester')
      await populateService.populateDatabase(50, user._id);

    // Check if the provided password is correct
    const isPasswordCorrect = await user.checkPassword(password);

    if (!isPasswordCorrect)
      throw new UnauthenticatedError('Incorrect password');

    // Create a JWT token for the authenticated user
    const token = createJWT({
      userId: user._id,
      role: user.role,
      email: user.email,
    });

    return token;
  },
};
