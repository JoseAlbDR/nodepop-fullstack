import { deleteFile } from './deleteImageUtil';

export const removeImage = async (image: string) => {
  console.log('IMAGEEEEEEEEEEEE', image);
  if (image.startsWith('https') || image.endsWith('.webp')) return;
  const imagePath = image.split('/').at(-1);
  if (imagePath) await deleteFile(imagePath);
};
