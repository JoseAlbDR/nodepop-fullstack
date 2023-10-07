import { promises as fs } from 'fs';
import path from 'path';

/**
 * Delete a file located at the specified file path.
 *
 * @param {string} filePath - The path to the file to be deleted.
 * @throws {Error} Throws an error if file deletion fails.
 */
export const deleteFile = async (filePath: string) => {
  let newPath = '';

  // Determine the path based on the environment (development or production)
  if (process.env.NODE_ENV === 'development') newPath = 'src';
  if (process.env.NODE_ENV === 'production') newPath = 'build';

  try {
    // Delete the file at the specified file path
    await fs.unlink(path.join(`${newPath}`, 'public', filePath));
  } catch (error) {
    // Handle file not found (ENOENT) error
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      console.log(error); // Log the error and return if the file doesn't exist
      return;
    }
    console.error(error); // Log and rethrow any other errors encountered during file deletion
    throw error;
  }
};
