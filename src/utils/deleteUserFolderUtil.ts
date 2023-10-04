import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';

export const deleteUserFolder = async (userId: mongoose.Types.ObjectId) => {
  const folder = userId.toString();

  const folderPath = path.posix.join('../', 'public', 'uploads', folder);

  try {
    const absolutePath = path.resolve(__dirname, folderPath);
    await fs.rm(absolutePath, { recursive: true });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
