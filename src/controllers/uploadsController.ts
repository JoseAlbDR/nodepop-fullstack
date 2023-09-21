import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { StatusCodes } from 'http-status-codes';
import uploadsService from '../services/uploadsService';

const uploadsController = {
  uploadProductImage: async (req: Request, res: Response) => {
    const image = req?.files?.image as UploadedFile;

    await uploadsService.uploadProductImage(image);

    res.status(StatusCodes.OK).json({ image: `/uploads/${image.name}` });
  },
};

export default uploadsController;
