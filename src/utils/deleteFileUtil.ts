import { promises as fs } from 'fs';
import path from 'path';

export const deleteFile = async (filePath: string) => {
  let newPath = '';
  if (process.env.NODE_ENV === 'development') newPath = 'src';
  if (process.env.NODE_ENV === 'production') newPath = 'build';

  try {
    await fs.unlink(path.join(`${newPath}`, 'public', filePath));
  } catch (error) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      console.log(error);
      return;
    }
    console.log(error);
    throw error;
  }
};