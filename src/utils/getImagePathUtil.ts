import path from 'path';

export const getImagePath = (
  origin: string,
  filePath: string,
  folder: string
) => {
  console.log(origin);
  const relativePath = path.join('uploads', folder, path.basename(filePath));

  return `../${relativePath}`;
};
