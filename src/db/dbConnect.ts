import mongoose from 'mongoose';

export const dbConnect = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log('Connected to db Nodepop.');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
