import path from 'path';

export const getImagePath = (
  filePath: string,
  userId: string,
  folder: string
) => {
  console.log('folder ', folder);
  const relativePath = path.posix.join(
    'uploads',
    userId,
    folder,
    path.basename(filePath)
  );

  return `../${relativePath}`;
};
