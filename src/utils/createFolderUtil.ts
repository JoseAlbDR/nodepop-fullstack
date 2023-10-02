import fs from 'fs/promises';
import path from 'path';

export const createFolder = async (userId: string) => {
  const productsPath = path.join(
    __dirname,
    `../public/uploads/${userId}/products`
  );
  const avatarPath = path.join(__dirname, `../public/uploads/${userId}/avatar`);
  try {
    await fs.mkdir(productsPath, { recursive: true });
    await fs.mkdir(avatarPath, { recursive: true });
    console.log(`Folder for user: ${userId} created`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
