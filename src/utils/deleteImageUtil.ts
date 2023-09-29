import * as fs from 'node:fs/promises';
import path from 'path';
import { NotFoundError } from '../errors';

export const deleteFile = async (filePath: string) => {
  try {
    filePath.includes(
      `${process.env.NODE_ENV === 'development' ? 'src' : 'build'}`
    )
      ? await fs.unlink(filePath)
      : await fs.unlink(
          path.join(
            `${process.env.NODE_ENV === 'development' ? 'src' : 'build'}`,
            'public',
            filePath
          )
        );
  } catch (error) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      console.log(error);
      throw new NotFoundError('Image not found');
    }
    console.log(error);
    throw error;
  }
};
