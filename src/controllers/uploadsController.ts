import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { UploadedFile } from 'express-fileupload';
import { StatusCodes } from 'http-status-codes';
import uploadsService from '../services/uploadsService';

const uploadsController = {
  uploadProductImage: async (req: Request, res: Response) => {
    if (!req.files) throw new BadRequestError('No file uploaded');

    const image = req.files.image as UploadedFile;

    if (!image.mimetype.startsWith('image'))
      throw new BadRequestError('File has to be an image');

    // 1Mb max image size
    const maxSize = 1024 * 1024;

    if (image.size > maxSize)
      throw new BadRequestError('File has to be smaller than 1Mb');

    await uploadsService.uploadProductImage(image);

    res.status(StatusCodes.OK).json({ image: `/uploads/${image.name}` });
  },
};

export default uploadsController;
