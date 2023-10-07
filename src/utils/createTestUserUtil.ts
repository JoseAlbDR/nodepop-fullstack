import populateService from '../services/populateService';
import { User } from './../models/UserModel';

/**
 * Create a test user if one with the specified email doesn't exist.
 * Also, populate the database with test data if the test user is created.
 *
 * @throws {Error} Throws an error if user creation or database population fails.
 */
export const createTestUser = async () => {
  // Check if a user with the specified email already exists
  const user = await User.findOne({ email: 'morfeo@matrix.com' });

  if (!user) {
    try {
      // Define the test user data
      const testUser = {
        name: 'Morfeo',
        email: 'morfeo@matrix.com',
        password: 'redorbluepill',
        lastName: ' ',
        location: 'Nebuchadnezzar',
        role: 'tester',
        avatar:
          process.env.NODE_ENV === 'development'
            ? `http://localhost:${process.env.PORT}/morfeo.jfif`
            : '/morfeo.jfif',
      };

      // Create the test user
      const newUser = await User.create(testUser);
      console.log('Test user created.');

      // Populate the database with test data associated with the test user
      await populateService.populateDatabase(50, newUser._id);
      console.log('Database Populated with 50 Test User products.');
    } catch (error) {
      // Log and rethrow any errors encountered during user creation or database population
      console.error(error);
      throw error;
    }
  }
};
