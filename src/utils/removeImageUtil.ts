import { deleteFile } from './deleteImageUtil';

export const removeImage = async (image: string) => {
  console.log('IMAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', image);

  if (image.startsWith('https') || image.endsWith('.webp')) return;
  const aux = image.split('/');
  const imagePath = '/uploads/products' + aux[aux.length - 1];
  if (imagePath) await deleteFile(imagePath);
};
