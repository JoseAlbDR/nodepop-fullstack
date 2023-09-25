import * as fs from 'node:fs/promises';
import path from 'path';

export const deleteFile = async (filePath: string) => {
  try {
    filePath.includes('src')
      ? await fs.unlink(filePath)
      : await fs.unlink(path.join('src', 'public', filePath));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
