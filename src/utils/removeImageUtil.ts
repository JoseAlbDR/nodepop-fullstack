import { deleteFile } from './deleteImageUtil';

export const removeImage = async (image: string) => {
  if (!image.startsWith('https')) {
    const imagePath = image.split('/').at(-1);
    if (imagePath) await deleteFile(imagePath);
  }
};
