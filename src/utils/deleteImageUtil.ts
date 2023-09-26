import * as fs from 'node:fs/promises';
import path from 'path';
import { NotFoundError } from '../errors';

export const deleteFile = async (filePath: string) => {
  try {
    filePath.includes('src')
      ? await fs.unlink(filePath)
      : await fs.unlink(path.join('src', 'public', filePath));
  } catch (error) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      throw new NotFoundError('Image not found');
    }
    console.log(error);
    throw error;
  }
};
