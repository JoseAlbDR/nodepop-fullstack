import { deleteFile } from './deleteImageUtil';

export const removeImage = async (
  image: string,
  userId: string,
  folder: string
) => {
  if (!image || image.startsWith('https') || image.endsWith('.webp')) return;

  console.log(image);

  const aux = image.split('/');

  const imagePath =
    process.env.NODE_ENV === 'production'
      ? `/uploads/${userId}/${folder}/` + aux[aux.length - 1]
      : aux[aux.length - 1];
  if (imagePath) await deleteFile(imagePath);
};
