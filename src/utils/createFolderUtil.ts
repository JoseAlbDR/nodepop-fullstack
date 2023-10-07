import fs from 'fs/promises';
import path from 'path';

/**
 * Create folders for a user's products and avatar uploads.
 *
 * @param {string} userId - The ID of the user for whom the folders are created.
 * @throws {Error} Throws an error if folder creation fails.
 */
export const createFolder = async (userId: string) => {
  // Define paths for the products and avatar folders
  const productsPath = path.join(
    __dirname,
    `../public/uploads/${userId}/products`
  );
  const avatarPath = path.join(__dirname, `../public/uploads/${userId}/avatar`);

  try {
    // Create the products folder recursively if it doesn't exist
    await fs.mkdir(productsPath, { recursive: true });

    // Create the avatar folder recursively if it doesn't exist
    await fs.mkdir(avatarPath, { recursive: true });

    // Log a message indicating successful folder creation
    console.log(`Folders for user: ${userId} created`);
  } catch (error) {
    // Log any errors encountered during folder creation and rethrow them
    console.error(error);
    throw error;
  }
};
