import mongoose from 'mongoose';
import { deleteFile } from './deleteFileUtil';

export const removeImage = async (
  image: string,
  userId: mongoose.Types.ObjectId,
  folder: string
) => {
  if (!image || image.startsWith('https')) return;
  const aux = image.split('/');
  const imagePath = `/uploads/${userId}/${folder}/` + aux[aux.length - 1];

  if (imagePath) await deleteFile(imagePath);
};
