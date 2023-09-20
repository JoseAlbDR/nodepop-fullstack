import { UploadedFile } from 'express-fileupload';
import path from 'path';

const uploadsService = {
  uploadProductImage: async (image: UploadedFile) => {
    const imagePath = path.join(
      __dirname,
      '../public/uploads/' + `${image.name}`
    );

    await image.mv(imagePath);
  },
};

export default uploadsService;
