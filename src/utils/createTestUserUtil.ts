import populateService from '../services/populateService';
import { User } from './../models/UserModel';
export const createTestUser = async () => {
  const user = await User.findOne({ email: 'morfeo@matrix.com' });

  if (!user) {
    try {
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

      const user = await User.create(testUser);
      console.log('Test user created.');
      await populateService.populateDatabase(50, user._id);
      console.log('Database Populated with 50 Test User products.');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
