import { User } from './../models/UserModel';
export const createTestUser = async () => {
  const user = await User.findOne({ email: 'spongebob@gmail.com' });

  if (!user) {
    try {
      const testUser = {
        name: 'Bob',
        email: 'spongebob@gmail.com',
        password: 'mauricio',
        lastName: 'Sponge',
        location: 'A Pineapple Under The Sea',
        role: 'tester',
        avatar:
          process.env.NODE_ENV === 'development'
            ? `http://localhost:${process.env.PORT}/spongebob.png`
            : '/spongebob.png',
      };

      await User.create(testUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
