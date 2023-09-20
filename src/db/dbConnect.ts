import mongoose from 'mongoose';

export const dbConnect = async (url: string) => {
  return await mongoose.connect(url);
};
