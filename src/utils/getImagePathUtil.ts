import mongoose from 'mongoose';
import path from 'path';

/**
 * Get the relative image path based on the file path, user ID, and folder.
 *
 * @param {string} filePath - The original file path of the image.
 * @param {mongoose.Types.ObjectId} userId - The ID of the user.
 * @param {string} folder - The folder where the image is stored.
 * @returns {string} The relative image path.
 */
export const getImagePath = (
  filePath: string,
  userId: mongoose.Types.ObjectId,
  folder: string
) => {
  console.log('folder ', folder);

  // Create the relative path to the image based on user ID and folder
  const relativePath = path.posix.join(
    'uploads',
    userId.toString(),
    folder,
    path.basename(filePath)
  );

  // Return the image path based on the environment
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT}/${relativePath}` // In development
    : `../${relativePath}`; // In production
};
