import mongoose from 'mongoose';
import path from 'path';

export const getImagePath = (
  filePath: string,
  userId: mongoose.Types.ObjectId,
  folder: string
) => {
  console.log('folder ', folder);
  const relativePath = path.posix.join(
    'uploads',
    userId.toString(),
    folder,
    path.basename(filePath)
  );

  return `../${relativePath}`;
};
