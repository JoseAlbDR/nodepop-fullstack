import { User } from './../models/UserModel';
export const createTestUser = async () => {
  const user = await User.findOne({ email: 'spongebob@gmail.com' });

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
            ? `http://localhost:${process.env.PORT}/morfeo.jpeg`
            : '/morfeo.jpeg',
      };

      await User.create(testUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
