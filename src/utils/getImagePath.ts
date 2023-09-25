import path from 'path';

export const getImagePath = (
  protocol: string,
  host: string,
  port: string,
  filePath: string
) => {
  const relativePath = path.join('uploads', path.basename(filePath));

  return `${protocol}://${host}:${port}/${relativePath}`;
};
