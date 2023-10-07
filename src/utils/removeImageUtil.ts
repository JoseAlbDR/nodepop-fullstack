import mongoose from 'mongoose';
import { deleteFile } from './deleteFileUtil';

/**
 * Remove an image file associated with a user from the specified folder.
 * If the image is hosted externally (e.g., via a URL), it is not removed.
 *
 * @param {string} image - The image file path or URL.
 * @param {mongoose.Types.ObjectId} userId - The ID of the user associated with the image.
 * @param {string} folder - The folder where the image is stored.
 */
export const removeImage = async (
  image: string,
  userId: mongoose.Types.ObjectId,
  folder: string
) => {
  // If the image is hosted externally (starts with 'https'), do not remove it
  if (!image || image.startsWith('https')) return;

  // Split the image path to extract the filename
  const aux = image.split('/');
  const imagePath = `/uploads/${userId}/${folder}/` + aux[aux.length - 1];

  // Delete the image file if the imagePath is defined
  if (imagePath) await deleteFile(imagePath);
};
