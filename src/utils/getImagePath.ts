import path from 'path';

export const getImagePath = (
  protocol: string,
  host: string,
  port: string,
  filePath: string,
  folder: string
) => {
  const relativePath = path.join('uploads', folder, path.basename(filePath));

  return `${protocol}://${host}:${port}/${relativePath}`;
};
