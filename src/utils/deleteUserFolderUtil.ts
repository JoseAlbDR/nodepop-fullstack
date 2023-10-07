import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';

/**
 * Delete a user's folder and its contents.
 *
 * @param {mongoose.Types.ObjectId} userId - The ID of the user whose folder should be deleted.
 * @throws {Error} Throws an error if folder deletion fails.
 */
export const deleteUserFolder = async (userId: mongoose.Types.ObjectId) => {
  const folder = userId.toString();

  // Define the path to the user's folder
  const folderPath = path.posix.join('../', 'public', 'uploads', folder);

  try {
    // Resolve the absolute path of the folder
    const absolutePath = path.resolve(__dirname, folderPath);

    // Delete the user's folder and its contents recursively
    await fs.rm(absolutePath, { recursive: true });
  } catch (err) {
    // Log and rethrow any errors encountered during folder deletion
    console.error(err);
    throw err;
  }
};
