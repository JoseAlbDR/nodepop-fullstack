import fs from 'fs';
import path from 'path';

export const deleteFile = (filePath: string) => {
  fs.unlink(path.join('src', 'public', filePath), (err) => {
    if (err) throw err;
    console.log(err);
  });
};
